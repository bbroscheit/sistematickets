import React, { createContext } from 'react'

// contexto global de la agenda (mes que se esta mostrando) - ver ContextWrapper.js
const GlobalContext = createContext({
    monthIndex : 0,
    setMonthIndex : (index) => {}
})

export default GlobalContext