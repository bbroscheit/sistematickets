import React from "react";
import { useState } from "react";
import style from "../modules/TicketCardHelpDesk.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { horasPasadas } from "@/functions/horasPasadas";
import { useEffect } from "react";
import { contarTicketsPorWorker } from "@/functions/contarTicketsPorWorker";
import { contarTicketsPorUsuario } from "@/functions/contarTicketsPorUsuario";

function TicketCardHelpDesk({ array, title, time }) {
  const [openDesarrollo, setOpenDesarrollo] = useState(0);
  const [ workers , setWorkers] = useState(null)
  const [ users , setUsers] = useState(null)
  const [soportes, setSoportes] = useState(0);

  useEffect(() => {
    setSoportes(horasPasadas(array, time));
    setWorkers(contarTicketsPorWorker(horasPasadas(array,time)))
    setUsers(contarTicketsPorUsuario(horasPasadas(array, time)))
  }, []);

  function handleClickDesarrollo(e) {
    e.preventDefault();
    openDesarrollo === 0 ? setOpenDesarrollo(1) : setOpenDesarrollo(0);
  }

  console.log(users)

  return (
    <div className={style.ticketCard}>
      <h3>{title}</h3>
      <h5>+ {time}Hs</h5>
      <h1 className={style.cardTitle}>{soportes.length}</h1>
      {title !== "Soportes sin Asignar" ? (
        <>
          {openDesarrollo === 0 ? (
            <KeyboardArrowDownIcon onClick={(e) => handleClickDesarrollo(e)} />
          ) : (
            <KeyboardArrowUpIcon onClick={(e) => handleClickDesarrollo(e)} />
          )}
        </>
      ) : null}
      
        
            {title === "Soportes sin Asignar" ? null : 
                title === "Pendientes de Cierre" ? 
                <div>
                    { users != null && Object.keys(users).map((user) => (
                        <div key={user}>
                            <p>{user}</p>
                            <p>{users[user]} soportes</p>
                        </div>
                        ))}</div> : 
                            title === "Pedidos de Informacíon" ? 
                                <div>
                                    { users != null && Object.keys(users).map((user) => (
                                        <div key={user}>
                                            <p>{user}</p>
                                            <p>{users[user]} soportes</p>
                                        </div>
                                    ))}</div> : 
                                <div>
                                    { workers != null && Object.keys(workers).map((worker) => (
                                        <div key={worker}>
                                            <p>{worker}</p>
                                            <p>{workers[worker]} soportes</p>
                                        </div>
                                    ))}</div>}
            </div>
  );
}

export default TicketCardHelpDesk;


