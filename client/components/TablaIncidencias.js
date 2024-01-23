import React from 'react'
import style from "../modules/tablero.module.css";
import { useState, useEffect } from 'react'
import { calculaHoras } from '@/functions/calculaHoras';

function TablaIncidencias() {
    const [soporteGenerado, setSoporteGenerado] = useState(null)
    const [soporteAsignado, setSoporteAsignado] = useState(null)
    const [soporteDesarrollo, setSoporteDesarrollo] = useState(null)
    let soportesHoras = []

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
        // fetch(http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
          .then((res) => res.json())
          .then((data) => {
            setSoporteGenerado(data);
          });
      }, []);
    
      useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketAsignados`)
        // fetch(http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketAsignados`)
          .then((res) => res.json())
          .then((data) => {
            setSoporteAsignado(data);
          });
      }, []);

      useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo`)
        // fetch(http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo`)
          .then((res) => res.json())
          .then((data) => {
            setSoporteDesarrollo(data);
          });
      }, []);

      if (soporteGenerado && soporteAsignado && soporteDesarrollo) {
        const soportes = [...soporteGenerado, ...soporteDesarrollo, ...soporteAsignado];
        soportesHoras = calculaHoras(soportes)
      }

          
  return (
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
                  <td>{soportesHoras.hora1 }</td>
                </tr>
                <tr>
                  <td>72 HS</td>
                  <td>{soportesHoras.hora2}</td>
                </tr>
                <tr>
                  <td>Más de 72 HS</td>
                  <td>{soportesHoras.hora3}</td>
                </tr>
              </tbody>
            </table>
  )
}

export default TablaIncidencias