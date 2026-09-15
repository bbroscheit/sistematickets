import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";
import Swal from "sweetalert2";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/nuevoProyectoV2.module.css";
import { postProject } from "../api/postProject";
import { devuelveIniciales } from "@/functions/devuelveIniciales";
import colorIndex from "@/functions/colorIndex";
import formatBytes from "@/functions/formatBytes";

const NOMBRE_MIN = 20;
const DETALLE_MIN = 20;

function nuevoProyectoV2() {
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    state: "creado",
    projectname: "",
    projectdetail: "",
    requirer: "",
    worker: [],
    finishdate: "",
    files: [],
  });

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("user"));
    if (userLogin) {
      setUser(userLogin);
      setInput((prev) => ({ ...prev, requirer: userLogin.name }));
    }
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
        setDevelopers(data.filter((e) => e.isprojectworker === true));
      });
  }, []);

  function validate(values) {
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

  function handleChange(e) {
    const next = { ...input, [e.target.name]: e.target.value };
    setInput(next);
    setError(validate(next));
  }

  function toggleWorker(username) {
    setInput((prev) => ({
      ...prev,
      worker: prev.worker.includes(username)
        ? prev.worker.filter((w) => w !== username)
        : [...prev.worker, username],
    }));
  }

  function addFiles(fileList) {
    const filesArray = Array.from(fileList);
    setInput((prev) => ({ ...prev, files: [...prev.files, ...filesArray] }));
  }

  function handleFileInput(e) {
    if (e.target.files && e.target.files.length > 0) addFiles(e.target.files);
    e.target.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  }

  function removeFile(index) {
    setInput((prev) => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(input);
    setError(errors);
    if (Object.keys(errors).length > 0) return;

    postProject(input)
      .then((res) => {
        if (res.state === "success") {
          Swal.fire({
            icon: "success",
            title: "Tu proyecto fue generado con éxito!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            Router.push("/DashboardV2");
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo crear el proyecto",
            text: "Ocurrió un error inesperado. Intentá nuevamente.",
          });
        }
      })
      .catch((err) => {
        console.error("Error al enviar el formulario:", err);
        Swal.fire({
          icon: "error",
          title: "No se pudo crear el proyecto",
          text: "Ocurrió un error inesperado. Intentá nuevamente.",
        });
      });
  }

  function handleReset(e) {
    e.preventDefault();
    setInput({
      state: "creado",
      projectname: "",
      projectdetail: "",
      requirer: user ? user.name : "",
      worker: [],
      finishdate: "",
      files: [],
    });
    setError({});
  }

  return (
    <div className={mainStyle.container}>
      <div className={style.pageWrap}>
        <form className={style.page} onSubmit={handleSubmit}>
          <div className={style.pageHead}>
            <h1>Nuevo Proyecto</h1>
            <p>Cargá los datos para iniciar un nuevo desarrollo interno.</p>
          </div>

          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>1</span>Proyecto</div>
            <div className={style.fieldRow}>
              <div className={style.field}>
                <label>Nombre</label>
                <input
                  type="text"
                  name="projectname"
                  value={input.projectname}
                  onChange={handleChange}
                  placeholder="Ej: Portal de Autogestión Clientes"
                />
                {error.projectname ? <p className={style.fieldError}>{error.projectname}</p> : null}
              </div>
              <div className={style.field}>
                <label>Fecha de finalización</label>
                <input
                  type="date"
                  name="finishdate"
                  value={input.finishdate}
                  onChange={handleChange}
                />
                {error.finishdate ? <p className={style.fieldError}>{error.finishdate}</p> : null}
              </div>
            </div>
            <div className={style.field}>
              <label>Detalle</label>
              <textarea
                rows="4"
                name="projectdetail"
                value={input.projectdetail}
                onChange={handleChange}
                placeholder="Describí el objetivo y alcance del proyecto..."
              />
              {error.projectdetail ? <p className={style.fieldError}>{error.projectdetail}</p> : null}
            </div>
          </div>

          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>2</span>Personas</div>
            <div className={style.field}>
              <label>Solicitante</label>
              <select name="requirer" value={input.requirer} onChange={handleChange}>
                {allUsers.map((u) => (
                  <option value={u.username} key={u.id}>
                    {u.firstname} {u.lastname}{user && u.username === user.name ? " (vos)" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.field}>
              <label>Desarrolladores</label>
              <div className={style.chipRow}>
                {developers.map((d) => {
                  const active = input.worker.includes(d.username);
                  return (
                    <span
                      key={d.id}
                      className={`${style.chip} ${active ? style.chipActive : ""}`}
                      onClick={() => toggleWorker(d.username)}
                    >
                      <span className={`${style.avatar} ${active ? style.avatarOnDark : style[`c${colorIndex(d.username)}`]}`}>
                        {devuelveIniciales(d.firstname, d.lastname)}
                      </span>
                      {d.firstname} {d.lastname}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>3</span>Archivos</div>
            <div
              className={`${style.dropzone} ${dragActive ? style.dropzoneActive : ""}`}
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4"></path>
                <path d="M6 10l6-6 6 6"></path>
                <path d="M4 20h16"></path>
              </svg>
              <strong>Arrastrá archivos acá o hacé click para elegir</strong>
              <span>PDF, imágenes o documentos de referencia del proyecto</span>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileInput}
                style={{ display: "none" }}
              />
            </div>
            {input.files.length > 0 ? (
              <div className={style.fileList}>
                {input.files.map((f, i) => (
                  <div className={style.fileRow} key={`${f.name}-${i}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <path d="M14 2v6h6"></path>
                    </svg>
                    <span className={style.fileName}>{f.name}</span>
                    <span className={style.fileSize}>{formatBytes(f.size)}</span>
                    <button type="button" className={style.fileRemove} onClick={() => removeFile(i)}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className={style.actions}>
            <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={handleReset}>
              Limpiar
            </button>
            <button type="submit" className={`${style.btn} ${style.btnPrimary}`}>
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default nuevoProyectoV2;
