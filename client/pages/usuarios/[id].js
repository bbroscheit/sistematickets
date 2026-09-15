import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import mainStyles from "@/styles/Home.module.css";
import style from "../../modules/detail.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { deleteUser } from "../api/deleteUser";
import { updateUser } from "../api/updateUser";
import { devuelveIniciales } from "@/functions/devuelveIniciales";

const modalPosition = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  maxWidth: "calc(100vw - 40px)",
};

function Soporte() {
  const router = useRouter();
  const id = router.query.id;

  const [openChange, setOpenChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [sectors, setSectors] = useState(null);
  const [salepoints, setSalepoints] = useState(null);
  const [roles, setRoles] = useState(null);
  const [modify, setModify] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    isworker: "",
    isprojectmanager: "",
    isprojectworker: "",
    sectorIds: [],
    salepointIds: [],
    role: "",
  });

  // Trae el detalle del usuario
  useEffect(() => {
    if (!id) return;
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/userDetail/${id}`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/userDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setInput({
          username: data.username,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phonenumber: data.phonenumber,
          isworker: data.isworker,
          isprojectmanager: data.isprojectmanager,
          isprojectworker: data.isprojectworker,
          sectorIds: data.sectors?.map((s) => s.id) || [],
          salepointIds: data.salepoints?.map((sp) => sp.id) || [],
          role: data.roleId,
        });
      });
  }, [router.query.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [sectorRes, salepointRes, roleRes] = await Promise.all([
          fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sector`),
          fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`),
          fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/role`),
        ]);

        const sectorData = await sectorRes.json();
        const salepointData = await salepointRes.json();
        const roleData = await roleRes.json();

        //eliminar sectores duplicados por nombre
        const uniqueSectors = Object.values(
          sectorData.reduce((acc, s) => {
            acc[s.sectorname] = s;
            return acc;
          }, {})
        );

        //eliminar salepoints duplicados por nombre
        const uniqueSalepoints = Object.values(
          salepointData.reduce((acc, sp) => {
            acc[sp.salepoint] = sp;
            return acc;
          }, {})
        );

        setSectors(uniqueSectors);
        setSalepoints(uniqueSalepoints);
        setRoles(roleData);
      } catch (err) {
        console.error("Error cargando datos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleModify(e) {
    e.preventDefault();
    setModify(true);
  }

  function togglePermission(field) {
    if (!modify) return;

    setInput((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  // toggle multi-sector
  function toggleSector(sectorId) {
    if (!modify) return;

    setInput((prev) => ({
      ...prev,
      sectorIds: prev.sectorIds.includes(sectorId)
        ? prev.sectorIds.filter((id) => id !== sectorId)
        : [...prev.sectorIds, sectorId],
    }));
  }

  // toggle multi-salepoint
  function toggleSalepoint(salepointId) {
    if (!modify) return;

    setInput((prev) => ({
      ...prev,
      salepointIds: prev.salepointIds.includes(salepointId)
        ? prev.salepointIds.filter((id) => id !== salepointId)
        : [...prev.salepointIds, salepointId],
    }));
  }

  // select single role
  function selectRole(roleId) {
    if (!modify) return;

    setInput((prev) => ({
      ...prev,
      role: roleId,
    }));
  }

  function handleModifyReset(e) {
    e.preventDefault();
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/userDetail/${id}`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/userDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setInput({
          username: data.username,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phonenumber: data.phonenumber,
          isworker: data.isworker,
          isprojectmanager: data.isprojectmanager,
          isprojectworker: data.isprojectworker,
          sectorIds: data.sectors?.map((s) => s.id) || [],
          salepointIds: data.salepoints?.map((sp) => sp.id) || [],
          role: data.roleId,
        });
      });
    setModify(false);
  }

  async function handleUserDelete(e) {
    e.preventDefault();
    try {
      const result = await deleteUser(id);
      if (result && result.state === "success") {
        router.push("/usuarios");
      } else {
        alert("No se pudo eliminar el usuario. Intentá nuevamente.");
      }
    } catch (err) {
      alert("No se pudo eliminar el usuario. Intentá nuevamente.");
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function validate(input) {
    let errors = [];
    if (!input.username) {
      errors.username = "El campo no puede estar vacío";
    }
    if (!input.password) {
      errors.password = "El campo no puede estar vacío";
    }
    if (!input.firstname) {
      errors.firstname = "El campo no puede estar vacío";
    }
    if (!input.lastname) {
      errors.lastname = "El campo no puede estar vacío";
    }
    if (!input.email) {
      errors.email = "El campo no puede estar vacío";
    }
    if (!input.phonenumber) {
      errors.phonenumber = "El campo no puede estar vacío";
    }
    return errors;
  }

  function submitChange(e) {
    e.preventDefault();
    updateUser(id, input);
    setModify(false);
  }

  // las siguientes 2 funciones abren y cierran el modal de modificar

  function handleOpenChange(e) {
    e.preventDefault();
    setOpenChange(true);
  }

  function handleCloseChange(e) {
    e.preventDefault();
    setOpenChange(false);
  }

  // abre y cierra el modal del borrado del usuario

  function handleOpen(e) {
    e.preventDefault();
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <div className={mainStyles.container}>
      <div className={style.pageWrap}>
        <form className={style.column} onSubmit={(e) => e.preventDefault()}>
          <div className={style.pageHead}>
            <h1>Usuario</h1>
            {user && user.firstname ? <p>Datos y permisos de {user.firstname} {user.lastname}</p> : null}
          </div>

          {/* Datos personales */}
          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>1</span>Datos personales</div>
            <div className={style.personalRow}>
              <div className={style.avatarLg}>
                {user && user.firstname ? devuelveIniciales(user.firstname, user.lastname) : "NN"}
              </div>
              <div className={style.fieldGrid}>
                <div className={style.field}>
                  <label>Usuario</label>
                  <input
                    type="text"
                    name="username"
                    value={input.username}
                    onChange={(e) => handleChange(e)}
                    disabled={!modify}
                  />
                  {error.username ? <p className={style.fieldError}>{error.username}</p> : null}
                </div>
                <div className={style.field}>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={(e) => handleChange(e)}
                    disabled={!modify}
                  />
                  {error.password ? <p className={style.fieldError}>{error.password}</p> : null}
                </div>
                <div className={style.field}>
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="firstname"
                    value={input.firstname}
                    onChange={(e) => handleChange(e)}
                    disabled={!modify}
                  />
                  {error.firstname ? <p className={style.fieldError}>{error.firstname}</p> : null}
                </div>
                <div className={style.field}>
                  <label>Apellido</label>
                  <input
                    type="text"
                    name="lastname"
                    value={input.lastname}
                    onChange={(e) => handleChange(e)}
                    disabled={!modify}
                  />
                  {error.lastname ? <p className={style.fieldError}>{error.lastname}</p> : null}
                </div>
                <div className={`${style.field} ${style.fieldWide}`}>
                  <label>E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={(e) => handleChange(e)}
                    disabled={!modify}
                  />
                  {error.email ? <p className={style.fieldError}>{error.email}</p> : null}
                </div>
              </div>
            </div>
          </div>

          {/* Permisos */}
          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>2</span>Permisos</div>
            <div className={style.permisosRow}>
              <div className={style.toggleGroup}>
                <label>Soportes</label>
                <div className={`${style.togglePair} ${!modify ? style.disabled : ""}`}>
                  <button type="button" className={input.isworker ? style.selectedYes : ""} onClick={() => togglePermission("isworker")}>Sí</button>
                  <button type="button" className={!input.isworker ? style.selectedNo : ""} onClick={() => togglePermission("isworker")}>No</button>
                </div>
              </div>
              <div className={style.toggleGroup}>
                <label>Proyectos</label>
                <div className={`${style.togglePair} ${!modify ? style.disabled : ""}`}>
                  <button type="button" className={input.isprojectmanager ? style.selectedYes : ""} onClick={() => togglePermission("isprojectmanager")}>Sí</button>
                  <button type="button" className={!input.isprojectmanager ? style.selectedNo : ""} onClick={() => togglePermission("isprojectmanager")}>No</button>
                </div>
              </div>
              <div className={style.toggleGroup}>
                <label>Desarrollos</label>
                <div className={`${style.togglePair} ${!modify ? style.disabled : ""}`}>
                  <button type="button" className={input.isprojectworker ? style.selectedYes : ""} onClick={() => togglePermission("isprojectworker")}>Sí</button>
                  <button type="button" className={!input.isprojectworker ? style.selectedNo : ""} onClick={() => togglePermission("isprojectworker")}>No</button>
                </div>
              </div>
            </div>
          </div>

          {/* Punto de venta */}
          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>3</span>Punto de venta</div>
            {loading ? (
              <p className={style.reportaAText}>Cargando puntos de venta...</p>
            ) : (
              <div className={style.chipRow}>
                {salepoints.map((sp) => {
                  const active = input.salepointIds.includes(sp.id);
                  return (
                    <button
                      type="button"
                      key={sp.id}
                      onClick={() => toggleSalepoint(sp.id)}
                      className={`${style.chip} ${active ? style.chipSelected : ""} ${!modify ? style.chipDisabled : ""}`}
                    >
                      {sp.salepoint}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sectores */}
          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>4</span>Sectores</div>
            {loading ? (
              <p className={style.reportaAText}>Cargando sectores...</p>
            ) : (
              <div className={style.chipRow}>
                {sectors.map((sector) => {
                  const active = input.sectorIds.includes(sector.id);
                  return (
                    <button
                      type="button"
                      key={sector.id}
                      onClick={() => toggleSector(sector.id)}
                      className={`${style.chip} ${active ? style.chipSelected : ""} ${!modify ? style.chipDisabled : ""}`}
                    >
                      {sector.sectorname}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Roles */}
          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>5</span>Rol</div>
            {loading ? (
              <p className={style.reportaAText}>Cargando roles...</p>
            ) : (
              <div className={style.chipRow}>
                {roles.map((role) => {
                  const active = input.role === role.id;
                  return (
                    <button
                      type="button"
                      key={role.id}
                      onClick={() => selectRole(role.id)}
                      className={`${style.chip} ${active ? style.chipSelected : ""} ${!modify ? style.chipDisabled : ""}`}
                    >
                      {role.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Acciones */}
          <div className={style.actions}>
            <button type="button" className={`${style.btn} ${style.btnDanger}`} onClick={(e) => handleOpen(e)}>
              Borrar usuario
            </button>
            {modify === true ? (
              <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={(e) => handleModifyReset(e)}>
                Borrar cambios
              </button>
            ) : null}
            {modify === false ? (
              <button type="button" className={`${style.btn} ${style.btnPrimary}`} onClick={(e) => handleModify(e)}>
                Modificar
              </button>
            ) : (
              <button type="button" className={`${style.btn} ${style.btnPrimary}`} onClick={(e) => handleOpenChange(e)}>
                Guardar cambios
              </button>
            )}
          </div>
        </form>
      </div>
      </div>

      {/* Modal de Borrar Usuario */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalPosition} className={style.modalBox}>
          <h2>¿Deseás eliminar este usuario?</h2>
          <div className={style.modalActions}>
            <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={(e) => handleClose(e)}>
              Cancelar
            </button>
            <button
              type="button"
              className={`${style.btn} ${style.btnPrimary}`}
              onClick={(e) => {
                handleUserDelete(e);
                handleClose(e);
              }}
            >
              Aceptar
            </button>
          </div>
        </Box>
      </Modal>

      {/* Acepta o no los cambios realizados */}
      <Modal open={openChange} onClose={handleCloseChange}>
        <Box sx={modalPosition} className={style.modalBox}>
          <h2>¿Deseás guardar los cambios?</h2>
          <div className={style.modalActions}>
            <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={(e) => handleCloseChange(e)}>
              Cancelar
            </button>
            <button
              type="button"
              className={`${style.btn} ${style.btnPrimary}`}
              onClick={(e) => {
                submitChange(e);
                handleCloseChange(e);
              }}
            >
              Aceptar
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
export default Soporte;
