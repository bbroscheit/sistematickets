import React from "react";
import { useState } from "react";
import style from "../modules/TicketCardHelpDesk.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { horasPasadas } from "@/functions/horasPasadas";
import { useEffect } from "react";
import { contarTicketsPorWorker } from "@/functions/contarTicketsPorWorker";
import { contarTicketsPorUsuario } from "@/functions/contarTicketsPorUsuario";
import { sendEmailAdvertisement } from "@/pages/api/sendEmailAdvertisement";

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function TicketCardHelpDesk({ array, title, time }) {
  const [open, setOpen] = useState(false);
  const [openDesarrollo, setOpenDesarrollo] = useState(0);
  const [workers, setWorkers] = useState(null);
  const [users, setUsers] = useState(null);
  const [soportes, setSoportes] = useState(0);
  const [advertisement, setAdvertisement] = useState({
    title: title,
    time: time,
    user: "",
  });

  useEffect(() => {
    setSoportes(horasPasadas(array, time));
    setWorkers(contarTicketsPorWorker(horasPasadas(array, time)));
    setUsers(contarTicketsPorUsuario(horasPasadas(array, time)));
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleClickDesarrollo(e) {
    e.preventDefault();
    openDesarrollo === 0 ? setOpenDesarrollo(1) : setOpenDesarrollo(0);
  }

  function handleAvertisement(e) {
    setAdvertisement({
      ...advertisement,
      user: e.target.innerText,
    });
  }

  function SubmitAdvertisement(e){
    sendEmailAdvertisement(advertisement)
  }

  return (
    <div className={style.ticketCard}>
      <h3>{title}</h3>
      <h5>+ {time}Hs</h5>
      <h1 className={style.cardTitle}>{soportes.length}</h1>
      {title !== "Soportes sin Asignar" ? (
        <>
          {openDesarrollo === 0 ? (
            <KeyboardArrowDownIcon onClick={(e) => handleClickDesarrollo(e)} />
          ) : (
            <KeyboardArrowUpIcon onClick={(e) => handleClickDesarrollo(e)} />
          )}
        </>
      ) : (
        <KeyboardArrowUpIcon
          onClick={(e) => handleClickDesarrollo(e)}
          className={style.iconHidden}
        />
      )}

      {title === "Soportes sin Asignar" ? null : title ===
        "Pendientes de Cierre" ? (
        <div>
          {users != null &&
            Object.keys(users).map((user) => (
              <div
                key={user}
                className={
                  openDesarrollo !== 0
                    ? style.cardSoporte
                    : style.cardSoporteHidden
                }
              >
                <p onClick={(e) => {handleAvertisement(e) ; handleOpen(e) ;}} className={style.title}>{user}</p>
                <p>{users[user]} soportes</p>
              </div>
            ))}
        </div>
      ) : title === "Pedidos de Informacíon" ? (
        <div>
          {users != null &&
            Object.keys(users).map((user) => (
              <div
                key={user}
                className={
                  openDesarrollo !== 0
                    ? style.cardSoporte
                    : style.cardSoporteHidden
                }
              >
                <p onClick={(e) => {handleAvertisement(e) ; handleOpen(e) ;}} className={style.title}>{user}</p>
                <p>{users[user]} soportes</p>
              </div>
            ))}
        </div>
      ) : (
        <div>
          {workers != null &&
            Object.keys(workers).map((worker) => (
              <div
                key={worker}
                className={
                  openDesarrollo !== 0
                    ? style.cardSoporte
                    : style.cardSoporteHidden
                }
              >
                <p onClick={(e) => {handleAvertisement(e) ; handleOpen(e) ;}} className={style.title}>{worker}</p>
                <p>{workers[worker]} soportes</p>
              </div>
            ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={styles}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className={style.modalTitle}>
            ¿ Enviar un recordatorio ?
          </Typography>
          <button
            onClick={(e) => {
              SubmitAdvertisement(e);
              handleClose();
            }}
            className={style.modalButton}
          >
            Aceptar
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default TicketCardHelpDesk;
