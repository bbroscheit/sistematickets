import React from 'react'
import style from '@/modules/schedule.module.css'
import Day from '@/pages/schedule/Day'

// grilla de 5x7 dias del calendario mensual (la matriz la arma
// getDaysForSchedule.js), un Day por celda
function Month({month}) {
    return (
    <div className={style.gridContainer}>
        {
            month.map( (row , i ) => <> {row.map( (day , idx ) => <Day day={day} key={idx}/>)} </>)
        }
    </div>
  )
}

export default Month