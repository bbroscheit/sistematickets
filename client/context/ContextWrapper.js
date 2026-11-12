import React, {useState} from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

// provider de GlobalContext, envuelve toda la app desde _app.js - hoy solo
// guarda el mes que se esta mirando en la agenda (Schedule.js/Agenda.js)
function ContextWrapper(props) {
    const [monthIndex , setMonthIndex] = useState(dayjs().month())

  return (
    <GlobalContext.Provider value={{ monthIndex , setMonthIndex }}>
        {props.children}
    </GlobalContext.Provider>
  )
}

export default ContextWrapper