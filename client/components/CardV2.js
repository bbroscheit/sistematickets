import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import style from "../modules/cardV2.module.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { updateWorker } from "@/pages/api/updateWorker";
import { updateCloseTicket } from "@/pages/api/updateCloseTicket";
import { ticketAssigment } from "@/pages/api/ticketAssigment";
import { sendEmailAssigment } from "@/pages/api/sendEmailAssigment";
import { sendEmailAssigmentUser } from "@/pages/api/sendEmailAssigmentUser";
import { sendEmailCloseTicket } from "@/pages/api/sendEmailCloseTicket";
import { extraeFecha } from "@/functions/extraeFecha";

function statePill(state) {
  switch (state) {
    case "sin asignar":
      return { label: "Sin asignar", cls: style.pillGray };
    case "Asignado":
      return { label: "Asignado", cls: style.pillBlue };
    case "Desarrollo":
      return { label: "Desarrollo", cls: style.pillAmber };
    case "Informacion":
      return { label: "Información", cls: style.pillPurple };
    case "Completado":
      return { label: "Completado", cls: style.pillGreen };
    case "Terminado":
      return { label: "Terminado", cls: style.pillGreen };
    default:
      return { label: state, cls: style.pillGray };
  }
}

function CardV2({ id, subject, state, created }) {
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
      useremail: loginParse.email,
    });
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
      .then((res) => {
        if (res.state === "success") {
          sendEmailAssigment(email);
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  }

  //desarrollador acepta el comienzo del desarrollo
  function SubmitAssigmentAcept(e) {
    e.preventDefault();
    ticketAssigment(id)
      .then((res) => {
        if (res.state === "success") {
          sendEmailAssigmentUser(email);
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  }

  //cambia el estado del soporte a terminado
  function SubmitCloseTicket(e) {
    e.preventDefault();
    updateCloseTicket(id)
      .then((res) => {
        if (res.state === "success") {
          sendEmailCloseTicket(email);
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  }

  function idKeep(e) {
    e.preventDefault();
    const idSoporte = id;
    localStorage.setItem("idSoporte", JSON.stringify(idSoporte));
  }

  function goToDetail(e) {
    idKeep(e);
    router.push(`/soportes/v2/[id]`, `/soportes/v2/${id}`);
  }

  const pill = statePill(state);

  const showAsignarAction =
    user && user.sector === "Sistemas" && state && state === "sin asignar";
  const showComenzarDesarrolloAction =
    user && user.sector === "Sistemas" && state && state === "Asignado";
  const showCerrarAction =
    user && user.sector !== "Sistemas" && state && state === "Completado";

  return (
    <>
      <div className={style.row}>
        <div className={style.clickArea} onClick={(e) => goToDetail(e)}>
          <span className={style.num}>{`N.° ${id}`}</span>
          <span className={style.subject}>{subject}</span>
          <span className={`${style.pill} ${pill.cls}`}>{pill.label}</span>
          <span className={style.date}>Creado el {extraeFecha(created)}</span>
        </div>

        {showAsignarAction ? (
          <AddCircleOutlineRoundedIcon
            className={style.action}
            onClick={(e) => handleOpen(e)}
          />
        ) : showComenzarDesarrolloAction ? (
          <AddCircleOutlineRoundedIcon
            className={style.action}
            onClick={(e) => handleOpenAssigment(e)}
          />
        ) : showCerrarAction ? (
          <AddCircleOutlineRoundedIcon
            className={style.action}
            onClick={(e) => handleOpenCloseTicket(e)}
          />
        ) : (
          <span className={style.chev} onClick={(e) => goToDetail(e)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.modalBox}>
          <h2 id="modal-modal-title">¿A quién deseas asignarle el soporte?</h2>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={asignar.name}
            className={style.modalSelect}
            onChange={(e) => handleAsignar(e)}
          >
            {worker !== null && worker.length > 0
              ? worker.map((e) => (
                  <MenuItem value={e.username} key={e.id}>
                    {e.username}{" "}
                  </MenuItem>
                ))
              : null}
          </Select>
          <button
            className={style.btn}
            onClick={(e) => {
              submitAsignar(e);
              handleClose();
            }}
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
        <Box className={style.modalBox}>
          <h2 id="modal-modal-title">¿Deseas cerrar el soporte?</h2>
          <button
            className={style.btn}
            onClick={(e) => {
              SubmitCloseTicket(e);
              handleCloseTicket();
            }}
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
        <Box className={style.modalBox}>
          <h2 id="modal-modal-title">¿Deseas comenzar el desarrollo?</h2>
          <button
            className={style.btn}
            onClick={(e) => {
              SubmitAssigmentAcept(e);
              handleCloseAssigment();
            }}
          >
            Aceptar
          </button>
        </Box>
      </Modal>
    </>
  );
}

export default CardV2;
