import React from 'react'
import { useState, useContext, useEffect } from 'react'
import Router from "next/router";
import mainStyle from '@/styles/Home.module.css'
import style from '@/modules/schedule.module.css'
import Swal from 'sweetalert2'
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
    const [ currentUser, setCurrentUser] = useState(null)
    const [input , setInput] = useState({
        detail : "",
        invited : [],
        accepted: [],
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
    
    useEffect(() => {
        let userLogin = localStorage.getItem("user");
        let loginParse = JSON.parse(userLogin);
        setCurrentUser(loginParse)
        setInput({
            ...input,
            invited: [...input.invited,loginParse.name],
            accepted: [...input.accepted, loginParse.name]
        });
    }, []);

    function handleClick(e , n){
        e.preventDefault(e)
        setSelector(n)
    }

    const handleOpen = () => setOpen(true);

    function handleClose(){
        setInput({
            detail : "",
            invited : [currentUser.name],
            startdate : "",
            starthour : "",
            finishhour : "", 
        })
        setOpen(false)
    }
    
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

    function handleSelect(e) {
        //console.log( "e select" , e)
        //console.log( "value select" , value)
        let value = e.target.innerHTML
        if (value && !input.invited.includes(value)) {
            setInput({
                ...input,
                invited: [...input.invited, value],
            });
        }
    }

    function handleUnselect(e){
        setInput({
            ...input,
            invited: input.invited.filter( f => f !== e.target.innerText )
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

    const startDateTime = dayjs(`${input.startdate} ${input.starthour}`).format('HH:mm');
    const finishDateTime = dayjs(`${input.startdate} ${input.finishhour}`).format('HH:mm');

    const response = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/schedules?date=${input.startdate}&startHour=${startDateTime}&finishHour=${finishDateTime}`);
    const existingSchedules = await response.json();
      
    if (existingSchedules.state === "failure") {
        alert(existingSchedules.message);
        return;
    }

    if (existingSchedules.length > 0) {
        Swal.fire({
            icon: "error",
            text: "El rango horario seleccionado ya está ocupado. Por favor, elija otro horario.",
          });
        handleClose();
        return;
    }

    // Si no existen registros en el horario seleccionado se crea la nueva reserva
    await postSchedule(input)
    .then(res => {
        if(res.state === "success"){
            setInput({
                detail : "",
                invited : [currentUser.name],
                startdate : "",
                starthour : "",
                finishhour : ""               
            })
            Swal.fire(({
                icon: "success",
                title: "Has hecho la reserva con éxito!",
                showConfirmButton: false,
                timer: 1500
            }));
            handleClose();
            // revisar el timeout si ingresa
            setTimeout(() => {
                Router.push("/schedule/Schedule");
            }, 1500);
        }
    })
    }


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
            <div className={style.asuntoModalSchedule}>
                <label>Asunto :</label>
                <input type='text' name="detail" value={input.detail} onChange={e => handleChange(e)}></input>
        </div>
        <div className={style.fechaModalSchedule}>
            <label>Fecha de Inicio</label>
            <input type="date" name="startdate" value={input.startdate} onChange={ e => handleChange(e)}></input>
        </div>
        <div className={style.horaModalSchedule}>
            <label >Selecciona una hora de inicio</label>
            <input type="time" name="starthour" value={input.starthour} onChange={ e => handleChange(e)}></input>
        </div>
        <div className={style.horaModalSchedule}> 
            <label >Selecciona una hora de cierre</label>
            <input type="time" name="finishhour" value={input.finishhour} onChange={e => handleChange(e)}></input>
        </div>
      <label className={style.modalAutocomplete}>Elije a los participantes</label>
      <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={user}
                fullWidth
                renderInput={(params) => <TextField {...params}/>}
                onChange={(e) => handleSelect(e)}
                sx={{margin:"8px 10px"}}
            />
      {input.invited.length > 0 ? 
            <div className={style.userContainer}>
            { input.invited.map( e => <div className={style.userCard}><h5 onClick={ e => handleUnselect(e)}>{e}</h5></div>) }
            </div> : null}
        <div></div>
    </div>
    <button onClick={handleSubmit} className={mainStyle.buttonModal}>Aceptar</button>
                
    </Box>
  </Modal>   
    </>
    
    
  )
}

export default Schedule
