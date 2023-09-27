import React from 'react'
import Style from '@/modules/projectCard.module.css';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
            <BorderLinearProgress variant="determinate" value={50} />
            <span>50%</span>
          </div>
        </div>
    </div>
    </Link>
  )
}

export default projectCard