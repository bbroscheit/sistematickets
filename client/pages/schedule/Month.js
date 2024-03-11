import React from 'react'
import style from '@/modules/schedule.module.css'
import Day from '@/pages/schedule/Day'

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