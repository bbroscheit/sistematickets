import React from 'react'
import { useState, useEffect } from 'react'
import style from '../modules/tablero.module.css'

function TablaPrioridades() {
    const [ soportesAlta, setSoportesAlta ] = useState(null)
    const [ soportesMedia, setSoportesMedia ] = useState(null)
    const [ soportesBaja, setSoportesBaja ] = useState(null)

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticket`)
        // fetch(http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticket`)
          .then((res) => res.json())
          .then((data) => {
            const soportesFiltradosAlta = data.filter( (soporte) => soporte.state !== 'Completado' && soporte.state !== 'Terminado' && soporte.priority === 'Alta');
              setSoportesAlta(soportesFiltradosAlta);
            const soportesFiltradosMedia = data.filter( (soporte) => soporte.state !== 'Completado' && soporte.state !== 'Terminado' && soporte.priority === 'Media');
              setSoportesMedia(soportesFiltradosMedia);
            const soportesFiltradosBaja = data.filter( (soporte) => soporte.state !== 'Completado' && soporte.state !== 'Terminado' && soporte.priority === 'Baja');
              setSoportesBaja(soportesFiltradosBaja);
          });
      }, []);

    


  return (
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
                  <td>{soportesAlta ? soportesAlta.length : 0 }</td>
                </tr>
                <tr>
                  <td>Media</td>
                  <td>{soportesMedia ? soportesMedia.length : 0 }</td>
                </tr>
                <tr>
                  <td>Baja</td>
                  <td>{soportesBaja ? soportesBaja.length : 0}</td>
                </tr>
              </tbody>
            </table>
  )
}

export default TablaPrioridades