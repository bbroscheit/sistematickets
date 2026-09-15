import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/proyectoDetalleV2.module.css";
import { calculaPromedio } from "@/functions/calculaPromedio";
import girafechas from "@/functions/girafechas";
import colorIndex from "@/functions/colorIndex";
import formatBytes from "@/functions/formatBytes";
import { devuelveIniciales } from "@/functions/devuelveIniciales";
import arrayUserProject from "@/functions/arrayUserProject";
import { postTask } from "@/pages/api/postTask";
import { updateProject } from "@/pages/api/updateProject";
import TaskRowV2 from "@/components/TaskRowV2";

const modalPosition = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  maxWidth: "calc(100vw - 40px)",
};

const NOMBRE_MIN = 20;
const DETALLE_MIN = 20;

function ProyectoDetalleV2() {
  const router = useRouter();
  const id = router.query.id;
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [editError, setEditError] = useState({});
  const [taskError, setTaskError] = useState({});

  const [editInput, setEditInput] = useState({
    idProject: "",
    projectname: "",
    projectdetail: "",
    requirer: "",
    worker: [],
    finishdate: "",
    files: [],
  });

  const [taskInput, setTaskInput] = useState({
    idProject: "",
    state: "generado",
    taskdetail: "",
    taskfinishdate: "",
    worker: "",
  });

  function fetchProject() {
    if (!id) return;
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data && data[0] ? data[0] : null);
      });
  }

  useEffect(() => {
    fetchProject();
    const interval = setInterval(fetchProject, 5000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("user"));
    if (userLogin) setUser(userLogin);
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
        setDevelopers(data.filter((u) => u.isprojectworker === true));
      });
  }, []);

  const progreso = project ? calculaPromedio(project.newtasks) || 0 : 0;
  const finalizado = project && project.state === "Finalizado";
  const requirer = project && project.users && project.users[0] ? project.users[0] : null;
  const workers = project && project.users ? project.users.slice(1) : [];
  const tareasPendientes = project ? project.newtasks.filter((t) => t.state !== "cumplido") : [];
  const tareasHechas = project ? project.newtasks.filter((t) => t.state === "cumplido") : [];
  const archivo = project && project.formproject && project.formproject.files && project.formproject.files.length > 0
    ? project.formproject.files[0]
    : null;

  // --- editar proyecto ---

  function validateEdit(values) {
    const errors = {};
    if (!values.projectname || values.projectname.trim().length < NOMBRE_MIN) {
      errors.projectname = `Mínimo ${NOMBRE_MIN} caracteres`;
    }
    if (!values.projectdetail || values.projectdetail.trim().length < DETALLE_MIN) {
      errors.projectdetail = `Mínimo ${DETALLE_MIN} caracteres`;
    }
    if (!values.finishdate) {
      errors.finishdate = "El campo no puede estar vacío";
    }
    return errors;
  }

  function handleOpenEdit() {
    if (!project) return;
    setEditInput({
      idProject: project.id,
      projectname: project.projectname,
      projectdetail: project.projectdetail,
      requirer: project.users[0] ? project.users[0].username : "",
      worker: arrayUserProject(project),
      finishdate: project.finishdate,
      files: [],
    });
    setEditError({});
    setOpenEdit(true);
  }

  function handleEditChange(e) {
    const next = { ...editInput, [e.target.name]: e.target.value };
    setEditInput(next);
    setEditError(validateEdit(next));
  }

  function toggleEditWorker(username) {
    setEditInput((prev) => ({
      ...prev,
      worker: prev.worker.includes(username)
        ? prev.worker.filter((w) => w !== username)
        : [...prev.worker, username],
    }));
  }

  function addEditFiles(fileList) {
    setEditInput((prev) => ({ ...prev, files: [...prev.files, ...Array.from(fileList)] }));
  }

  function removeEditFile(i) {
    setEditInput((prev) => ({ ...prev, files: prev.files.filter((_, idx) => idx !== i) }));
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    const errors = validateEdit(editInput);
    setEditError(errors);
    if (Object.keys(errors).length > 0) return;

    updateProject(editInput)
      .then((res) => {
        if (res.state === "success") {
          setOpenEdit(false);
          Swal.fire({ icon: "success", title: "Proyecto actualizado con éxito!", showConfirmButton: false, timer: 1500 });
          fetchProject();
        } else {
          Swal.fire({ icon: "error", title: "No se pudo actualizar el proyecto", text: "Intentá nuevamente." });
        }
      })
      .catch(() => {
        Swal.fire({ icon: "error", title: "No se pudo actualizar el proyecto", text: "Intentá nuevamente." });
      });
  }

  // --- nueva tarea ---

  function validateTask(values) {
    const errors = {};
    if (!values.taskdetail || values.taskdetail.trim().length < DETALLE_MIN) {
      errors.taskdetail = `Mínimo ${DETALLE_MIN} caracteres`;
    }
    if (!values.taskfinishdate) {
      errors.taskfinishdate = "El campo no puede estar vacío";
    }
    if (!values.worker) {
      errors.worker = "Elegí un responsable";
    }
    return errors;
  }

  function handleOpenTask() {
    if (!project) return;
    const projectWorkers = project.users.slice(1);
    setTaskInput({
      idProject: project.id,
      state: "generado",
      taskdetail: "",
      taskfinishdate: "",
      worker: projectWorkers.length === 1 ? projectWorkers[0].id : "",
    });
    setTaskError({});
    setOpenTask(true);
  }

  function handleTaskChange(e) {
    const next = { ...taskInput, [e.target.name]: e.target.value };
    setTaskInput(next);
    setTaskError(validateTask(next));
  }

  function handleTaskSubmit(e) {
    e.preventDefault();
    const errors = validateTask(taskInput);
    setTaskError(errors);
    if (Object.keys(errors).length > 0) return;

    postTask(taskInput)
      .then((res) => {
        if (res.state === "success") {
          setOpenTask(false);
          Swal.fire({ icon: "success", title: "Tu tarea se creó con éxito!", showConfirmButton: false, timer: 1500 });
          fetchProject();
        } else {
          Swal.fire({ icon: "error", title: "No se pudo crear la tarea", text: "Intentá nuevamente." });
        }
      })
      .catch(() => {
        Swal.fire({ icon: "error", title: "No se pudo crear la tarea", text: "Intentá nuevamente." });
      });
  }

  if (!project) {
    return <div className={mainStyle.container}></div>;
  }

  return (
    <div className={mainStyle.container}>
      <div className={style.pageWrap}>
        <div className={style.page}>

          <div className={style.pageHead}>
            <div className={style.pageHeadLeft}>
              <h1>{project.projectname}</h1>
              <span className={`${style.pill} ${finalizado ? style.pillGreen : style.pillBlue}`}>
                {finalizado ? "Finalizado" : "Activo"}
              </span>
            </div>
            <div className={style.headActions}>
              {archivo ? (
                <a href={encodeURI(archivo)} download className={style.iconBtn} title="Descargar formulario">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </a>
              ) : null}
              {user && user.isprojectmanager === true ? (
                <button type="button" className={style.iconBtn} title="Editar proyecto" onClick={handleOpenEdit}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"></path>
                  </svg>
                </button>
              ) : null}
            </div>
          </div>

          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>1</span>Detalle</div>
            <p className={style.detailText}>{project.projectdetail}</p>
            <div className={style.statRow}>
              <div className={style.statBlock}>
                <span className={style.statLabel}>Solicitante</span>
                {requirer ? (
                  <>
                    <div className={style.peopleStack}>
                      <span className={`${style.avatar} ${style[`c${colorIndex(requirer.username || requirer.id)}`]}`}>
                        {devuelveIniciales(requirer.firstname, requirer.lastname)}
                      </span>
                    </div>
                    <span className={style.peopleName}>{requirer.firstname} {requirer.lastname}</span>
                  </>
                ) : (
                  <span className={style.peopleNameMuted}>Sin asignar</span>
                )}
              </div>
              <div className={style.statBlock}>
                <span className={style.statLabel}>Desarrolladores</span>
                {workers.length > 0 ? (
                  <>
                    <div className={style.peopleStack}>
                      {workers.map((w) => (
                        <span key={w.id} className={`${style.avatar} ${style[`c${colorIndex(w.username || w.id)}`]}`}>
                          {devuelveIniciales(w.firstname, w.lastname)}
                        </span>
                      ))}
                    </div>
                    <span className={style.peopleName}>{workers.map((w) => `${w.firstname} ${w.lastname}`).join(", ")}</span>
                  </>
                ) : (
                  <span className={style.peopleNameMuted}>Sin asignar</span>
                )}
              </div>
              <div className={style.statBlock}>
                <span className={style.statLabel}>Vence</span>
                <span className={style.dateText}>{girafechas(project.finishdate)}</span>
              </div>
              <div className={style.statBlock}>
                <span className={style.statLabel}>Progreso</span>
                <div className={style.progressWrap}>
                  <div className={style.progressTrack}>
                    <div className={`${style.progressFill} ${progreso === 100 ? style.progressFillDone : ""}`} style={{ width: `${progreso}%` }}></div>
                  </div>
                  <span className={style.progressPct}>{progreso}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.cardTitleRow}>
              <div className={style.cardTitle}><span className={style.n}>2</span>Tareas</div>
              {user && user.isprojectmanager === true ? (
                <button type="button" className={`${style.btn} ${style.btnPrimary}`} onClick={handleOpenTask}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Nueva Tarea
                </button>
              ) : null}
            </div>

            <div className={style.taskGroup}>
              <div className={style.taskGroupHead}><h4>Solicitadas</h4><span className={style.countPill}>{tareasPendientes.length}</span></div>
              {tareasPendientes.length > 0 ? (
                tareasPendientes.map((t) => <TaskRowV2 key={t.id} task={t} onChanged={fetchProject} />)
              ) : (
                <p className={style.emptyTasks}>No hay tareas solicitadas.</p>
              )}
            </div>

            <div className={style.taskGroup}>
              <div className={style.taskGroupHead}><h4>Terminadas</h4><span className={style.countPill}>{tareasHechas.length}</span></div>
              {tareasHechas.length > 0 ? (
                tareasHechas.map((t) => <TaskRowV2 key={t.id} task={t} onChanged={fetchProject} />)
              ) : (
                <p className={style.emptyTasks}>Todavía no se terminó ninguna tarea.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Editar Proyecto */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box sx={modalPosition} className={style.modalBox}>
          <h2>Editar proyecto</h2>
          <form onSubmit={handleEditSubmit}>
            <div className={style.fieldRow}>
              <div className={style.field}>
                <label>Nombre</label>
                <input type="text" name="projectname" value={editInput.projectname} onChange={handleEditChange} />
                {editError.projectname ? <p className={style.fieldError}>{editError.projectname}</p> : null}
              </div>
              <div className={style.field}>
                <label>Fecha de finalización</label>
                <input type="date" name="finishdate" value={editInput.finishdate} onChange={handleEditChange} />
                {editError.finishdate ? <p className={style.fieldError}>{editError.finishdate}</p> : null}
              </div>
            </div>
            <div className={style.field} style={{ marginTop: 16 }}>
              <label>Detalle</label>
              <textarea rows="4" name="projectdetail" value={editInput.projectdetail} onChange={handleEditChange} />
              {editError.projectdetail ? <p className={style.fieldError}>{editError.projectdetail}</p> : null}
            </div>

            <div className={style.field} style={{ marginTop: 16 }}>
              <label>Solicitante</label>
              <select name="requirer" value={editInput.requirer} onChange={handleEditChange}>
                {allUsers.map((u) => (
                  <option value={u.username} key={u.id}>{u.firstname} {u.lastname}</option>
                ))}
              </select>
            </div>

            <div className={style.field} style={{ marginTop: 16 }}>
              <label>Desarrolladores</label>
              <div className={style.chipRow}>
                {developers.map((d) => {
                  const active = editInput.worker.includes(d.username);
                  return (
                    <span
                      key={d.id}
                      className={`${style.chip} ${active ? style.chipActive : ""}`}
                      onClick={() => toggleEditWorker(d.username)}
                    >
                      <span className={`${style.avatar} ${style.avatarSm} ${active ? style.avatarOnDark : style[`c${colorIndex(d.username)}`]}`}>
                        {devuelveIniciales(d.firstname, d.lastname)}
                      </span>
                      {d.firstname} {d.lastname}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className={style.field} style={{ marginTop: 16 }}>
              <label>Archivos nuevos</label>
              <div
                className={`${style.dropzone} ${dragActive ? style.dropzoneActive : ""}`}
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files.length > 0) addEditFiles(e.dataTransfer.files); }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16V4"></path><path d="M6 10l6-6 6 6"></path><path d="M4 20h16"></path>
                </svg>
                <strong>Arrastrá archivos acá o hacé click para elegir</strong>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => { if (e.target.files.length > 0) addEditFiles(e.target.files); e.target.value = ""; }}
                />
              </div>
              {editInput.files.length > 0 ? (
                <div className={style.fileList} style={{ marginTop: 8 }}>
                  {editInput.files.map((f, i) => (
                    <div className={style.fileRow} key={`${f.name}-${i}`}>
                      <span className={style.fileName}>{f.name}</span>
                      <span>{formatBytes(f.size)}</span>
                      <button type="button" className={style.fileRemove} onClick={() => removeEditFile(i)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className={style.modalActions} style={{ marginTop: 18 }}>
              <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={() => setOpenEdit(false)}>Cancelar</button>
              <button type="submit" className={`${style.btn} ${style.btnPrimary}`}>Guardar cambios</button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Nueva Tarea */}
      <Modal open={openTask} onClose={() => setOpenTask(false)}>
        <Box sx={modalPosition} className={style.modalBox}>
          <h2>Nueva tarea</h2>
          <form onSubmit={handleTaskSubmit}>
            <div className={style.field}>
              <label>Detalle</label>
              <textarea rows="3" name="taskdetail" value={taskInput.taskdetail} onChange={handleTaskChange} />
              {taskError.taskdetail ? <p className={style.fieldError}>{taskError.taskdetail}</p> : null}
            </div>
            <div className={style.fieldRow} style={{ marginTop: 16 }}>
              <div className={style.field}>
                <label>Responsable</label>
                <select name="worker" value={taskInput.worker} onChange={handleTaskChange}>
                  <option value="">Elegí un desarrollador</option>
                  {project.users.slice(1).map((w) => (
                    <option value={w.id} key={w.id}>{w.firstname} {w.lastname}</option>
                  ))}
                </select>
                {taskError.worker ? <p className={style.fieldError}>{taskError.worker}</p> : null}
              </div>
              <div className={style.field}>
                <label>Fecha de finalización</label>
                <input type="date" name="taskfinishdate" value={taskInput.taskfinishdate} onChange={handleTaskChange} />
                {taskError.taskfinishdate ? <p className={style.fieldError}>{taskError.taskfinishdate}</p> : null}
              </div>
            </div>
            <div className={style.modalActions} style={{ marginTop: 18 }}>
              <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={() => setOpenTask(false)}>Cancelar</button>
              <button type="submit" className={`${style.btn} ${style.btnPrimary}`}>Agregar</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ProyectoDetalleV2;
