import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../modules/detail.module.css";
import mainStyle from "@/styles/Home.module.css";
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { updateWorker } from "../api/updateWorker";

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
  display:'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

function Soporte() {
  const router = useRouter();
  const id = router.query.id;

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null)
  const [soporte, setSoporte] = useState(null);
  const [worker, setWorker] = useState(null);
  const [asignar, setAsignar] = useState({name: "sin asignar"})
  const [control, setControl] = useState(0)
  const [faq , setFaq] = useState(null)
  const [faqFiltered, setFaqFiltered] = useState(null)

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSoporte(data);
      });
  }, [router.query.id]);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
      .then((res) => res.json())
      .then((data) => {
        setWorker(data);
      });
  }, [router.query.id]);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`)
      .then((res) => res.json())
      .then((data) => {
        setFaq(data)
      });
  }, [router.query.id]);

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
  }, []);

  // abre y cierra el modal , se cambio a function porque se reiniciaba la app
  function handleOpen(e){ 
    e.preventDefault()
    setOpen(true) 
  };
  

  function handleClose(){
    control === 0 ? setControl(1) : setControl(0)
    setOpen(false);
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
    
  }
  
  console.log("soporte", soporte)
  console.log("faq", faq)
  console.log("worker", worker)
  console.log("user", user)
  console.log("asignar", asignar)
  console.log("control", control)

  return (
    <>
    <div className={mainStyle.container}>
        { soporte !== null ?
        <div>
      <h1 className={mainStyle.title}>Soporte Nº {soporte.id}</h1>
      <h2 className={mainStyle.subtitle}>{soporte.subject}</h2>
      <div>
        <div>
            <div> <h3> Estado: </h3> <p>{soporte.state}</p> </div>
            { user !== null && user.sector !== "Sistemas" ? 
              <div> <h3> Asignado a : </h3> <p>{soporte.worker}</p> </div>:
              <div>
                  <h3>Asignado a : </h3> <p>{soporte.worker}</p> 
                  <button onClick= { e => {handleOpen(e)}}> Cambiar </button>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
            
          </FormControl>
        </div>
            }
            
        </div>
      </div>
      {/* aparece solo spara el worker*/}
      {/* <div>
        <div>
          <h3>Usuario : {soporte.user.username}</h3>
        </div>
        <div>
          <h3>Puede resolverlo el usuario?</h3>
          <CheckCircleOutlineIcon />
          <CancelOutlinedIcon />
          {/* <input type="radio" value="yes" name="resolve" /> 
          {/* <input type="radio" value="no" name="resolve" /> 
        </div>
      </div> */
      }
      <div>
        {/* bloqueado para todos*/}
        <h3>Detalle : </h3>
        <textarea
          placeholder={soporte.detail}
          disabled
          cols="80"
          rows="14"
        />
      </div>
      { faq !== null && faq.length > 0 ? 
      // setFaqFiltered( faq.filter ( e => e.title === soporte.subject))
        <div>
          {/* bloqueado para todos*/}
        <h3>Solución : </h3>
        <textarea
          placeholder={faq.answer}
          disabled
          cols="80"
          rows="14"
        />
      </div> 
      : null}
      

      <div>
        {/* bloqueado para el usuario y el worker una vez enviado*/}
        <h3>Solicitud de datos : </h3>
        <textarea
          placeholder="Motivo para solicitar mas datos..."
          cols="80"
          rows="17"
        />
      </div>
      <div>
        {/* aparece solo si el estado es "solicita mas datos" ,bloqueado para el usuario y el worker una vez enviado*/}
        <h3>Datos adicionales : </h3>
        <textarea
          placeholder="Datos agregados por el usuario"
          cols="80"
          rows="17"
        />
      </div>
      <div>
        {/* bloqueado para el usuario*/}
        <h3>Resolución : </h3>
        <textarea
          placeholder="Solucion dada por el Worker"
          cols="80"
          rows="17"
        />
      </div>
      <div>
        <button type="button">Aceptar</button>
        <button type="button">Cerrar Ticket</button>
      </div></div> : <h3> Loading... </h3>
      }
    </div>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className={style.modalTitle}>
            ¿ A quien deseas asignarle el soporte?
          </Typography>
          <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={asignar.name}
              className={style.modalSelect}
              onChange={ e => handleAsignar(e)}
            >
              {
                worker !== null && worker.length > 0 ?
                    worker.map( e =>  <MenuItem value={e.username} key={worker.id}>{e.username} </MenuItem> ) : null
              }
            </Select>
            <button onClick={ e => { submitAsignar(e) ; handleClose()}} className={style.modalButton}>Asignar</button>
        </Box>
      </Modal>

    </>
  );
}
export default Soporte;
