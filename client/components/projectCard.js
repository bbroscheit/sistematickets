import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';
import Style from '@/modules/projectCard.module.css';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {projectChangeState} from '@/pages/api/updateCheckProject'
import  girafechas  from '@/functions/girafechas'
import { calculaPromedio } from '@/functions/calculaPromedio';


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
  const [promedio, setPromedio] = useState(null)
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

  function idKeep(e) {
    e.preventDefault();
    const idProyecto = id;
    localStorage.setItem("idProyecto", JSON.stringify(idProyecto));
  }

  function handleClick(e) {
    e.preventDefault();
    projectChangeState(id)
    
    flag === 1 ? setFlag(0): setFlag(1)
    
    alert("proyecto finalizado")
  }

    console.log("data", task )

  return (
   
    <div className={Style.cardContainer}> 
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
              </div> : null
            }
                        
          </div>
          
        </div>
    </div>
    
  )
}

export default projectCard