import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import style from "@/modules/schedule.module.css";
import mainStyle from '@/styles/Home.module.css'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { extraeFecha } from "@/functions/extraeFecha";
import devuelveHoraDesdeTimestamp from "@/functions/devuelveHoraDesdeTimestamp";
import { calcularDiferenciaHoraria } from "@/functions/calculaDiferenciaHoraria";
import { deleteSchedule } from "@/pages/api/deleteSchedule";
import Swal from 'sweetalert2'

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ScheduleCard({ id, detail, starthour, finishhour }) {
  const router = useRouter();

  const [schedule, setSchedule] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)
  const [input, setInput] = useState({
    detail: "",
    invited: "",
    startdate: "",
    starthour: "",
    finishhour: "",
  });

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setCurrentUser(loginParse)
  }, []);

  async function handleOpenModal(e) {
    setOpenModal(true);
    await fetch(
      `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/schedule/id/${id}`
    )
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/schedule/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data);
        setInput({
          detail: data[0].detail,
          invited: data[0].invited,
          startdate: extraeFecha(data[0].startdate),
          starthour: devuelveHoraDesdeTimestamp(data[0].starthour),
          finishhour: devuelveHoraDesdeTimestamp(data[0].finishhour),
        });
        
      });
  }

  const handleClose = () => setOpenModal(false);

  function handleDelete(e){
    e.preventDefault()
    deleteSchedule(id)
    .then(res => {
      setOpenModal(false)
      if (res.state === "success") {
      
      Swal.fire(({
        icon: "success",
        title: "Tu reunión fue eliminada con éxito!",
        showConfirmButton: false,
        timer: 1500
      }));
      setTimeout(() => {
         router.push("/schedule/Schedule")         
      }, 1500);
    }
  })
    
  }

  return (
    <>
      <div
        className={style.ScheduleCardContainer}
        onClick={(e) => {
          handleOpenModal(e);
        }}
      >
        <div> 
          <p>{starthour}</p>
          <p>{finishhour}</p>
        </div>
       
        <p>{detail}</p>
      </div>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          {schedule !== null && schedule.length > 0 ? (
            <div>
              <div className={style.cardInfoTitle}>
                <label>Motivo</label>
                {input.detail && input.detail !== "" ? (
                  <p>{input.detail}</p>
                ) : null}
                <div className={style.fechaDeInicio}>
                <p>Fecha de Inicio</p>

              {input.startdate && input.startdate !== "" ? (
                <p>{input.startdate}</p>
              ) : null}
              </div>
              </div>
              
              <div className={style.containerGrid}> 
              <label>Inicio</label>
              <label>Finalización</label>
              <label>Duración</label>
              {input.starthour && input.starthour !== "" ? (
                <p>{input.starthour}</p>
              ) : null}

              

              {input.finishhour && input.finishhour !== "" ? (
                <p>{input.finishhour}</p>
              ) : null}

              
              <p>{calcularDiferenciaHoraria(input.starthour, input.finishhour)} Hs</p>
              </div> 

              <h4 className={style.subtitleInvitados}>Participantes Invitados</h4>
              {input.invited && input.invited.length > 0
                ? input.invited.map((e) => <p key={e}>{e}</p>)
                : null}
              
              {
                currentUser && currentUser.name === input.invited[0] ? <div className={style.deleteButton}><button  onClick={handleDelete} className={mainStyle.buttonModal}>Eliminar</button></div> : null
              }
              
            </div>
          ) : (
            <p>No hay datos</p>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ScheduleCard;
