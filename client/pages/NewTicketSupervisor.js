import React, { useState, useEffect } from "react";
import Router from "next/router";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/ticketsSupervisor.module.css";
import Card from "@/components/Card";
import arrayUser from "@/functions/arrayUser";
import useUser from "@/hooks/useUser.js";
import { devuelveIniciales } from "@/functions/devuelveIniciales";
import { devuelveInicialDesdeUsuario } from "@/functions/devuelveInicialDesdeUsuario";
import { ticketSinAsignar } from "@/functions/ticketSinAsignar";
import NoAccountsSharpIcon from "@mui/icons-material/NoAccountsSharp";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CardWorkerSupervisor from "@/components/CardWorkerSupervisor";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CardSupervisorUsers from "@/components/CardSupervisorUsers";
import CardInformacionGeneral from "@/components/CardInformacionGeneral";
import CardInformacionWorker from "@/components/CardInformacionWorker";
import CardInformacionTicketsWorker from "@/components/CardInformacionTicketWorker";
import CardInformacionTicketUsuario from "@/components/CardInformacionTicketUsuario";
import CardInformacionUsuario from "@/components/CardInformacionUsuario";
import ListadoSinAsignar from "@/components/ListadoSinAsignar";

function NewTicketsSupervisor() {
  const [soportes, setSoportes] = useState(null);
  const [soporteUnfinished, setSoporteUnfinished] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [usuariosAlt, setUsuariosAlt] = useState(null);
  const [openSinAsignar, setOpenSinAsignar] = useState(true);
  const [worker, setWorker] = useState(null);
  const [workerAlt, setWorkerAlt] = useState(null);
  const [view, setView] = useState(1);
  const [viewMenu, setViewMenu] = useState(1);
  const [finder, setFinder] = useState("");
  const [user, setUser] = useUser();

  const fetchData = async () => {
    const [workerRes, unfinishedRes] = await Promise.all([
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`).then(
        (res) => res.json()
      ),
      fetch(
        `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketUnfinished`
      ).then((res) => res.json()),
    ]);

    setWorker(workerRes);
    setUsuarios(arrayUser(unfinishedRes));
    setUsuariosAlt(arrayUser(unfinishedRes));
    setWorkerAlt(workerRes);
    setSoporteUnfinished(ticketSinAsignar(unfinishedRes))
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 900000); // 15 minutos = 900000 ms

    return () => clearInterval(intervalId);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setWorkerAlt(
      worker.filter((f) => f.id.toString() === e.target.getAttribute("value"))
    );
  };

  const handleClickUsuarios = (e) => {
    e.preventDefault();
    setUsuariosAlt(
      usuarios.filter((f) => f === e.target.getAttribute("value"))
    );
  };

  const handleClickChange = (e) => {
    if(view === 1){
      setView(2)
      setUsuariosAlt(usuarios)
    }else{
      setView(1)
      setWorkerAlt(worker)
    }
  };

  const handleOpenMenu = (e) => {
    setViewMenu(viewMenu === 1 ? 2 : 1);
  };

  const handleResetFilters = (e) => {
    setWorkerAlt(worker);
    setUsuariosAlt(usuarios);
    setFinder("");
  };

  const handleChangeFinder = (e) => {
    const value = e.target.value;
    setFinder(value);
    setUsuariosAlt(
      value === ""
        ? usuarios
        : usuarios.filter((f) => f.toLowerCase().includes(value))
    );
    setWorkerAlt(
      value === ""
        ? worker
        : worker.filter((f) => {
            const fullName = `${f.firstname} ${f.lastname}`.toLowerCase();
            return fullName.includes(value.toLowerCase());
          })
    );
  };

  //console.log("usuariosAlt", usuariosAlt);

  return (
    <div className={mainStyle.container}>
      <div className={style.barContainerTickets}>
        <div className={style.barContainerMenu}>
          <h2>Tickets sin Asignar</h2>
          {
            soporteUnfinished && soporteUnfinished !== null ? <h5>{soporteUnfinished.length}</h5> : <h5>0</h5>
          }
        </div>
        <div className={style.changeCircleIcon}>
          {
            viewMenu === 1 ? <KeyboardArrowDownIcon onClick={(e) => handleOpenMenu(e)} /> : <KeyboardArrowUpIcon onClick={(e) => handleOpenMenu(e)} />
          }
          
        </div>
      </div>
      {
        viewMenu === 2 ? <div className={style.listadoContainer}><ListadoSinAsignar soportes={soporteUnfinished}/> </div> : null
      }
      {/* nueva barra horizontal con busqueda por usuario y perfiles de usuarios */}
      <div className={style.barContainer}>
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={finder}
          onChange={handleChangeFinder}
          className={style.finderInput}
        />
        <div className={style.changeCircleIcon}>
          <ChangeCircleIcon onClick={(e) => handleClickChange(e)} />
        </div>
        <div className={style.circlesContainer}>
          {usuarios !== null || worker !== null ? (
            view === 1 ? (
              worker.length > 0 ? (
                worker.map((e) => (
                  <p
                    className={style.circles}
                    onClick={(e) => handleClick(e)}
                    value={e.id}
                  >
                    {devuelveIniciales(e.firstname, e.lastname)}
                  </p>
                ))
              ) : (
                <NoAccountsSharpIcon />
              )
            ) : usuarios.length > 0 ? (
              usuarios.map((u) => (
                <p className={style.circles}
                    onClick={(e) => handleClickUsuarios(e)}
                    value={u}>
                  {devuelveInicialDesdeUsuario(u)}
                </p>
              ))
            ) : (
              <NoAccountsSharpIcon />
            )
          ) : (
            <NoAccountsSharpIcon />
          )}
        </div>
        <div className={style.changeCircleIcon}>
          <FilterAltOffRoundedIcon onClick={(e) => handleResetFilters(e)} />
        </div>
      </div>
      {view === 1 ? (
        workerAlt !== null && workerAlt.length >= 1 ? (
          <div className={style.cardInformacionContainer}>
            {workerAlt.length === worker.length ? (
              <CardInformacionGeneral />
            ) : null}
            {workerAlt.map((e) => (
              <div className={style.containerInfoTicket}>
                <CardInformacionWorker
                  id={e.id}
                  firstname={e.firstname}
                  lastname={e.lastname}
                />
                {workerAlt.length !== worker.length ? (
                  <CardInformacionTicketsWorker id={e.id} />
                ) : null}
              </div>
            ))}
          </div>
        ) : null
      ) : (
    usuariosAlt !== null && usuariosAlt.length >= 1 ? (
      <div className={style.cardInformacionContainer}>
        {usuariosAlt.length === usuarios.length ? <CardInformacionGeneral /> : null}
        {usuariosAlt.map((e) => (
          <div className={style.containerInfoTicket}>
            <CardInformacionUsuario
              user={e}
            />
            {usuariosAlt.length !== usuarios.length ? (
              <CardInformacionTicketUsuario user={e} />
            ) : null}
          </div>
        ))}
      </div>
    ) : null
  )}
    </div>
  );
}

export default NewTicketsSupervisor;
