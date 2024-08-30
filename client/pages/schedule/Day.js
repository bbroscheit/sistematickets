import React, { useState, useEffect} from 'react'
import style from '@/modules/schedule.module.css'
import dayjs from 'dayjs'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { postSchedule } from '../api/postSchedule'
import ScheduleCard from '@/components/ScheduleCard';
import devuelveHoraDesdeTimestamp from '@/functions/devuelveHoraDesdeTimestamp';

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Day({day , idx }) {
    let days = day.format("DD-MM-YYYY")
    const [open, setOpen] = useState(false);
    const [ schedules, setSchedules ] = useState(null)
    const [input , setInput] = useState({
        detail : "",
        invited : "",
        startdate : "",
        starthour : "",
        finishhour : "",
        
    })

    useEffect(() => {
    
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/schedule/${days}`)
          // fetch(`https://localhost:3001/schedule/${days}`)
            .then((res) => res.json())
            .then((data) => {
              setSchedules(data)
          });
        
      }, [days]);

       
    function getCurrentDayClass(){
        return day.format("DD-MM_YY") === dayjs().format("DD-MM_YY") ? style.numberOnHover : null
    }

  return (
    <>
    <div className={style.dayContainer}>
        <header>
            {
                idx === 0 && <p className={style.dayNombre}>{day.format("ddd").toUpperCase()}</p>
            }
            <p className={getCurrentDayClass()}>{day.format("DD")}</p>
            <div className={style.taskContainer} >
            {
                schedules !== null && schedules.length > 0 ? 
                schedules.map( e => <ScheduleCard key={e.id} id={e.id} detail={e.detail} starthour={devuelveHoraDesdeTimestamp(e.starthour)} finishhour={devuelveHoraDesdeTimestamp(e.finishhour)}onClick={(e) => e.stopPropagation()}/>)
                : null
          }
            </div>
        </header>
        
    </div>
</>
  )
}

export default Day