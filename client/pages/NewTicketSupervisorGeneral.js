import React, { useState, useEffect } from "react";
import Router from "next/router";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/ticketsSupervisor.module.css";
import arrayUser from "@/functions/arrayUser";
import useUser from "@/hooks/useUser.js";
import { devuelveInicialDesdeUsuario } from "@/functions/devuelveInicialDesdeUsuario";
import { ticketSinAsignar } from "@/functions/ticketSinAsignar";
import NoAccountsSharpIcon from "@mui/icons-material/NoAccountsSharp";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CardInformacionGeneral from "@/components/CardInformacionGeneral";
import CardInformacionTicketUsuario from "@/components/CardInformacionTicketUsuario";
import CardInformacionUsuario from "@/components/CardInformacionUsuario";
import ListadoSinAsignar from "@/components/ListadoSinAsignar";

function NewTicketsSupervisorGeneral() {
  const [user, setUser] = useUser("");
  const [soporteUnfinished, setSoporteUnfinished] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [usuariosAlt, setUsuariosAlt] = useState(null);
  const [viewMenu, setViewMenu] = useState(1);
  const [finder, setFinder] = useState("");

  //trae los datos del usuario desde localStorage
  const fetchData = async () => {
    let id = 0

    const storedUser = localStorage.getItem("user")
        if (storedUser) {
            id = JSON.parse(storedUser).id
        }
    
    const [ unfinishedRes] = await Promise.all([
      
      fetch(
        `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newTicketUnfinished/${id}`
      ).then((res) => res.json()),
    ]);

    
    setUsuarios(arrayUser(unfinishedRes));
    setUsuariosAlt(arrayUser(unfinishedRes));
    setSoporteUnfinished(ticketSinAsignar(unfinishedRes));
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 900000); // 15 minutos = 900000 ms

    return () => clearInterval(intervalId);
  }, []);

  const handleClickUsuarios = (e) => {
    e.preventDefault();
    setUsuariosAlt(
      usuarios.filter((f) => f === e.target.getAttribute("value"))
    );
  };

  const handleOpenMenu = (e) => {
    setViewMenu(viewMenu === 1 ? 2 : 1);
  };

  const handleResetFilters = (e) => {
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
  };

  //console.log("usuariosAlt", usuariosAlt);

  return (
    <div className={mainStyle.container}>
      <div className={style.barContainerTickets}>
        <div className={style.barContainerMenu}>
          <h2>Tickets sin Asignar</h2>
          {soporteUnfinished && soporteUnfinished !== null ? (
            <h5>{soporteUnfinished.length}</h5>
          ) : (
            <h5>0</h5>
          )}
        </div>
        <div className={style.changeCircleIcon}>
          {viewMenu === 1 ? (
            <KeyboardArrowDownIcon onClick={(e) => handleOpenMenu(e)} />
          ) : (
            <KeyboardArrowUpIcon onClick={(e) => handleOpenMenu(e)} />
          )}
        </div>
      </div>
      {viewMenu === 2 ? (
        <div className={style.listadoContainer}>
          <ListadoSinAsignar soportes={soporteUnfinished} />{" "}
        </div>
      ) : null}
      {/* nueva barra horizontal con busqueda por usuario y perfiles de usuarios */}
      <div className={style.newBarContainer}>
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={finder}
          onChange={handleChangeFinder}
          className={style.finderInput}
        />
        
        <div className={style.circlesContainer}>
          {usuarios !== null ? (
            usuarios.length > 0 ? (
              usuarios.map((u) => (
                <p
                  className={style.circles}
                  onClick={(e) => handleClickUsuarios(e)}
                  value={u}
                >
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
       { usuariosAlt !== null && usuariosAlt.length >= 1 ? (
        <div className={style.cardInformacionContainer}>
          {usuariosAlt.length === usuarios.length ? (
            <CardInformacionGeneral />
          ) : null}
          {usuariosAlt.map((e) => (
            <div className={style.containerInfoTicket}>
              <CardInformacionUsuario user={e} />
              {usuariosAlt.length !== usuarios.length ? (
                <CardInformacionTicketUsuario user={e} />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default NewTicketsSupervisorGeneral;
