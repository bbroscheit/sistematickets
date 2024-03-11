import React from 'react'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

function CalendarHeader() {
  return (
    <header >
        <div>
            <button>Hoy</button>
            <button><KeyboardArrowLeftRoundedIcon /></button>
            <p>mes</p>
            <button><KeyboardArrowRightRoundedIcon /></button>
        </div>
        <div>
            <select > 
                <option>Dia</option>
                <option>Mes</option>
                <option>Agenda</option>
            </select>
        </div>
        

    </header>
  )
}

export default CalendarHeader