import React from "react";
import { useState, useEffect } from "react";
import mainStyle from "../../styles/Home.module.css";
import style from "../../modules/principal.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import filtraUsuariosConectados from "../../functions/filtrausuariosConectados";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ticketSinAsignar} from "@/functions/ticketSinAsignar";
import { ticketAsignados } from "@/functions/ticketAsignados";
import { ticketEnDesarrollo } from "@/functions/ticketEnDesarrollo";
import { ticketMasInformacion } from "@/functions/ticketMasInformacion";
import { ticketFinalizados } from "@/functions/ticketFinalizados";
import TicketCardHelpDesk from "@/components/TicketCardHelpDesk";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Principal() {
  const [activity, setActivity] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [openUser, setOpenUser] = useState(0);
  const [openAsignados, setOpenAsignados] = useState(0);
  const [openDesarrollo, setOpenDesarrollo] = useState(0);
  const [openMasInformacion, setOpenMasInformacion] = useState(0);
  const [openFinalizados, setOpenFinalizados] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [soportes , setSoportes ] = useState(null)

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

  function handleClick(e) {
    e.preventDefault();
    openUser === 0 ? setOpenUser(1) : setOpenUser(0);
  }

  function handleClickAsignados(e) {
    e.preventDefault();
    openAsignados === 0 ? setOpenAsignados(1) : setOpenAsignados(0);
  }

  function handleClickDesarrollo(e) {
    e.preventDefault();
    openDesarrollo === 0 ? setOpenDesarrollo(1) : setOpenDesarrollo(0);
  }

  function handleClickMasInformacion(e) {
    e.preventDefault();
    openMasInformacion === 0 ? setOpenMasInformacion(1) : setOpenMasInformacion(0);
  }

  function handleClickFinalizados(e) {
    e.preventDefault();
    openFinalizados === 0 ? setOpenFinalizados(1) : setOpenFinalizados(0);
  }

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Principal</h1>
      <div>
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
                  {e.USERID.trim()}
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
