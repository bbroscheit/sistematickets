import React, { createContext } from 'react'

const GlobalContext = createContext({
    monthIndex : 0,
    setMonthIndex : (index) => {}
})

export default GlobalContext