import React from 'react'
import { useState, useContext, useEffect } from 'react'
import GlobalContext from '@/context/GlobalContext'
import Router from "next/router";
import mainStyle from '@/styles/Home.module.css'
import style from '@/modules/agenda.module.css'
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { extraeFecha } from '@/functions/extraeFecha';
import devuelveHoraDesdeTimestamp from '@/functions/devuelveHoraDesdeTimestamp';
import scheduleAsistencia from '@/functions/scheduleAsistencia';
import { toggleAccepted } from '../api/toggleAccepted';

function Agenda() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext)
  const [schedules, setSchedules] = useState(null)
  const [user , setUser] = useState(null)
  const [existingSchedules, setExistingSchedules] = useState(null)
  const [control, setControl] = useState(1)

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse)

   fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/schedulesByMonth?month=${monthIndex+1}&user=${loginParse.name}`)
    .then((res) => res.json())
    .then((data) => {
      setExistingSchedules(data)
    });
      
}, [monthIndex])

  function handleAccept(e , id, user, firstname , lastname){
    e.preventDefault(e)
    toggleAccepted( id, user, firstname , lastname )
      .then( res => {
        if (res === "success"){
          // fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/schedulesByMonth?month=${monthIndex+1}&user=${loginParse.name}`)
          //   .then((res) => res.json())
          //   .then((data) => { setExistingSchedules(data) })
          console.log("cambiado con exito")
          }
        })
      .catch(error => {
        console.error("Error al enviar el formulario:", error);
      });
    }

  //console.log("existing schedule", existingSchedules)
  return (
    
      <div className={style.bodyContainer}>
          <h1 className={mainStyle.title}>Agenda</h1>
          <div className={style.agendaGrid}>
              <h4>Fecha</h4>
              <h4>Inicio</h4>
              <h4>Finalización</h4>
              <h4>Tema a tratar</h4>
              <h4>Asistencia</h4>
          </div>
         
          {
            existingSchedules && existingSchedules.length > 0 ? 
              existingSchedules.map ( s =>
                <div className={style.agendaGrid}>
                  <h5>{extraeFecha(s.startdate)}</h5>
                  <h5>{devuelveHoraDesdeTimestamp(s.starthour)}</h5>
                  <h5>{devuelveHoraDesdeTimestamp(s.finishhour)}</h5>
                  <h5>{s.detail}</h5>
                  <h5>{scheduleAsistencia(s, user.name, user.firstname , user.lastname) === true ? 
                    <div>
                      <CheckCircleOutlineIcon className={style.accepted}/>
                      <CancelOutlinedIcon className={style.pointer} onClick={ e => handleAccept(e , s.id, user.name, user.firstname , user.lastname)}/>
                    </div> : 
                    <div>
                      <CheckCircleOutlineIcon className={style.pointer} onClick={ e => handleAccept(e , s.id, user.name, user.firstname , user.lastname)}/>
                      <CancelOutlinedIcon className={style.rejected}/>
                    </div>}
                  </h5>
                </div> ): null
          }
      </div>
    
  )
}

export default Agenda