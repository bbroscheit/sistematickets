import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../modules/card.module.css";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { updateWorker } from "@/pages/api/updateWorker";
import { updateCloseTicket } from "@/pages/api/updateCloseTicket";
import { ticketAssigment } from "@/pages/api/ticketAssigment";
import { sendEmailAssigment } from "@/pages/api/sendEmailAssigment";
import { sendEmailAssigmentUser } from "@/pages/api/sendEmailAssigmentUser";
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

function Card({ id, subject, state, created }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openCloseTicket, setOpenCloseTicket] = useState(false);
  const [openAssigment, setOpenAssigment] = useState(false);
  const [asignar, setAsignar] = useState({ name: "sin asignar" });
  const [worker, setWorker] = useState(null);
  const [control, setControl] = useState(0);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState({
    idTicket: id,
    useremail: "",
    worker: "",
  });

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
      .then((res) => res.json())
      .then((data) => {
        setWorker(data);
      });
  }, [router.query.id]);

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
    setEmail({
      ...email,
      useremail:loginParse.email
    })
  }, []);

  function handleOpen(e) {
    e.preventDefault();
    setOpen(true);
  }

  function handleClose() {
    control === 0 ? setControl(1) : setControl(0);
    setOpen(false);
  }

  function handleOpenCloseTicket(e) {
    e.preventDefault();
    setOpenCloseTicket(true);
  }

  function handleCloseTicket() {
    control === 0 ? setControl(1) : setControl(0);
    setOpenCloseTicket(false);
  }

  function handleOpenAssigment(e) {
    e.preventDefault();
    setOpenAssigment(true);
  }

  function handleCloseAssigment() {
    control === 0 ? setControl(1) : setControl(0);
    setOpenAssigment(false);
  }

  // asigna un worker al soporte
  function handleAsignar(e) {
    e.preventDefault();
    setAsignar({
      name: e.target.value,
    });
    setEmail({
      ...email,
      worker: e.target.value,
    });
  }

  //guarda en el soporte la asignacion del desarrollador
  function submitAsignar(e) {
    e.preventDefault();
    updateWorker(id, asignar)
    .then(res => {
      if (res.state === "success") {
        sendEmailAssigment(email);
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
  }

  //desarrollador acepta el comienzo del desarrollo
  function SubmitAssigmentAcept(e) {
    e.preventDefault();
    ticketAssigment(id)
      .then(res => {
        if (res.state === "success") {
          sendEmailAssigmentUser(email);
          window.location.reload(true);
        }
      })
      .catch(error => {
        console.error("Error al enviar el formulario:", error);
      });
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
            router.push(`/soportes/[id]`, `/soportes/${id}`);
          }}
          className={styles.pointer}
        >
          <h4 className={styles.gridElementH4}>{`Ticket N° ${id}`} </h4>
        </div>
        <div
          onClick={(e) => {
            idKeep(e);
            router.push(`/soportes/[id]`, `/soportes/${id}`);
          }}
          className={styles.pointer}
        >
          <h4 className={styles.gridElementBolder}>{`${subject}`}</h4>
        </div>
        <div>
          <h4 className={styles.gridElementH4}>Creado el</h4>

          <h4 className={styles.gridElementH4}>{extraeFecha(created)}</h4>
        </div>

        {user &&
        user.sector === "Sistemas" &&
        state &&
        state === "sin asignar" ? (
          <div>
            <h4 className={styles.gridElementH4}>
              <AddCircleOutlineRoundedIcon
                onClick={(e) => {
                  handleOpen(e);
                }}
                className={styles.icon}
              />
            </h4>
          </div>
        ) : null}

        {user && user.sector === "Sistemas" && state && state === "Asignado" ? (
          <div>
            <h4 className={styles.gridElementH4}>
              <AddCircleOutlineRoundedIcon
                onClick={(e) => handleOpenAssigment(e)}
                className={styles.icon}
              />
            </h4>
          </div>
        ) : null}

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
        open={open}
        onClose={handleClose}
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
            ¿ A quien deseas asignarle el soporte?
          </Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={asignar.name}
            className={styles.modalSelect}
            onChange={(e) => handleAsignar(e)}
          >
            {worker !== null && worker.length > 0
              ? worker.map((e) => (
                  <MenuItem value={e.username} key={worker.id}>
                    {e.username}{" "}
                  </MenuItem>
                ))
              : null}
          </Select>
          <button
            onClick={(e) => {
              submitAsignar(e);
              handleClose();
            }}
            className={styles.modalButton}
          >
            Asignar
          </button>
        </Box>
      </Modal>

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

      <Modal
        open={openAssigment}
        onClose={handleCloseAssigment}
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
            ¿ Deseas comenzar el desarrollo ?
          </Typography>
          <button
            onClick={(e) => {
              SubmitAssigmentAcept(e);
              handleCloseAssigment();
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

export default Card;
