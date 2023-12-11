import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import styles from '../modules/card.module.css'
import Link from 'next/link';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { updateWorker } from '@/pages/api/updateWorker';
import { updateCloseTicket  } from '@/pages/api/updateCloseTicket';
import { sendEmailCloseTicket } from '@/pages/api/sendEmailCloseTicket';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display:'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

function Card({ id, subject, state, created}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openCloseTicket, setOpenCloseTicket] = useState(false);
  const [asignar, setAsignar] = useState({name: "sin asignar"})
  const [worker, setWorker] = useState(null);
  const [control, setControl] = useState(0);
  const [user, setUser] = useState(null);

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
  }, []);

  function handleOpen(e){ 
    e.preventDefault()
    setOpen(true) 
  };
  
  function handleClose(){
    control === 0 ? setControl(1) : setControl(0)
    setOpen(false);
  }

  function handleOpenCloseTicket(e){ 
    e.preventDefault()
    setOpenCloseTicket(true) 
  };
  
  function handleCloseTicket(){
    control === 0 ? setControl(1) : setControl(0)
    setOpenCloseTicket(false);
  }

  // asigna un worker al soporte
  function handleAsignar(e){
    e.preventDefault()
    setAsignar({
      name: e.target.value
    })
  }

  //guarda en el soporte la asignacion del desarrollador
  function submitAsignar(e){
    e.preventDefault()
    updateWorker(id , asignar)
    window.location.reload(true)
  }

  //cambia el estado del soporte a terminado
  function SubmitCloseTicket(e){
    e.preventDefault()
    updateCloseTicket(id)
    
    window.location.reload(true)
  }


  return (
    <>
    <div className={styles.ticketContainer}>
        <h3 className={styles.gridElement}>Nº Ticket</h3>
        <h3 className={styles.gridElement}>Título</h3>
        <h3 className={styles.gridElement}>Creado el</h3>
        {
          user && user.sector === "Sistemas" && state && state === "sin asignar"? <h3 className={styles.gridElement}>Acción</h3>
            : user && user.sector !== "Sistemas" && state && state === "Completado"? <h3 className={styles.gridElement}>Acción</h3>
            :  <h3 className={styles.gridElement}></h3>
        }
                 
      <Link href={`/soportes/${id}`} >
        <h3 className={styles.gridElement}>{id}</h3>
      </Link> 
      <Link href={`/soportes/${id}`} >
        <h3 className={styles.gridElement}>{subject}</h3>
      </Link> 
       
      <Link href={`/soportes/${id}`} >
        <h3 className={styles.gridElement}>{created}</h3>
      </Link>
      {
          user && user.sector === "Sistemas" && state && state === "sin asignar"? <h3 className={styles.gridElement}><AddCircleOutlineRoundedIcon onClick= { e => {handleOpen(e)}} className={styles.icon}/></h3>
            : user && user.sector !== "Sistemas" && state && state === "Completado"? <h3 className={styles.gridElement}><AddCircleOutlineRoundedIcon onClick={ e => handleOpenCloseTicket(e)} className={styles.icon}/></h3>
            : null
        }
        
    </div>


    <div className={styles.ticketContainerMobile}>
                         
      <Link href={`/soportes/${id}`} >
        <h3 className={styles.gridElement}>{id}</h3>
      </Link> 
      <Link href={`/soportes/${id}`} >
        <h3 className={styles.gridElement}>{subject}</h3>
      </Link>
      <Link href={`/soportes/${id}`} >
        <h3 className={styles.gridElement}>{subject}</h3>
      </Link> 
      {
          user && user.sector === "Sistemas" && state && state === "sin asignar"? <h3 className={styles.gridElement}><AddCircleOutlineRoundedIcon onClick= { e => {handleOpen(e)}} className={styles.icon}/></h3>
            : user && user.sector !== "Sistemas" && state && state === "Completado"? <h3 className={styles.gridElement}><AddCircleOutlineRoundedIcon onClick={ e => handleOpenCloseTicket(e)} className={styles.icon}/></h3>
            : null
        }
        
    </div>

    
<Modal
open={open}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={style}>
  <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.modalTitle}>
    ¿ A quien deseas asignarle el soporte?
  </Typography>
  <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={asignar.name}
      className={styles.modalSelect}
      onChange={ e => handleAsignar(e)}
    >
      {
        worker !== null && worker.length > 0 ?
            worker.map( e =>  <MenuItem value={e.username} key={worker.id}>{e.username} </MenuItem> ) : null
      }
    </Select>
    <button onClick={ e => { submitAsignar(e) ; handleClose()}} className={styles.modalButton}>Asignar</button>
</Box>
</Modal>

<Modal
open={openCloseTicket}
onClose={handleCloseTicket}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
<Box sx={style}>
  <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.modalTitle}>
    ¿ Deseas cerrar el soporte?
  </Typography>
    <button onClick={ e => { SubmitCloseTicket(e) ; handleCloseTicket()}} className={styles.modalButton}>Aceptar</button>
</Box>
</Modal>

</>
  )
}

export default Card