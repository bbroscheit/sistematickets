import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../modules/detail.module.css";
import mainStyles from "@/styles/Home.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { deleteUser } from "../api/deleteUser";
import { updateUser } from "../api/updateUser";
import { devuelveIniciales } from "@/functions/devuelveIniciales";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
    sectorname: "",
    salepoint: "",
    role: "",
  });

  // Trae el detalle del usuario
  useEffect(() => {
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
          //cambiamos los antiguos sectores por arrays
          sectorIds: data.sectors?.map((s) => s.id) || [],
          salepointIds: data.salepoints?.map((sp) => sp.id) || [],
          //agregamos el role
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

  function handleUserDelete(e) {
    e.preventDefault();
    deleteUser(id);
    setTimeout(() => {
      router.push("/usuarios");
    }, 300);
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

  //helpers

  function renderCheck(active) {
    return active ? (
      <CheckBoxIcon className={style.checked} />
    ) : (
      <CheckBoxOutlineBlankIcon className={style.unchecked} />
    );
  }

  console.log("input", input);

  return (
    <>
      <div className={mainStyles.container}>
        <h1 className={mainStyles.title}>Usuario</h1>
        <form className={mainStyles.form} onSubmit={(e) => handleSubmit(e)}>
          {/* Div contenedor de imagen e input usuario - password - nombre -apellido - interno - email */}

          <div className={style.divContainerInfo}>
            <div className={style.divContainerInitials}>
              {user && user != null ? (
                devuelveIniciales(user?.firstname, user?.lastname)
              ) : (
                <p>NN</p>
              )}
            </div>
            <div className={style.divContainerInputs}>
              <div className={mainStyles.minimalGrid}>
                <h3 className={mainStyles.subtitle}>Usuario</h3>
                <input
                  type="text"
                  name="username"
                  value={input.username}
                  className={mainStyles.input}
                  onChange={(e) => handleChange(e)}
                  disabled={modify === false ? true : false}
                />
              </div>
              <p
                className={
                  error.username
                    ? `${mainStyles.danger}`
                    : `${mainStyles.normal}`
                }
              >
                {error.username}
              </p>
              <div className={mainStyles.minimalGrid}>
                <h3 className={mainStyles.subtitle}>Password </h3>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  className={mainStyles.input}
                  onChange={(e) => handleChange(e)}
                  disabled={modify === false ? true : false}
                />
                <h3 className={mainStyles.subtitle}>Nombre</h3>
                <input
                  type="text"
                  name="firstname"
                  value={input.firstname}
                  className={mainStyles.input}
                  onChange={(e) => handleChange(e)}
                  disabled={modify === false ? true : false}
                />
                <h3 className={mainStyles.subtitle}>Apellido</h3>
                <input
                  type="text"
                  name="lastname"
                  value={input.lastname}
                  className={mainStyles.input}
                  onChange={(e) => handleChange(e)}
                  disabled={modify === false ? true : false}
                />
                <h3 className={mainStyles.subtitle}>E-mail</h3>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  className={mainStyles.input}
                  onChange={(e) => handleChange(e)}
                  disabled={modify === false ? true : false}
                />
              </div>
            </div>
          </div>

          {/* Div contenedor de Soportes - Proyectos - Desarrollos */}

          <div className={style.divContainerWorker}>
            <div
              className={style.workerOptions}
              onClick={() => togglePermission("isworker")}
              style={{
                cursor: modify ? "pointer" : "default",
                opacity: modify ? 1 : 0.6,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <p>Soportes ?</p>
              {renderCheck(input.isworker)}
            </div>

            <div
              className={style.workerOptions}
              onClick={() => togglePermission("isprojectmanager")}
              style={{
                cursor: modify ? "pointer" : "default",
                opacity: modify ? 1 : 0.6,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <p>Proyectos ?</p>
              {renderCheck(input.isprojectmanager)}
            </div>

            <div
              className={style.workerOptions}
              onClick={() => togglePermission("isprojectworker")}
              style={{
                cursor: modify ? "pointer" : "default",
                opacity: modify ? 1 : 0.6,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <p>Desarrollos ?</p>
              {renderCheck(input.isprojectworker)}
            </div>
          </div>

          {/* Div contenedor de sectores - punto de ventas */}

          {loading ? (
            <p>Cargando puntos de venta...</p>
          ) : (
            <div className={style.sectorContainer}>
              <h3 className={mainStyles.subtitle}>Punto de Venta</h3>
              <div className={style.gridContainer}>
                {salepoints.map((sp) => {
                  const active = input.salepointIds.includes(sp.id);

                  return (
                    <div
                      key={sp.id}
                      onClick={() => toggleSalepoint(sp.id)}
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        background: active ? "#e3f2fd" : "#f9f9f9",
                        cursor: modify ? "pointer" : "default",
                        opacity: modify ? 1 : 0.6,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {renderCheck(active)}
                      {sp.salepoint}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Div contenedor de sectores - punto de ventas */}

          {loading ? (
            <p>Cargando sectores...</p>
          ) : (
            <div className={style.sectorContainer}>
              <h3 className={mainStyles.subtitle}> Sectores</h3>
              <div className={style.gridContainer}>
                {sectors.map((sector) => {
                  const active = input.sectorIds.includes(sector.id);

                  return (
                    <div
                      key={sector.id}
                      onClick={() => toggleSector(sector.id)}
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        background: active ? "#e8f5e9" : "#f9f9f9",
                        cursor: modify ? "pointer" : "default",
                        opacity: modify ? 1 : 0.6,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {renderCheck(active)}
                      {sector.sectorname}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Roles */}

          {loading ? (
            <p>Cargando roles...</p>
          ) : (
            <div className={style.sectorContainer}>
              <h3 className={mainStyles.subtitle}>Roles</h3>
              <div className={style.gridContainer}>
                {roles.map((role) => {
                  const active = input.role === role.id;

                  return (
                    <div
                      key={role.id}
                      onClick={() => selectRole(role.id)}
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        background: active ? "#fff3e0" : "#f9f9f9",
                        cursor: modify ? "pointer" : "default",
                        opacity: modify ? 1 : 0.6,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {renderCheck(active)}
                      {role.name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Div contenedor de botones Modificar - Borrar Usuario */}
          <div className={style.buttonContainer}>
            {modify === false ? (
              <button
                className={mainStyles.button}
                onClick={(e) => handleModify(e)}
              >
                Modificar
              </button>
            ) : (
              <button
                className={mainStyles.button}
                onClick={(e) => handleOpenChange(e)}
              >
                Guardar Cambios
              </button>
            )}
            {modify === true ? (
              <button
                className={mainStyles.button}
                onClick={(e) => handleModifyReset(e)}
              >
                Borrar cambios
              </button>
            ) : null}
            <button
              className={mainStyles.button}
              onClick={(e) => handleOpen(e)}
            >
              Borrar Usuario
            </button>
          </div>
        </form>
      </div>

      {/* Modal de Borrar Usuario */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className={style.modalTitle}
          >
            ¿ Deseas eliminar este usuario ?
          </Typography>
          <button
            onClick={(e) => {
              handleUserDelete(e);
              handleClose(e);
            }}
            className={style.modalButton}
          >
            Aceptar
          </button>
          <button
            onClick={(e) => {
              handleClose(e);
            }}
            className={style.modalButton}
          >
            Cancelar
          </button>
        </Box>
      </Modal>

      {/* Acepta o no los cambios realizados */}
      <Modal
        open={openChange}
        onClose={handleCloseChange}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className={style.modalTitle}
          >
            ¿ Deseas guardar los cambios ?
          </Typography>
          <button
            onClick={(e) => {
              submitChange(e);
              handleCloseChange(e);
            }}
            className={style.modalButton}
          >
            Aceptar
          </button>
          <button
            onClick={(e) => {
              handleCloseChange(e);
            }}
            className={style.modalButton}
          >
            Cancelar
          </button>
        </Box>
      </Modal>
    </>
  );
}
export default Soporte;
