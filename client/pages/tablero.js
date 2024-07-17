import React from "react";
import { useState, useEffect } from "react";
import DashboardCardTicket from "@/components/DashboardCardTicket";
import TicketCard from "../components/TicketCard";
import mainStyles from "../styles/Home.module.css";
import style from "../modules/tablero.module.css";
import CardWorker from "@/components/CardWorker";
import TablaIncidencias from "@/components/TablaIncidencias";
import TablaPrioridades from "@/components/TablaPrioridades";
// import ProyectTable from "@/components/proyectTable";
import ChartBySalepoint from "@/components/ChartBySalepoint";
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import { ticketCompletos } from "@/functions/ticketCompletos";
import { horasPromedio } from "@/functions/horasPromedio";
import { horasPromedioHabiles } from "@/functions/horasPromedioHabiles";
import CardBySalepoint from "@/components/CardBySalepoint";


function Tablero() {
  const [worker, setWorker] = useState(null)
  const [soportes, setSoportes] = useState(null)
  
  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticket`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticket`)
      .then((res) => res.json())
      .then((data) => {
        setSoportes(data);
      });
}, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
    // fetch(http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
      .then((res) => res.json())
      .then((data) => {
        setWorker(data);
      });
  }, []);

  
  return (
    <>
      <div className={mainStyles.container}>
        <h1 className={mainStyles.title}>Indicadores</h1>
        <div className={style.mainDiv}>
          <div>
            <ScreenshotMonitorIcon className={style.mainDivIcon}/>
          </div>
          <div className={style.secondDiv}>
            <h3>Soportes Totales</h3>
            <h3>{soportes !== null && soportes.length > 0 ? soportes.length : 0 }</h3>
            <h3>Soportes Terminados</h3>
            <h3>{soportes !== null && soportes.length > 0 ? ticketCompletos(soportes).length  : 0 }</h3>
            <h3>Tiempo Promedio</h3>
            <h3>{soportes !== null && soportes.length > 0 ? Math.floor(horasPromedioHabiles(soportes)) : 0 } Hs</h3>
          </div>
        </div>
        <div className={style.center}>
          <div className={style.dashboardCardContainer}>
            <DashboardCardTicket id={1} />
            <DashboardCardTicket id={2} />
            <DashboardCardTicket id={3} />
            <DashboardCardTicket id={4} />
            {/* <TicketCard id={1} /> */}
          </div>
        </div>

        {/* <div className={style.dashboardTicketContainer}>
            <TablaPrioridades />
            <TablaIncidencias />
        </div> */}

        <h1 className={mainStyles.title}>Desarrolladores</h1>
        <div className={`${style.tableContainer} ${style.tableContainerMargin}`}>
          {
            worker !== null && worker.length > 0 ? 
              worker.map( e => <CardWorker key={e.id} worker= {e.username} firstname={e.firstname} lastname={e.lastname}/>)
            : null
          }
          
        </div>
        {/* <h1 className={mainStyles.title}>Sectores</h1>
        <div className={`${style.tableContainer} ${style.tableContainerMargin}`}>
          <CardBySalepoint salepoint={"Buenos Aires"}/>
          <CardBySalepoint salepoint={"Baxpa"}/>
          <CardBySalepoint salepoint={"Baebsa"}/>
        </div> */}
        {/* <div className={style.chart}>
          <ChartBySalepoint />
        </div> */}
        {/* <div className={style.tableContainerProyect}>
          <ProyectTable />
        </div> */}
      </div>
    </>
  );
}

export default Tablero;
