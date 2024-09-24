import React, { useState, useEffect, Fragment } from "react";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/ticketsSupervisor.module.css";
import Card from "@/components/Card";
import arrayUser from '@/functions/arrayUser';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CardWorkerSupervisor from "@/components/CardWorkerSupervisor";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CardSupervisorUsers from '@/components/CardSupervisorUsers';

function TicketsSupervisor() {
  const [ soportes, setSoportes] = useState(null);
  const [ soporteUnfinished , setSoporteUnfinished ] = useState(null);
  //const [ soporteUnfinishedAlt , setSoporteUnfinishedAlt ] = useState(null);
  const [ usuarios , setUsuarios ] = useState(null)
  const [ usuariosAlt , setUsuariosAlt ] = useState(null)
  const [ openSinAsignar, setOpenSinAsignar] = useState(true);
  const [ worker , setWorker] = useState(null)
  const [ view , setView ] = useState(1)
  const [ title , setTitle] = useState("Desarrollador")
  const [ finder , setFinder] = useState("")

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
       //fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
      .then((res) => res.json())
      .then((data) => {
        setSoportes(data);
      });
  },[]);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
       //fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
      .then((res) => res.json())
      .then((data) => {
        setWorker(data);
      });
  },[]);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketUnfinished`)
       // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketUnfinished`)
       .then((res) => res.json())
       .then((data) => {
          setSoporteUnfinished(data);
          //setSoporteUnfinishedAlt(data);
          setUsuarios(arrayUser(data))
          setUsuariosAlt(arrayUser(data))
  });
  },[]);

  function handleClick(e) {
    e.preventDefault();
    openSinAsignar === false
      ? setOpenSinAsignar(true)
      : setOpenSinAsignar(false);
  }

  function handleClickChange(e){
    view === 1 ? setView(2) : setView(1)
    title === "Desarrollador" ? setTitle("Usuarios") : setTitle("Desarrollador")
  }

  function handleChangeFinder(e){
    e.target.value === "" ? setUsuariosAlt(usuarios) : setUsuariosAlt( usuarios.filter( f => f.includes(e.target.value)))
  }

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Supervisor</h1>
      
      <div className={style.gridContainer}>
        {soportes !== null && soportes.length > 0 ? (
          <>
            <div className={style.supervisorTitle}>    
                <h2>Soportes sin Asignar</h2>
                {openSinAsignar === false ? (
                <KeyboardArrowDownIcon onClick={(e) => handleClick(e)} />
                    ) : (
                <KeyboardArrowUpIcon onClick={(e) => handleClick(e)} />
                )}
            </div>

            {openSinAsignar === true
              ? soportes.map((e) => (
                  <React.Fragment key={e.id}>
                    <Card
                      key={e.id}
                      id={e.id}
                      subject={e.subject}
                      state={e.state}
                      created={e.created}
                    />
                  </React.Fragment>
                ))
              : null}
          </>
        ) : null}

        {/* se añade este salto de linea par ano modificar los estilos generales */}
        <br /> 

        {
          view === 1 ? 
          <>
            <div className={style.supervisorTitle}>    
                <h2>Soportes por {title}</h2>
                <ChangeCircleIcon onClick={ e => handleClickChange(e)}/>
            </div>
            <div className={style.cardContainer}>
            {
              worker !== null && worker.length > 0 ? worker.map( e => <CardWorkerSupervisor worker={e.username} firstname={e.firstname} lastname={e.lastname}/>)
              : null
            }
        </div>
          </> :
          <>
            <div className={style.supervisorTitle}>    
                <h2>Soportes por {title}</h2>
                <ChangeCircleIcon onClick={ e => handleClickChange(e)}/>
            </div>
            <div>
              <h5>Ingresa el apellido del usuario</h5>
              <input type="search" onChange={ e => handleChangeFinder(e)}></input>
            </div>
            <div className={style.cardContainer}>
            {
              usuariosAlt !== null && usuariosAlt.length > 0 ? usuariosAlt.map( e => <CardSupervisorUsers soportes={soporteUnfinished} usuario = { e } key={e}/> ): <h3>No hay usuarios con tickets activos</h3>
            }
          </div>
          </>
        }
        
      </div>
    </div>
  );
}

export default TicketsSupervisor;
