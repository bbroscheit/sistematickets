import React from 'react'
import {useState} from 'react'
import style from '@/modules/cardCapacitation.module.css'
import mainStyle from "@/styles/Home.module.css";
import { extraeFecha } from '@/functions/extraeFecha'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import devuelveHoraDesdeTimestamp from '@/functions/devuelveHoraDesdeTimestamp'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { postCapacitationFinish } from '@/pages/api/postCapacitationFinish';

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

function CardCapacitation( { key, id, teacher, subject, student, startdate }) {
    const [open, setOpen] = useState(false);
    const [ input, setInput ] = useState({
        id : id,
        finishdate:"",
        finishhour:"",
        state:"Terminado"
    })

    function handleOpen() {
        setOpen(true);
        
      }
    
    function handleClose() {
        setOpen(false);
    }

    function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        postCapacitationFinish(input)
        .then(res => {
            
          if (res.state === "success") {
            setOpen(false);
            setInput({
                id : "",
                finishdate:"",
                finishhour:"",
                state:"Terminado"
            });
            Swal.fire(({
              icon: "success",
              title: "Tu capacitacion fue creada con éxito!",
              showConfirmButton: false,
              timer: 1500
            }));
          }
        })
        .catch(error => {
          console.error("Error al enviar el formulario:", error);
        });
    }

    //console.log("input", input)

    return (
    <div key={key} className={style.cardCapacitation}>
        <div className={style.checkIcon}>
            <CheckCircleOutlineIcon className={style.icon} onClick={handleOpen}/>
        </div>
        <div>
        <h4>{`${teacher ? teacher.firstname : ""} ${teacher ? teacher.lastname : "" }` }</h4>
        <h5>{`${extraeFecha(startdate)} - ${devuelveHoraDesdeTimestamp(startdate)}` }</h5>
        <h4>Temas</h4>
         {
            subject.map( e => <p>{e}</p>)
        }
        <h4>Participantes</h4>
        {
            student.map( e => <p>{`${e.firstname} ${e.lastname}`}</p>)
            
        } 
        </div>

            {/* modal asignacion de worker de soporte */}
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
            className={mainStyle.subtitle}
          >
            Ingresa fecha de cierre 
          </Typography>
          <div className={style.dateContainer}>
                
                    <div className={style.date}>
                        <label >Fecha de Cierre</label>
                        <input
                            type="date"
                            id="finishdate"
                            name="finishdate"
                            onChange={(e) => handleChange(e)}
                            value={input.finishdate}
                        />
                    </div>
                    <div className={style.date}>
                        <label >Hora de Cierre</label>
                        <input
                            type="time"
                            id="finishhour"
                            name="finishhour"
                            onChange={(e) => handleChange(e)}
                            value={input.finishhour}
                        />
                    </div>
                
            </div>
          <button
            onClick={(e) => {
              handleSubmit(e);
              handleClose();
            }}
            className={mainStyle.button}
          >
            Cerrar
          </button>
        </Box>
      </Modal>
    </div>
  )
}

export default CardCapacitation