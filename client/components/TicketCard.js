import React from 'react'
import { useState, useEffect } from 'react'
import style from '../modules/tablero.module.css'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { horasPromedio } from '@/functions/horasPromedio';

function ticketCard() {
    const [soportesCompletados, setSoportesCompletados] = useState(null)
    const [soportesTerminados, setSoportesTerminados] = useState(null)
    let promedioHoras = 0

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketCompletado`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketCompletado`)
          .then((res) => res.json())
          .then((data) => {
            setSoportesCompletados(data || []);           
          });
    }, []);

    useEffect(() => {
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketTerminado`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketTerminado`)
        .then((res) => res.json())
        .then((data) => {
          setSoportesTerminados(data || []);          
        });
  }, []);

  if (soportesCompletados && soportesTerminados) {
    const soportes = [...soportesCompletados, ...soportesTerminados];
    promedioHoras = horasPromedio(soportes);
  }
   
  
  return (
    <div className={ `${style.dashboardCardSoporte} ${style.blue}`   } >
         <AccessAlarmsIcon className={style.dashboardCardIcons}/>
            
        <div className={style.dashboardCardTitlesSoporte}>
           <h3>Tiempo promedio de Resolución </h3>
                
            <h3>{ Math.ceil(promedioHoras) } hs</h3>
                
        </div>
    </div>
  )
}

export default ticketCard