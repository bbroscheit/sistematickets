import React from 'react'
import { useState, useEffect } from 'react'
import style from '../modules/tablero.module.css'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

function ticketCard({id}) {
    const [pendientes, setPendientes] = useState(null)
    const [desarrollo, setDesarrollo] = useState(null) 
    const [desarrolloPendiente, setDesarrolloPendiente] = useState(null)

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
          .then((res) => res.json())
          .then((data) => {
            setPendientes(data);
          });
    }, []);

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo`)
          .then((res) => res.json())
          .then((data) => {
            setDesarrollo(data);
          });
    }, []);

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsPendientes24`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsPendientes24`)
          .then((res) => res.json())
          .then((data) => {
            setDesarrolloPendiente(data);
          });
    }, []);
    
  return (
    <div className={ `${style.dashboardCardSoporte} ${style.blue}`   } >
         <AccessAlarmsIcon className={style.dashboardCardIcons}/>
            
        <div className={style.dashboardCardTitlesSoporte}>
           <h3>Tiempo promedio de Resolución </h3>
                
            <h3>{ pendientes !== null && pendientes.length > 0 ? pendientes.length : 0} hs</h3>
                
        </div>
    </div>
  )
}

export default ticketCard