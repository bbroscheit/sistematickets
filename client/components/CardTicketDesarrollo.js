import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../modules/cardTcketDesarrollo.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { updateCloseTicket } from "@/pages/api/updateCloseTicket";
import { sendEmailCloseTicket } from "@/pages/api/sendEmailCloseTicket";
import giraFechas from "@/functions/girafechas";
import { extraeFecha } from "@/functions/extraeFecha";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function CardTicketDesarrollo({ id, subject, state, created, username, title }) {
  const router = useRouter();
  const [openCloseTicket, setOpenCloseTicket] = useState(false);
  const [control, setControl] = useState(0);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState({
    idTicket: id,
    useremail: "",
    worker: "",
  });

  //console.log("username", username)

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
    setEmail({
      ...email,
      useremail:loginParse.email
    })
  }, []);


  function handleOpenCloseTicket(e) {
    e.preventDefault();
    setOpenCloseTicket(true);
  }

  function handleCloseTicket() {
    control === 0 ? setControl(1) : setControl(0);
    setOpenCloseTicket(false);
  }

  //cambia el estado del soporte a terminado
  function SubmitCloseTicket(e) {
    e.preventDefault();
    updateCloseTicket(id)
    .then(res => {
      if (res.state === "success") {
        sendEmailCloseTicket(email);
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
  }

  function idKeep(e) {
    e.preventDefault();
    const idSoporte = id;
    localStorage.setItem("idSoporte", JSON.stringify(idSoporte));
  }

  return (
    <>
      <div className={styles.ticketContainer}>
        <div
          onClick={(e) => {
            idKeep(e);
            router.push(`/desarrollos/[id]`, `/desarrollos/${id}`);
          }}
          className={styles.pointer}
        >
          <h4 className={styles.gridElementH4}>{`Ticket N° ${id}`} </h4>
        </div>
        <div onClick={(e) => {
            idKeep(e);
            router.push(`/desarrollos/[id]`, `/desarrollos/${id}`);
          }}
          className={`${styles.pointer} ${styles.centerOfGrid}`}
        >
            <h4 className={styles.gridElementBolder}>{`${subject}`}</h4>
            <div>
                <span><strong>{title}</strong></span><span> - </span><span> {state} </span><span> - </span><span> {username} </span>
            </div>
        </div>
        <div>
          <h4 className={styles.gridElementH4}>Creado el</h4>

          <h4 className={styles.gridElementH4}>{extraeFecha(created)}</h4>
        </div>

        {user &&
        user.sector !== "Sistemas" &&
        state &&
        state === "Completado" ? (
          <div>
            <h4 className={styles.gridElementH4}>
              <AddCircleOutlineRoundedIcon
                onClick={(e) => handleOpenCloseTicket(e)}
                className={styles.icon}
              />
            </h4>
          </div>
        ) : null}
      </div>

      <Modal
        open={openCloseTicket}
        onClose={handleCloseTicket}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className={styles.modalTitle}
          >
            ¿ Deseas cerrar el soporte?
          </Typography>
          <button
            onClick={(e) => {
              SubmitCloseTicket(e);
              handleCloseTicket();
            }}
            className={styles.modalButton}
          >
            Aceptar
          </button>
        </Box>
      </Modal>
    </>
  );
}

export default CardTicketDesarrollo;