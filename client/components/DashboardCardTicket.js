import React from 'react'
import { useState, useEffect } from 'react'
import style from '../modules/tablero.module.css'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import HandymanIcon from '@mui/icons-material/Handyman';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

function DashboardCardTicket({id}) {
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
    <div className={ `${style.dashboardCard} ${ id === 1 ? style.green : id === 2 ? style.yellow : style.red }`   } >
        { id === 1 ? <NotificationsRoundedIcon className={style.dashboardCardIcons}/>
            : id === 2 ? <HandymanIcon className={style.dashboardCardIcons}/>
                : <WarningAmberIcon className={style.dashboardCardIcons}/>
        }
        <div className={style.dashboardCardTitles}>
            { id === 1 ? <h3>Tickets pendientes de asignación</h3>
                : id === 2 ? <h3>Tickets en Desarrollo</h3>
                    : <div><h3>Tickets en Desarrollo</h3><h5>más de 24hs</h5></div>
            }
            { id === 1 ? <h3>{ pendientes !== null && pendientes.length > 0 ? pendientes.length : 0}</h3>
                : id === 2 ? <h3>{ desarrollo !== null && desarrollo.length > 0 ? desarrollo.length : 0}</h3>
                    : <h3>{ desarrolloPendiente !== null && desarrolloPendiente.length > 0 ? desarrolloPendiente.length : 0}</h3>
            }
        </div>
    </div>
  )
}

export default DashboardCardTicket