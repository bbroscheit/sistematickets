import React, { useState, useEffect } from 'react'
import Style from '@/modules/projectCard.module.css';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({ 
  width: '100%',
  height: 15,
  borderRadius: "9999px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function projectCard({id , state, projectName, projectDetail, requirer, worker, finishdate}) {
  
  const [userstories, setUserstories] = useState (null)
  const [promedio, setPromedio] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3001/project/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserstories(data[0].userstories);
      });
  }, [id]);

  console.log("userstories", userstories)

  useEffect(() => {
    if(userstories !== null){
      let cantidadCumplidas = userstories.reduce((contador, objeto) => {
        if (objeto.state === "cumplido") {
          return contador + 1;
        }
        return contador;
      }, 0);
      if(userstories.length > 0 ){
        let promedioTotal = Math.round((cantidadCumplidas * 100 ) / userstories.length);
        setPromedio(promedioTotal);
      }else{
        setPromedio(0);
      }
      console.log("cumplidas", cantidadCumplidas);
    }
});

  
  return (
    <Link href={`/proyectos/${id}`}>
    <div className={Style.cardContainer}>
        <div className={Style.projectCardTitle}>
          <h2>{projectName}</h2>
          <p>{finishdate}</p>
        </div>
        <div className={Style.projectCardDetail}>
          <p>{projectDetail}</p>
        </div>
        <div className={Style.projectCardPeople}>
          <h6>Solicitado por : {requirer}</h6>
          <h6>Desarrollado por : {worker}</h6>
        </div>
        <div className={Style.progressContainer}>
          <h6>Progreso</h6>
          <div>
            <BorderLinearProgress variant="determinate" value={promedio} />
            <span>{promedio} %</span>
          </div>
        </div>
    </div>
    </Link>
  )
}

export default projectCard