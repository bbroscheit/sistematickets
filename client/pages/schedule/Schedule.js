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
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { postSchedule } from '../api/postSchedule'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import giraFechas from '@/functions/girafechas'

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Schedule() {
    const [open, setOpen] = useState(false);
    const [currentMonth , setCurrentMonth] = useState(getDaysForSchedule())
    const { monthIndex, setMonthIndex } = useContext(GlobalContext)
    const [selector , setSelector ] = useState(2)
    const [ user, setUser ] = useState(null)
    const [input , setInput] = useState({
        detail : "",
        invited : "",
        startdate : "",
        starthour : "",
        finishhour : "",
        
    })
  
    useEffect(() => {
        setCurrentMonth(getDaysForSchedule(monthIndex))

    }, [monthIndex])

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
          .then((res) => res.json())
          .then((data) => {
            
            const allNames = data.map( e => `${e.firstname} ${e.lastname}`)
            setUser(allNames);
          });
      }, []);
    
    
    function handleClick(e , n){
        e.preventDefault(e)
        setSelector(n)
    }

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    function handleClickMonthPrev(){
        setMonthIndex(monthIndex - 1)
    }

    function handleClickMonthNext(){
        setMonthIndex(monthIndex + 1)
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name ]:e.target.value
        })
    }

    function handleSelect(e){
        let name = e.target.innerText

        if(input.invited.length === 0 ){
            setInput({
                ...input,
                invited : [...input.invited, name]
            })
        } else if ( input.invited.filter( g => g === name ).length === 0 ){
            
            setInput({
                ...input,
                invited : [...input.invited, name]
            })
        } else {
            console.log("pase como falso" , input.invited.filter( g => g === name ).length )
        }
        
       
    }

    function handleUnselect(e){
        setInput({
            ...input,
            invited: input.invited.filter( f => f !== e.target.innerText )
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        postSchedule(input)
    }

    console.log("input",input)
  return (
    <>
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
                <button style={{cursor:"pointer"}} onClick={e => handleOpen(e)} className={style.buttonContainerSelectorActive}>Crear Nuevo</button>
                <div className={style.buttonContainerSelector}>
                    
                    <button onClick={e => handleClick(e , 2)} className={ selector === 2 ? style.buttonContainerSelectorActive : style.buttonContainerSelectorInactive}>Mes</button>
                    <button onClick={e => handleClick(e , 3)} className={ selector === 3 ? style.buttonContainerSelectorActive : style.buttonContainerSelectorInactive}>Agenda</button>
                </div>
            </header>
            
            <div className={style.scheduleContainer}>
                {
                    selector === 1 ? <SelectorDia /> : selector === 2 ?  <Month month={currentMonth}/> : <Agenda />
                }               
            </div>
        </div>
    </div>
     <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={styles}>
    <div>
        <div>
            <label>Asunto</label>
            <input type='text' name="detail" value={input.detail} onChange={e => handleChange(e)}></input>
        </div>
        <div>
            <label>Fecha de Inicio</label>
            <input type="date" name="startdate" value={input.startdate} onChange={ e => handleChange(e)}></input>
        </div>
        <div>
            <label >Selecciona una hora de inicio</label>
            <input type="time" name="starthour" value={input.starthour} onChange={ e => handleChange(e)}></input>
        </div>
        <div>
            <label >Selecciona una hora de cierre</label>
            <input type="time" name="finishhour" value={input.finishhour} onChange={e => handleChange(e)}></input>
        </div>
      <label >Elije a los participantes</label>
      {/* <select onChange={e => handleSelect(e)}>
            <option>usuario 1</option>
            <option>usuario 2</option>
            <option>usuario 3</option>
            <option>usuario 4</option>
      </select> */}
      <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={user}
                fullWidth
                renderInput={(params) => <TextField {...params}/>}
                onChange={(e) => handleSelect(e)}
            />
      {
        input.invited.length > 0 ? <div>
            {
                input.invited.map( e => <div><h4 onClick={ e => handleUnselect(e)}>{e}</h4></div>)
            }</div> : null
      }
        <div></div>
    </div>
    <button onClick={e => {handleSubmit(e) , handleClose()}}>Aceptar</button>
    </Box>
  </Modal>   
    </>
    
    
  )
}

export default Schedule
