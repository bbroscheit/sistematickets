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


function Tablero() {
  const [worker, setWorker] = useState(null)
  
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
        <div>
          <h1 className={mainStyles.title}>Indicadores</h1>
          <div className={style.dashboardCardContainer}>
            <DashboardCardTicket id={1} />
            <DashboardCardTicket id={2} />
            <DashboardCardTicket id={3} />
            <DashboardCardTicket id={4} />
            <TicketCard id={1} />
          </div>
        </div>

        <div className={style.dashboardTicketContainer}>
            <TablaPrioridades />
            <TablaIncidencias />
        </div>
        <div className={`${style.tableContainer} ${style.tableContainerMargin}`}>
          {
            worker !== null && worker.length > 0 ? 
              worker.map( e => <CardWorker key={e.id} worker= {e.username} firstname={e.firstname} lastname={e.lastname}/>)
            : null
          }
          
        </div>
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
