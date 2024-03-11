import React from 'react'
import style from '@/modules/schedule.module.css'

function NewDay() {
    console.log("entre a Newday")
  return (
    <div className={style.dayContainer}>
        <h1>holaS   </h1>
        {/* <header>
            <p>{day.format("ddd").toUpperCase()}</p>
            <p>{day.format("DD")}</p>
        </header> */}
        
    </div>
  )
}

export default NewDay