import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';
import Style from '@/modules/projectCard.module.css';
import styleModal from "@/modules/detail.module.css";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {projectChangeState} from '@/pages/api/updateCheckProject'
import  girafechas  from '@/functions/girafechas'
import { calculaPromedio } from '@/functions/calculaPromedio';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({ 
  width: '100%',
  height: 20,
  borderRadius: "15px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 2,
    backgroundColor: theme.palette.mode === 'light' ? '#EA6558' : '#EA6558',
  },
}));

function projectCard({id , state, projectName, projectDetail, requirer, worker, finishdate}) {
  const [project, setProject] = useState(null)
  const [flag, setFlag] = useState(0)
  const [task, setTask] = useState (null)
  const [open, setOpen] = useState(false);
  const [promedio, setPromedio] = useState(null)
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject/${id}`)
      // fetch(`https://localhost:3001/newproject/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProject(data)
          setTask(data[0].newtasks);
      });
    
  }, [id]);

  useEffect(() => {
    let userLogin = JSON.parse(localStorage.getItem("user"));
    userLogin ? setUser(userLogin) : null;
  }, []);

  useEffect(() => {
    if(task !== null){
      let cantidadCumplidas = task.reduce((contador, objeto) => {
        if (objeto.state === "cumplido") {
          return contador + 1;
        }
        return contador;
      }, 0);
      if(task.length > 0 ){
        let promedioTotal = Math.round((cantidadCumplidas * 100 ) / task.length);
        setPromedio(promedioTotal);
      }else{
        setPromedio(0);
      }
      
    }
});

function handleOpen(e) {
  e.preventDefault();
  setOpen(true);
}

function handleClose() {
  setOpen(false);
}

  function idKeep(e) {
    e.preventDefault();
    const idProyecto = id;
    localStorage.setItem("idProyecto", JSON.stringify(idProyecto));
  }

  function handleSubmit(e) {
    e.preventDefault();
    projectChangeState(id)
    .then(res => {
      if (res.state === "success") {
          Swal.fire(({
            icon: "success",
            title: "Diste por terminado el proyecto",
            showConfirmButton: false,
            timer: 1500
          }));
      setTimeout(() => {
        window.location.reload(true); 
      }, 1500);    
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
    
    
  }

    console.log("project", project )

  return (
   
    <div className={Style.cardContainer}> 
      {/* <CheckCircleOutlineIcon /> */}
      <Link href={`/proyectos/${id}`} className={Style.cardLink}>
      {/* <div className={Style.cardLink} onClick={(e) => {
            idKeep(e);
            router.push(`/proyectos/[id]`, `/proyectos/${id}`);
          }}> */}
        <div className={Style.projectCardTitle}>
          <h2>{ project && project !== null ? project[0].projectname : projectName}</h2>
         
            <p className={Style.projectDate}>{girafechas(finishdate)}</p>
            
          
        </div>
        <div className={Style.projectCardDetail}>
          <p>{project && project !== null ? project[0].projectdetail : projectDetail}</p>
        </div>
        </Link>
      {/* </div> */}
        <div className={Style.projectCardPeople}>
          <h6>Solicitado por : { requirer }</h6>
          <h6>Desarrollado por : { worker }</h6>
        </div>
        <div className={Style.progressContainer}>
          <h6>Progreso :</h6>
          <div>
            {
              task !== null ? 
              <div className={Style.progressGrid}>
                <BorderLinearProgress variant="determinate" value={calculaPromedio(task)} className={Style.progressBar}/>
                <span>{calculaPromedio(task)} %</span>
                {
                  user !== null && user.isprojectmanager === true ?
                    <CheckCircleOutlineIcon className= {calculaPromedio(task) !== 100 ? Style.iconcheck : Style.iconcheckActive} onClick={handleOpen}/>
                    : null
                }
                
              </div> : null
            }
                        
          </div>
          
        </div>

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
            className={styleModal.modalTitle}
          >
            ¿ Deseas dar por terminado este proyecto ?
          </Typography>
          
          <button
            onClick={(e) => {
              handleSubmit(e);
              handleClose();
            }}
            className={styleModal.modalButton}
          >
            Aceptar
          </button>
        </Box>
      </Modal>
    </div>
    
  )
}

export default projectCard