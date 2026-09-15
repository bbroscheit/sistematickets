import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/ticketsSupervisorV2.module.css";
import arrayUser from "@/functions/arrayUser";
import useUser from "@/hooks/useUser.js";
import colorIndex from "@/functions/colorIndex";
import { devuelveInicialDesdeUsuario } from "@/functions/devuelveInicialDesdeUsuario";
import { ticketSinAsignar } from "@/functions/ticketSinAsignar";
import NoAccountsSharpIcon from "@mui/icons-material/NoAccountsSharp";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CardInformacionUsuarioV2 from "@/components/CardInformacionUsuarioV2";
import CardInformacionTicketUsuarioV2 from "@/components/CardInformacionTicketUsuarioV2";
import ListadoSinAsignar from "@/components/ListadoSinAsignar";

function summarize(tickets) {
  const summary = {
    totalTickets: tickets.length,
    sinAsignar: 0,
    asignados: 0,
    desarrollo: 0,
    informacion: 0,
    completado: 0,
    terminado: 0,
  };
  tickets.forEach((t) => {
    if (t.state === "sin asignar") summary.sinAsignar++;
    else if (t.state === "Asignado") summary.asignados++;
    else if (t.state === "Desarrollo") summary.desarrollo++;
    else if (t.state === "Informacion") summary.informacion++;
    else if (t.state === "Completado") summary.completado++;
    else if (t.state === "Terminado") summary.terminado++;
  });
  return summary;
}

