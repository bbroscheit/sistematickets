import React from "react";
import { useState, useEffect } from "react";
import DashboardCardTicket from "@/components/DashboardCardTicket";
import TicketCard from "../components/TicketCard";
import mainStyles from "../styles/Home.module.css";
import style from "../modules/tablero.module.css";


function tablero() {
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

        <div>
          <div className={style.dashboardTicketContainer}>
            <TicketCard id={1}/>
            <div className={style.tableContainer}>
              
                <table className={style.primaryTable}>
                  <thead>
                    <tr>
                      <th  colSpan={2} rowSpan={2}>
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
        </div>
      </div>
    </>
  );
}

export default tablero;
