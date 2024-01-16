import React from "react";
import { useState, useEffect } from "react";
import DashboardCardTicket from "@/components/DashboardCardTicket";
import TicketCard from "../components/TicketCard";
import mainStyles from "../styles/Home.module.css";
import style from "../modules/tablero.module.css";
import giraFechas from "@/functions/girafechas";
import { calculaPromedio } from "@/functions/calculaPromedio";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CardWorker from "@/components/CardWorker";
import { extraeFecha } from "@/functions/extraeFecha";

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

function tablero() {
  const [proyecto, setProyecto] = useState(null)
  const [worker, setWorker] = useState(null)
  
  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project`)
    // fetch(http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project`)
      .then((res) => res.json())
      .then((data) => {
        setProyecto(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
    // fetch(http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project`)
      .then((res) => res.json())
      .then((data) => {
        setWorker(data);
      });
  }, []);

  return (
    <>
      <div className={mainStyles.container}>
        <div>
          <h1 className={mainStyles.title}>Indicadores</h1>
          <div className={style.dashboardCardContainer}>
            <DashboardCardTicket id={1} />
            <DashboardCardTicket id={2} />
            <DashboardCardTicket id={3} />
          </div>
        </div>

        <div className={style.dashboardTicketContainer}>
          <TicketCard id={1} />
          <div className={style.tableContainer}>
            <table className={style.primaryTable}>
              <thead>
                <tr>
                  <th colSpan={2} rowSpan={2}>
                    INCIDENCIAS SIN RESOLVER SEGÚN PRIORIDAD DEL USUARIO
                  </th>
                </tr>
              </thead>
              <tbody className={style.tableBody}>
                <tr>
                  <td>Alta</td>
                  <td>Dato1</td>
                </tr>
                <tr>
                  <td>Media</td>
                  <td>Dato1</td>
                </tr>
                <tr>
                  <td>Baja</td>
                  <td>Dato1</td>
                </tr>
              </tbody>
            </table>

            <table className={style.primaryTable}>
              <thead>
                <tr>
                  <th colSpan={2} rowSpan={2}>
                    INCIDENCIAS CON MAS DE 24 HS HABILES SIN RESOLUCION
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>48 HS</td>
                  <td>Dato1</td>
                </tr>
                <tr>
                  <td>72 HS</td>
                  <td>Dato1</td>
                </tr>
                <tr>
                  <td>Más de 72 HS</td>
                  <td>Dato1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={`${style.tableContainer} ${style.tableContainerMargin}`}>
          {
            worker !== null && worker.length > 0 ? 
              worker.map( e => <CardWorker key={e.id} worker= {e.username} firstname={e.firstname} lastname={e.lastname}/>)
            : null
          }
          
        </div>
        <div className={style.tableContainerProyect}>
          <table className={style.primaryTable}>
            <thead>
              <tr>
                <th colSpan={19} rowSpan={2}>
                  NUEVOS DESARROLLOS
                </th>
              </tr>
            </thead>
            <tbody className={style.blue}>
              <tr>
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
                        <td colSpan={7}><div className={style.progressBarContainer}><BorderLinearProgress variant="determinate" value={calculaPromedio(e)} className={style.progressBar}/> <span>{calculaPromedio(e)} %</span></div> </td>
                      </tr>)
                  : null
                }
                
              
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default tablero;
