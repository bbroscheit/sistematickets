import React from 'react'
import { useState, useContext, useEffect } from 'react'
import mainStyle from '@/styles/Home.module.css'
import style from '@/modules/schedule.module.css'
import getDaysForSchedule from '@/functions/getDaysForSchedule'
import Month from './Month'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import SelectorDia from './SelectorDia'
import Agenda from './Agenda'
import dayjs from 'dayjs'
import GlobalContext from '@/context/GlobalContext'



function Schedule() {
    const [currentMonth , setCurrentMonth] = useState(getDaysForSchedule())
    const { monthIndex, setMonthIndex } = useContext(GlobalContext)
    const [selector , setSelector ] = useState(2)
  
    useEffect(() => {
        setCurrentMonth(getDaysForSchedule(monthIndex))

    }, [monthIndex])
    
    function handleClick(e , n){
        e.preventDefault(e)
        setSelector(n)
    }

    function handleClickMonthPrev(){
        setMonthIndex(monthIndex - 1)
    }

    function handleClickMonthNext(){
        setMonthIndex(monthIndex + 1)
    }

    // console.log(monthIndex)
  return (
        
    <div className={mainStyle.container}>
        <div className={style.bodyContainer}>
            <header className={style.calendarHeader}>
                <div className={style.leftContainer}>
                    <div className={style.buttonContainer}>
                        <button onClick={handleClickMonthPrev}><KeyboardArrowLeftRoundedIcon /></button>
                        <p>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</p>
                        <button onClick={handleClickMonthNext}><KeyboardArrowRightRoundedIcon /></button>
                    </div>
                </div>
                <div className={style.buttonContainerSelector}>
                    <button onClick={e => handleClick(e , 1)} className={ selector === 1 ? style.buttonContainerSelectorActive : style.buttonContainerSelectorInactive}>Día</button>
                    <button onClick={e => handleClick(e , 2)} className={ selector === 2 ? style.buttonContainerSelectorActive : style.buttonContainerSelectorInactive}>Mes</button>
                    <button onClick={e => handleClick(e , 3)} className={ selector === 3 ? style.buttonContainerSelectorActive : style.buttonContainerSelectorInactive}>Agenda</button>
                </div>
            </header>
            
            <div className={style.scheduleContainer}>
                {
                    selector === 1 ? <SelectorDia /> : selector === 2 ?  <Month month={currentMonth}/> : <Agenda />
                }
                {/* <Sidebar /> */}
               
            </div>
        </div>
    </div>
        
    
    
    
  )
}

export default Schedule
