import React from 'react'
import { useState, useContext, useEffect } from 'react'
import GlobalContext from '@/context/GlobalContext'
import Router from "next/router";
import mainStyle from '@/styles/Home.module.css'
import style from '@/modules/agenda.module.css'

function Agenda() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext)
  const [schedules, setSchedules] = useState(null)

  useEffect(() => {
    setSchedules(monthIndex+1)
  }, [monthIndex])

  return (
    
      <div className={style.bodyContainer}>
          <h1 className={mainStyle.title}>Agenda</h1>
          <div className={style.agendaGrid}>
              <h3>Fecha</h3>
              <h3>Inicio</h3>
              <h3>Finalización</h3>
              <h3>Tema a tratar</h3>
              <h3>Asistencia</h3>
          </div>
      </div>
    
  )
}

export default Agenda