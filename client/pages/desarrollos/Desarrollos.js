import React, { useState, useEffect } from "react";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/desarrollos.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import {postDesarrollo} from '@/pages/api/postDesarrollo'
import CardDesarrollo from "@/components/CardDesarrollo";
import { fetchDesarrollos } from "@/functions/fetchDesarrollos";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  border: "2px solid white",
  borderRadius: "10px",
  bgcolor: "#e9e7e7",
  boxShadow: 24,
  p: 4,
};

function Desarrollos() {
  const [allUser, setAllUser] = useState(null);
  const [allDesarrollos, setAllDesarrollos] = useState(null);
  const [errors, setErrors] = useState({});
  const [login, setLogin] = useState(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    title: "",
    users: [],
  });

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setLogin(loginParse);
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
      .then((res) => res.json())
      .then((data) => {
        setAllUser(data);
      });
    
  }, []);

   useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/desarrollo`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/desarrollo`)
      .then((res) => res.json())
      .then((data) => {
        setAllDesarrollos(data);
      });
    //setAllDesarrollos(fetchDesarrollos())
  }, []);

  function validate(input) {
    const errors = {};

    if (!input.title.trim()) {
      errors.title = "El título no puede estar vacío.";
    }

    if (!input.users || input.users.length === 0) {
      errors.users = "Debes seleccionar al menos un usuario.";
    }

    return errors;
  }

  const handleOpen = () => setOpen(true);

  function handleClose(e) {
    setInput({
      title: "",
      users: [],
    });

    setOpen(false);
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    e.preventDefault();
    let id = e.target.value;
    setInput({
      ...input,
      users: [...input.users, id],
    });

    setErrors(
      validate({
        ...input,
        users: [...input.users, id],
      })
    );
  }

  function handleCancel(e) {
    e.preventDefault();
    let id = e.target.innerText;
    let filterUser = input.users.filter((user) => user !== id);
    setInput({
      users: filterUser,
    });

    console.log("input", input, id);
  }

  function handleSubmit(e) {
    e.preventDefault();
    postDesarrollo(input)
      .then((res) => {
        if (res.state === "success") {
          setOpen(false);
          setInput({
            title: "",
            users: [],
          });
          Swal.fire({
            icon: "success",
            title: "Tu desarrollo fue creada con éxito!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            fetchDesarrollos(); 
          })
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  }

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Desarrollos</h1>
      <button
        className={mainStyle.button}
        onClick={(e) => handleOpen(e)}
        cursor="pointer"
      >
        Crear
      </button>
      <div className={style.gridContainer}>
        { allDesarrollos !== null && allDesarrollos.length > 0 ? (
          allDesarrollos.map((desarrollo) => ( <CardDesarrollo title={ desarrollo.title } id={ desarrollo.id } state={desarrollo.state} /> ))): <p>No hay desarrollos cargados</p>}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label className={mainStyle.labelModal}>Titulo</label>
            <input
              name="title"
              placeholder="Titulo"
              onChange={(e) => handleChange(e)}
              value={input.title}
              type="text"
              className={mainStyle.inputModal}
            />
            <p
              className={
                errors.title ? `${mainStyle.danger}` : `${mainStyle.normal}`
              }
            >
              {errors.title}
            </p>

            <select
              value={input.users}
              name="users"
              onChange={(e) => handleSelect(e)}
              className={mainStyle.selectModal}
            >
              <option value="" className={mainStyle.optionModal}>
                Elige los usuarios
              </option>
              {allUser !== null && allUser.length > 0
                ? allUser.map((e) => (
                    <option value={e.username}>{e.username}</option>
                  ))
                : null}
            </select>
            {input.users.length > 0 &&
              input.users.map((user) => (
                <div key={user.id} className={style.userContainer}>
                  <p onClick={(e) => handleCancel(e)}>{user}</p>
                </div>
              ))}
            <p
              className={
                errors.users ? `${mainStyle.danger}` : `${mainStyle.normal}`
              }
            >
              {errors.users}
            </p>

            <div className={mainStyle.buttonContainer}>
              <Button
                variant="contained"
                sx={{ marginRight: "12px" }}
                type="submit"
              >
                Agregar
              </Button>
              <Button variant="contained" onClick={(e) => handleClose(e)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Desarrollos;