function NewTicketsSupervisorGeneralV2() {
  const router = useRouter();
  const [user, setUser] = useUser("");
  const [soporteUnfinished, setSoporteUnfinished] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [usuariosAlt, setUsuariosAlt] = useState(null);
  const [infoUsuarios, setInfoUsuarios] = useState(null);
  const [summary, setSummary] = useState(null);
  const [viewMenu, setViewMenu] = useState(1);
  const [finder, setFinder] = useState("");
  const restoredFromUrl = useRef(false);

  // sincroniza la seleccion actual en la URL (sin agregar historial), asi
  // "volver atras" desde el detalle de un ticket restaura la misma vista
  const syncUrl = (usuario) => {
    const params = new URLSearchParams();
    if (usuario != null) params.set("usuario", usuario);
    router.replace(`/NewTicketSupervisorGeneralV2?${params.toString()}`, undefined, { shallow: true });
  };

  const fetchData = async () => {
    let id = 0;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      id = JSON.parse(storedUser).id;
    }

    const [unfinishedRes, infoUsuariosRes] = await Promise.all([
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newTicketUnfinished/${id}`).then((res) => res.json()),
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/informacionTodosUsuarios`).then((res) => res.json()),
    ]);

    const usuariosRes = arrayUser(unfinishedRes);
    setUsuarios(usuariosRes);
    setSoporteUnfinished(ticketSinAsignar(unfinishedRes));
    setInfoUsuarios(infoUsuariosRes);
    setSummary(summarize(unfinishedRes));
    setUsuariosAlt(usuariosRes);
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 900000); // 15 minutos

    return () => clearInterval(intervalId);
  }, []);

  // restaura la seleccion que venia en la URL (si volvimos del detalle de un ticket).
  // separado del fetch porque router.query puede tardar un tick en poblarse
  // (router.isReady) y no siempre llega al mismo tiempo que los datos.
  useEffect(() => {
    if (!router.isReady || restoredFromUrl.current) return;
    if (usuarios === null) return;
    restoredFromUrl.current = true;

    const { usuario: qUsuario } = router.query;
    if (qUsuario) {
      const found = usuarios.filter((u) => u === qUsuario);
      setUsuariosAlt(found.length > 0 ? found : usuarios);
    }
  }, [router.isReady, router.query, usuarios]);

  const handleClickUsuarios = (e) => {
    e.preventDefault();
    const clickedValue = e.currentTarget.getAttribute("value");
    setUsuariosAlt(usuarios.filter((f) => f === clickedValue));
    syncUrl(clickedValue);
  };

  const handleOpenMenu = () => {
    setViewMenu(viewMenu === 1 ? 2 : 1);
  };

  const handleResetFilters = (e) => {
    e.preventDefault();
    setUsuariosAlt(usuarios);
    setFinder("");
    syncUrl(null);
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

  return (
    <div className={mainStyle.container}>
      <div className={style.page}>
        <div className={style.ticketsBar}>
          <div className={style.ticketsBarLeft}>
            <h2>Tickets sin Asignar</h2>
            <span className={style.countBadge}>
              {soporteUnfinished ? soporteUnfinished.length : 0}
            </span>
          </div>
          <div className={style.chevronBtn} onClick={handleOpenMenu}>
            {viewMenu === 1 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </div>
        </div>

        {viewMenu === 2 ? (
          <div className={style.listadoContainer}>
            <ListadoSinAsignar soportes={soporteUnfinished} />
          </div>
        ) : null}

        <div className={style.toolbarCard}>
          <div className={style.toolbarTop}>
            <div className={style.searchInput}>
              <SearchIcon fontSize="small" />
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={finder}
                onChange={handleChangeFinder}
              />
            </div>
            <button type="button" className={style.clearBtn} onClick={handleResetFilters}>
              <FilterAltOffRoundedIcon fontSize="small" />
              Limpiar filtros
            </button>
          </div>

          <div className={style.chipScroll}>
            <div className={style.chipRow}>
              {usuarios && usuarios.length > 0 ? (
                <>
                  <div className={`${style.chip} ${style.chipAll}`} onClick={handleResetFilters}>
                    Todos<span className={style.chipCount}>{usuarios.length}</span>
                  </div>
                  {usuarios.map((u) => {
                    const info = infoUsuarios ? infoUsuarios.find((iu) => iu.username === u) : null;
                    return (
                      <div
                        key={u}
                        className={`${style.chip} ${
                          usuariosAlt && usuariosAlt.length === 1 && usuariosAlt[0] === u
                            ? style.chipActive
                            : ""
                        }`}
                        value={u}
                        onClick={handleClickUsuarios}
                      >
                        <div className={`${style.avatar} ${style[`c${colorIndex(u)}`]}`}>
                          {devuelveInicialDesdeUsuario(u)}
                        </div>
                        {info ? info.nombreCompleto : u}
                      </div>
                    );
                  })}
                </>
              ) : (
                <NoAccountsSharpIcon />
              )}
            </div>
          </div>
        </div>

        {usuariosAlt !== null && usuariosAlt.length >= 1 ? (
          <>
            {usuariosAlt.length === usuarios.length ? (
              <div className={style.summaryStrip}>
                <div className={style.summaryTitle}>Información General</div>
                <div className={style.summaryStat}>
                  <span className={style.n}>{summary ? summary.totalTickets : 0}</span>
                  <span className={style.l}>Total</span>
                </div>
                <div className={style.summaryStat}>
                  <span className={style.n}>{summary ? summary.sinAsignar : 0}</span>
                  <span className={style.l}>Sin Asignar</span>
                </div>
                <div className={style.summaryStat}>
                  <span className={style.n}>{summary ? summary.asignados : 0}</span>
                  <span className={style.l}>Asignados</span>
                </div>
                <div className={style.summaryStat}>
                  <span className={style.n}>{summary ? summary.desarrollo : 0}</span>
                  <span className={style.l}>Desarrollo</span>
                </div>
                <div className={style.summaryStat}>
                  <span className={style.n}>{summary ? summary.informacion : 0}</span>
                  <span className={style.l}>Información</span>
                </div>
                <div className={style.summaryStat}>
                  <span className={style.n}>{summary ? summary.completado : 0}</span>
                  <span className={style.l}>Completo</span>
                </div>
                <div className={style.summaryStat}>
                  <span className={style.n}>{summary ? summary.terminado : 0}</span>
                  <span className={style.l}>Terminado</span>
                </div>
              </div>
            ) : null}
            <div className={style.cardGrid}>
              {usuariosAlt.map((e) => (
                <div className={`${style.containerInfoTicket} ${usuariosAlt.length !== usuarios.length ? style.containerInfoTicketFull : ""}`} key={e}>
                  <CardInformacionUsuarioV2
                    user={e}
                    data={infoUsuarios ? infoUsuarios.find((u) => u.username === e) : null}
                  />
                  {usuariosAlt.length !== usuarios.length ? (
                    <CardInformacionTicketUsuarioV2 user={e} />
                  ) : null}
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default NewTicketsSupervisorGeneralV2;
