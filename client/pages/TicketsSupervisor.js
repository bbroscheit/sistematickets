import React, { useState, useEffect } from "react";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/ticketsSupervisor.module.css";
import Card from "@/components/Card";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CardWorkerSupervisor from "@/components/CardWorkerSupervisor";

function TicketsSupervisor() {
  const [soportes, setSoportes] = useState(null);
  const [soportesTerminados, setSoportesTerminados] = useState(null);
  const [openSinAsignar, setOpenSinAsignar] = useState(true);
  const [openSinCompletar, setOpenSinCompletar] = useState(true);
  const [worker , setWorker] = useState(null)

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
      .then((res) => res.json())
      .then((data) => {
        setSoportes(data);
      });
  },[]);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
      .then((res) => res.json())
      .then((data) => {
        setWorker(data);
      });
  },[]);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketCompletado`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketCompletado`)
      .then((res) => res.json())
      .then((data) => {
        setSoportesTerminados(data);
      });
  },[]);

  function handleClick(e) {
    e.preventDefault();
    openSinAsignar === false
      ? setOpenSinAsignar(true)
      : setOpenSinAsignar(false);
  }

  function handleClickSinCompletar(e) {
    e.preventDefault();
    openSinCompletar === false
      ? setOpenSinCompletar(true)
      : setOpenSinCompletar(false);
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
        <div className={style.cardContainer}>
            {
                worker !== null && worker.length > 0 ? worker.map( e => <CardWorkerSupervisor worker={e.username} firstname={e.firstname} lastname={e.lastname}/>)
                     : null
            }
        </div>
      </div>
      <div className={style.gridContainer}>
        {soportesTerminados !== null && soportesTerminados.length > 0 ? (
          <>
            <div className={style.supervisorTitle}>    
                <h2>Soportes pendientes de cierre</h2>
                {openSinCompletar === false ? (
                <KeyboardArrowDownIcon onClick={(e) => handleClickSinCompletar(e)} />
                    ) : (
                <KeyboardArrowUpIcon onClick={(e) => handleClickSinCompletar(e)} />
                )}
            </div>
            {openSinCompletar === true
              ? soportesTerminados.map((e) => (
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
        
        </div>
    </div>
  );
}

export default TicketsSupervisor;
