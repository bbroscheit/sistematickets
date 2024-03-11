import React from 'react'
import style from "../modules/tablero.module.css";
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { extraeFecha } from "@/functions/extraeFecha";
import giraFechas from "@/functions/girafechas";
import { calculaPromedio } from "@/functions/calculaPromedio";


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

function ProyectTable() {
    const [proyecto, setProyecto] = useState(null)

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject`)
        // fetch(http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject`)
          .then((res) => res.json())
          .then((data) => {
            data.sort((a, b) => new Date(a.finishdate) - new Date(b.finishdate));
            setProyecto(data);
          });
      }, []);
             
  return (
    <table className={style.primaryTable}>
            <thead>
              <tr>
                <th colSpan={19} rowSpan={2}>
                  NUEVOS DESARROLLOS
                </th>
              </tr>
            </thead>
            <tbody >
              <tr >
                <td colSpan={5}>Proyecto</td>
                <td colSpan={3}>Estado</td>
                <td colSpan={2}>Inicio</td>
                <td colSpan={2}>Finalización</td>
                <td colSpan={7}>Progeso</td>
              </tr>
              
                { proyecto !== null && proyecto.length > 0 ? 
                    proyecto.map( e => 
                      <tr key={e.id}>
                        <td colSpan={5}>{e.projectname}</td>
                        <td colSpan={3}>{e.state}</td>
                        <td colSpan={2}>{extraeFecha(e.createdAt)}</td>
                        <td colSpan={2}>{giraFechas(e.finishdate)}</td>
                        <td colSpan={7}><div className={style.progressBarContainer}><BorderLinearProgress variant="determinate" value={calculaPromedio(e.newtasks)} className={style.progressBar}/> <span>{calculaPromedio(e.newtasks)} %</span></div> </td>
                      </tr>)
                  : null
                }
                
              
              
            </tbody>
          </table>
  )
}

export default ProyectTable