import React, { useState, useEffect } from "react";
import style from "@/modules/cardDesarrollo.module.css";
import mainStyle from "@/styles/Home.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { updateUsersDesarrollo } from "@/pages/api/updateUsersDesarrollo";
import { updateTitleDesarrollo } from "@/pages/api/updateTitleDesarrollo";
import { updateStateDesarrollo } from "@/pages/api/updateStateDesarrollo";
import { deleteDesarrollo } from "@/pages/api/deleteDesarrollo";

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

function CardDesarrollo({ title, id, state }) {
  const [allUser, setAllUser] = useState(null);
  const [openTitle, setOpenTitle] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [input, setInput] = useState({
    title: "",
    users: [],
  });

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
      .then((res) => res.json())
      .then((data) => {
        setAllUser(data);
      });
  }, []);

  function handleOpenTitle(e, id) {
    e.preventDefault();
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/desarrollo/${id}`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/desarrollo/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInput({
          ...input,
          title: data.title,
          users: data.users,
        });
        setOpenTitle(true);
      });
  }

  function handleOpenUsers(e, id) {
    e.preventDefault();
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/desarrollo/${id}`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/desarrollo/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInput({
          ...input,
          title: data.title,
          users: data.users,
        });
        setOpenUsers(true);
      });
  }
  const handleOpenFinish = () => setOpenFinish(true);
  const handleOpenDelete = () => setOpenDelete(true);

  function handleCloseTitle(e) {
    // setInput({
    //    title: "",
    //    users: [],
    // });
    setOpenTitle(false);
  }

  function handleCloseUsers(e) {
    // setInput({
    //    title: "",
    //    users: [],
    // });
    setOpenUsers(false);
  }

  function handleCloseFinish(e) {
    setOpenFinish(false);
  }
  function handleCloseDelete(e) {
    setOpenDelete(false);
  }

  function handleSelect(e) {
    e.preventDefault();
    let id = e.target.value;
    setInput({
      ...input,
      users: [...input.users, id],
    });

    console.log("inputSelect", input, id);
  }

  function handleCancel(e) {
    const usernameToRemove = e.target.textContent;

    setInput((prevInput) => ({
      ...prevInput,
      users: prevInput.users.filter((user) => {
        if (typeof user === "string") return user !== usernameToRemove;
        if (typeof user === "object" && user.username)
          return user.username !== usernameToRemove;
        return true; // En caso de que venga algo inesperado, lo dejamos
      }),
    }));
  }

  function handleSubmitUsers(e, input, id) {
    //console.log("handleSubmitUsers", input, id);
    e.preventDefault();
    updateUsersDesarrollo(input, id)
      .then((res) => {
        if (res.state === "success") {
          setOpenUsers(false);
          setInput({
            title: "",
            users: [],
          });
          Swal.fire({
            icon: "success",
            title:
              "Los usuarios de tu desarrollo fueron modificados con éxito!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  }

  function handleChangeTitle(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmitTitle(e, input, id) {
    e.preventDefault();
    updateTitleDesarrollo(input, id)
      .then((res) => {
        if (res.state === "success") {
          setOpenTitle(false);
          setInput({
            title: "",
            users: [],
          });
          Swal.fire({
            icon: "success",
            title: "Tu titulo fue modificado con éxito!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  }

  function handleSubmitFinish(e, id) {
    e.preventDefault(); 
    updateStateDesarrollo(id)
        .then((res) => {
        if (res.state === "success") {
          setOpenFinish(false);
          Swal.fire({
            icon: "success",
            title: "Tu desarrollo fue finalizado con éxito!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  }

    function handleSubmitDelete(e, id) {
    e.preventDefault(); 
    deleteDesarrollo(id)
        .then((res) => {
        if (res.state === "success") {
          setOpenDelete(false);
          Swal.fire({
            icon: "success",
            title: "Tu desarrollo fue anulado con éxito!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  }

  //console.log("input", input);
  return (
    <div className={style.container}>
      <h4>{title} - {state === 1 ? "Activo" : "Finalizado"}</h4>
      <div>
        <h4 className={style.gridElementH4}>
          <EditRoundedIcon
            onClick={(e) => {
              handleOpenTitle(e, id);
            }}
            className={style.icon}
          />
        </h4>
      </div>
      <div>
        <h4 className={style.gridElementH4}>
          <PersonSearchRoundedIcon
            onClick={(e) => {
              handleOpenUsers(e, id);
            }}
            className={style.icon}
          />
        </h4>
      </div>
      <div>
        <h4 className={style.gridElementH4}>
          <CheckCircleOutlineRoundedIcon
            onClick={(e) => {
              handleOpenFinish(e);
            }}
            className={style.icon}
          />
        </h4>
      </div>
      <div>
        <h4 className={style.gridElementH4}>
          <DeleteForeverRoundedIcon
            onClick={(e) => {
              handleOpenDelete(e);
            }}
            className={style.icon}
          />
        </h4>
      </div>

      {/*Modal de cambio de titulo de un desarrollo*/}
      <Modal
        open={openTitle}
        onClose={handleCloseTitle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <form>
            <label className={mainStyle.labelModal}>Titulo</label>
            <input
              name="title"
              placeholder="Titulo"
              onChange={(e) => handleChangeTitle(e)}
              value={input.title}
              type="text"
              className={mainStyle.inputModal}
            />
            <div className={mainStyle.buttonContainer}>
              <Button
                variant="contained"
                sx={{ marginRight: "12px" }}
                onClick={(e) => handleSubmitTitle(e, input, id)}
              >
                Agregar
              </Button>
              <Button variant="contained" onClick={(e) => handleCloseTitle(e)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      {/*Modal de cambio de usuarios de un desarrollo*/}
      <Modal
        open={openUsers}
        onClose={handleCloseUsers}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          {/* <form onSubmit={(e) => handleSubmitUsers(e)}> */}
          <form>
            <label className={mainStyle.labelModal}>Usuarios</label>
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
            {Array.isArray(input.users) &&
              input.users.length > 0 &&
              input.users.map((user, index) => {
                const username =
                  typeof user === "string" ? user : user.username;
                return (
                  <div key={user.id || index} className={style.userContainer}>
                    <p onClick={(e) => handleCancel(e)}>{username}</p>
                  </div>
                );
              })}
            <div className={mainStyle.buttonContainer}>
              {/* <Button
                variant="contained"
                sx={{ marginRight: "12px" }}
                type="submit"
              > */}
              <Button
                onClick={(e) => handleSubmitUsers(e, input, id)}
                variant="contained"
                sx={{ marginRight: "12px" }}
              >
                Aceptar
              </Button>
              <Button variant="contained" onClick={(e) => handleCloseUsers(e)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      {/*Modal de finalizacion de desarrollo*/}
      <Modal
        open={openFinish}
        onClose={handleCloseFinish}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <form onSubmit={(e) => handleSubmitFinish(e, id)}>
            <label className={mainStyle.labelModal}>
              Estas seguro de finalizarlo ?
            </label>
            <div className={mainStyle.buttonContainer}>
              <Button
                variant="contained"
                sx={{ marginRight: "12px" }}
                type="submit"
              >
                Aceptar
              </Button>
              <Button variant="contained" onClick={(e) => handleCloseFinish(e)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      {/*Modal de anulacion de desarrollo*/}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <form onSubmit={(e) => handleSubmitDelete(e)}>
            <label className={mainStyle.labelModal}>
              Estas seguro de anularlo ?
            </label>
            <div className={mainStyle.buttonContainer}>
              <Button
                variant="contained"
                sx={{ marginRight: "12px" }}
                type="submit"
              >
                Aceptar
              </Button>
              <Button variant="contained" onClick={(e) => handleCloseDelete(e)}>
                Cancelar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default CardDesarrollo;
