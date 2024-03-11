import React, { useState , useEffect } from 'react'
import style from '@/modules/schedule.module.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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


function ScheduleCard({ id , detail , starthour}) {
    const [ schedule , setSchedule] = useState(null)
    const [ openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/schedule/${id}`)
            // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/schedule/${id}`)
            .then((res) => res.json())
            .then((data) => {
                
            setSchedule(data);
        });
    })
        


    function handleOpenModal(e){   
         setOpenModal(true)
    };

    const handleClose = () => setOpenModal(false);

    
  return (
    <>
    <div className={style.ScheduleCardContainer} onClick={e =>{ handleOpenModal(e)}}>
        <p>{starthour}</p>
        <p>{detail}</p>
    </div>

<Modal
open={openModal}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={styles}>
    {
        schedule !== null && schedule.length > 0 ?
        <div>
            <label>Asunto</label>
            <input type='text' name="detail" value={schedule.detail} ></input>
            <p>Fecha de Inicio</p><p>25-03-25</p>
            <label >Selecciona una hora de inicio</label>
            <input type="time" name="starthour" value="detail" ></input>
            <label >Selecciona una hora de cierre</label>
            <input type="time" name="finishhour" value="detail" ></input>
            <label >Elije a los participantes</label>
            <select >
                <option>usuario 1</option>
                <option>usuario 2</option>
                <option>usuario 3</option>
                <option>usuario 4</option>
            </select>
        </div> : <p>No hay datos</p>
    }

{/* <button onClick={e => { handleClose()}}>Aceptar</button> */}
</Box>
</Modal>
</>
  )
}

export default ScheduleCard