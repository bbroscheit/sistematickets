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

      const handleOpen = (e) => {
        // Verificar si el clic proviene del contenedor taskContainer o sus hijos
        if (e.target.classList.value === "schedule_taskContainer__hxwXC") {
            setInput({
                ...input,
                startdate: day.format("DD-MM-YYYY")
            })
            setOpen(true);
        }
              
    };

    const handleClose = () => setOpen(false);
  
    function getCurrentDayClass(){
        return day.format("DD-MM_YY") === dayjs().format("DD-MM_YY") ? style.numberOnHover : null
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name ]:e.target.value
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            invited : [...input.invited, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        postSchedule(input)
    }

    console.log("schedule", schedules)

  return (
    <>
    <div className={style.dayContainer} onClick={ e =>  handleOpen(e)}>
        <header>
            {
                idx === 0 && <p className={style.dayNombre}>{day.format("ddd").toUpperCase()}</p>
            }
            <p className={getCurrentDayClass()}>{day.format("DD")}</p>
            <div className={style.taskContainer} >
            {
                schedules !== null && schedules.length > 0 ? 
                schedules.map( e => <ScheduleCard key={e.id} id={e.id} detail={e.detail} starthour={devuelveHoraDesdeTimestamp(e.starthour)} onClick={(e) => e.stopPropagation()}/>)
                : null
          }
            </div>
        </header>
        
    </div>

    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={styles}>
    <div>
      <label>Asunto</label>
      <input type='text' name="detail" value={input.detail} onChange={e => handleChange(e)}></input>
      <p>Fecha de Inicio</p><p>{input.startdate}</p>
      <label >Selecciona una hora de inicio</label>
      <input type="time" name="starthour" value={input.starthour} onChange={ e => handleChange(e)}></input>
      <label >Selecciona una hora de cierre</label>
      <input type="time" name="finishhour" value={input.finishhour} onChange={e => handleChange(e)}></input>
      <label >Elije a los participantes</label>
      <select onChange={e => handleSelect(e)}>
            <option>usuario 1</option>
            <option>usuario 2</option>
            <option>usuario 3</option>
            <option>usuario 4</option>
      </select>
    </div>
    <button onClick={e => {handleSubmit(e) , handleClose()}}>Aceptar</button>
    </Box>
  </Modal>

</>
  )
}

export default Day