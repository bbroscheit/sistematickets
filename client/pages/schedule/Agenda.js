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

function Agenda() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext)
  const [schedules, setSchedules] = useState(null)
  const [user , setUser] = useState(null)
  const [existingSchedules, setExistingSchedules] = useState(null)

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

  
  console.log("existing schedule", existingSchedules)
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
              existingSchedules.map ( e =>
                <div className={style.agendaGrid}>
                  <h5>{extraeFecha(e.startdate)}</h5>
                  <h5>{devuelveHoraDesdeTimestamp(e.starthour)}</h5>
                  <h5>{devuelveHoraDesdeTimestamp(e.finishhour)}</h5>
                  <h5>{e.detail}</h5>
                  <h5>{scheduleAsistencia(e, user.name, user.firstname , user.lastname) === true ? 
                    <div>
                      <CheckCircleOutlineIcon />
                      <CancelOutlinedIcon />
                    </div> : 
                    <div>
                      <CheckCircleOutlineIcon />
                      <CancelOutlinedIcon />
                    </div>}
                  </h5>
                </div> ): null
          }
      </div>
    
  )
}

export default Agenda