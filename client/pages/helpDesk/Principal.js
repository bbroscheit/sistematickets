import React from "react";
import { useState, useEffect } from "react";
import mainStyle from "../../styles/Home.module.css";
import style from "../../modules/principal.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import filtraUsuariosConectados from "../../functions/filtrausuariosConectados";
import {ticketSinAsignar} from "@/functions/ticketSinAsignar";
import { ticketAsignados } from "@/functions/ticketAsignados";
import { ticketEnDesarrollo } from "@/functions/ticketEnDesarrollo";
import { ticketMasInformacion } from "@/functions/ticketMasInformacion";
import { ticketFinalizados } from "@/functions/ticketFinalizados";
import TicketCardHelpDesk from "@/components/TicketCardHelpDesk";
import  {devuelveInterno } from "@/functions/devuelveInterno";


function Principal() {
  const [activity, setActivity] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [openUser, setOpenUser] = useState(0);
  const [soportes , setSoportes ] = useState(null)
  const [ users , setUsers ] = useState(null)
  let num = 453
  

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/activeConnection`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/activeConnection`)
      .then((res) => res.json())
      .then((data) => {
        setActivity(data);
        setUsuarios(filtraUsuariosConectados(data));
      });

    const interval = setInterval(() => {
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/activeConnection`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/activeConnection`)
        .then((res) => res.json())
        .then((data) => {
          setActivity(data);
          setUsuarios(filtraUsuariosConectados(data));
        });
    }, 3600000); // se ejecuta cada hora

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketUnfinished`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketUnfinished`)
      .then((res) => res.json())
      .then((data) => {
        setSoportes(data);
      });

    const interval = setInterval(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketUnfinished`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketUnfinished`)
      .then((res) => res.json())
      .then((data) => {
        setSoportes(data);
      });
    }, 5000)

    return (() => {
      clearInterval(interval)
    })
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  function handleClick(e) {
    e.preventDefault();
    openUser === 0 ? setOpenUser(1) : setOpenUser(0);
  }

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Principal</h1>
      <div className={style.conectadosContainer}>
        <h3 className={mainStyle.subtitle}>Usuarios conectados</h3>
        {openUser === 0 ? (
          <KeyboardArrowDownIcon onClick={(e) => handleClick(e)} />
        ) : (
          <KeyboardArrowUpIcon onClick={(e) => handleClick(e)} />
        )}
      </div>
      {openUser && openUser !== 0 ? (
        <div className={style.userContainer}>
          {activity !== null && activity.length > 0
            ? activity.map((e) => (
                <div key={e.USERID} className={style.divUser}>
                  <a href={`https://172.19.31.19/ws/dial.php?interno=451&numero=${devuelveInterno(e.USERID, users)}`} target="_blank">{e.USERID.trim()}</a>
                </div>
              ))
            : null}
        </div>
      ) : null}
      {usuarios !== null && usuarios.length > 0 ? (
        <>
          <h3 className={mainStyle.subtitle}>Deberian estar conectados</h3>
          <div className={style.userContainer}>
            {usuarios !== null && usuarios.length > 0 ? (
              usuarios.map((e) => (
                <div key={e} className={style.divUser}>
                  {e}
                </div>
              ))
            ) : (
              <p>no hay usuarios conectados</p>
            )}
          </div>
        </>
      ) : null}
      <h1 className={mainStyle.title}>Soportes</h1>
      <div className={style.cardContainer}>
        {
          soportes !== null && soportes.length > 0 ? <TicketCardHelpDesk array={ticketSinAsignar(soportes)} title="Soportes sin Asignar" time={1}/> : null
        }

        {
          soportes !== null && soportes.length > 0 ? <TicketCardHelpDesk array={ticketAsignados(soportes)} title="Soportes Asignados" time={2}/> : null
        }
        
        {
          soportes !== null && soportes.length > 0 ? <TicketCardHelpDesk array={ticketEnDesarrollo(soportes)} title="Soportes En Desarrollo" time={2}/> : null
        }

        {
          soportes !== null && soportes.length > 0 ? <TicketCardHelpDesk array={ticketMasInformacion(soportes)} title="Pedidos de Informacíon" time={2}/> : null
        }

{
          soportes !== null && soportes.length > 0 ? <TicketCardHelpDesk array={ticketFinalizados(soportes)} title="Pendientes de Cierre" time={2}/> : null
        }
        
         
        
      </div>

      
    </div>
  );
}

export default Principal;
