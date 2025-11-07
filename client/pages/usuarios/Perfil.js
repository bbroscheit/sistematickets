import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../modules/detail.module.css";
import mainStyles from "@/styles/Home.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import { updateUserByUser } from "../../pages/api/updateUserByUser";

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

function Perfil() {
  const router = useRouter();
  const id = router.query.id;

  const [openChange, setOpenChange] = useState(false);
  const [user, setUser] = useState("");
  const [modify, setModify] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
  });

  // Trae el detalle del usuario
  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);

    fetch(
      `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/userDetail/${loginParse.id}`
    )
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
        });
      });
  }, [router.query.id]);

  function handleModify(e) {
    e.preventDefault();
    setModify(true);
  }

  function handleModifyReset(e) {
    e.preventDefault();
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);

    fetch(
      `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/userDetail/${loginParse.id}`
    )
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
        });
      });
    setModify(false);
  }

  function handleUserBack(e) {
    e.preventDefault();
    setTimeout(() => {
      router.push("/Tickets");
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
    updateUserByUser(user.id, input)
      .then((res) => {
        if (res.state === "success") {
          Swal.fire({
            icon: "success",
            title: "El usuario se ha modificado con éxito!",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            router.push("/usuarios/Perfil");
          }, 1500);
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
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

  return (
    <>
      <div className={mainStyles.container}>
        <h1 className={mainStyles.title}>Usuario</h1>
        <form className={mainStyles.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={mainStyles.minimalGrid}>
            <h3 className={mainStyles.subtitle}>Usuario</h3>
            <input
              type="text"
              name="username"
              readOnly
              value={input.username}
              className={mainStyles.input}
              onChange={(e) => handleChange(e)}
              disabled={modify === false ? true : false}
            />
          </div>
          <p
            className={
              error.username ? `${mainStyles.danger}` : `${mainStyles.normal}`
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

          <div className={mainStyles.minimalGrid}>
            <h3 className={mainStyles.subtitle}>Interno</h3>
            <input
              type="text"
              name="phonenumber"
              value={input.phonenumber}
              onChange={(e) => handleChange(e)}
              disabled={modify === false ? true : false}
            />
          </div>
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
              onClick={(e) => handleUserBack(e)}
            >
              Volver
            </button>
          </div>
        </form>
      </div>

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
export default Perfil;
