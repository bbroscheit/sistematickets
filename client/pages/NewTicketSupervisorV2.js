import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/ticketsSupervisorV2.module.css";
import arrayUser from "@/functions/arrayUser";
import useUser from "@/hooks/useUser.js";
import colorIndex from "@/functions/colorIndex";
import { devuelveIniciales } from "@/functions/devuelveIniciales";
import { devuelveInicialDesdeUsuario } from "@/functions/devuelveInicialDesdeUsuario";
import { ticketSinAsignar } from "@/functions/ticketSinAsignar";
import NoAccountsSharpIcon from "@mui/icons-material/NoAccountsSharp";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CardInformacionGeneralV2 from "@/components/CardInformacionGeneralV2";
import CardInformacionWorkerV2 from "@/components/CardInformacionWorkerV2";
import CardInformacionTicketsWorker from "@/components/CardInformacionTicketWorkerV2";
import CardInformacionTicketUsuario from "@/components/CardInformacionTicketUsuarioV2";
import CardInformacionUsuarioV2 from "@/components/CardInformacionUsuarioV2";
import ListadoSinAsignar from "@/components/ListadoSinAsignar";

const CACHE_KEY = "supervisor_data_v1";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

function NewTicketsSupervisorV2() {
  const router = useRouter();
  const [soporteUnfinished, setSoporteUnfinished] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [usuariosAlt, setUsuariosAlt] = useState(null);
  const [worker, setWorker] = useState(null);
  const [workerAlt, setWorkerAlt] = useState(null);
  const [infoWorkers, setInfoWorkers] = useState(null);
  const [infoUsuarios, setInfoUsuarios] = useState(null);
  const [view, setView] = useState(1);
  const [viewMenu, setViewMenu] = useState(1);
  const [finder, setFinder] = useState("");
  const [user, setUser] = useUser();
  const restoredFromUrl = useRef(false);

  // sincroniza la seleccion actual en la URL (sin agregar historial), asi
  // "volver atras" desde el detalle de un ticket restaura la misma vista
  const syncUrl = (nextView, workerId, usuario) => {
    const params = new URLSearchParams();
    params.set("view", nextView);
    if (workerId != null) params.set("worker", workerId);
    if (usuario != null) params.set("usuario", usuario);
    router.replace(`/NewTicketSupervisorV2?${params.toString()}`, undefined, { shallow: true });
  };

  const applyData = (workerRes, unfinishedRes, infoWorkersRes, infoUsuariosRes) => {
    const usuariosRes = arrayUser(unfinishedRes);
    setWorker(workerRes);
    setUsuarios(usuariosRes);
    setInfoWorkers(infoWorkersRes);
    setInfoUsuarios(infoUsuariosRes);
    setSoporteUnfinished(ticketSinAsignar(unfinishedRes));
    setWorkerAlt(workerRes);
    setUsuariosAlt(usuariosRes);
  };

  const fetchData = async () => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          applyData(data.workerRes, data.unfinishedRes, data.infoWorkersRes, data.infoUsuariosRes);
          return;
        }
      }
    } catch (_) {}

    const [workerRes, unfinishedRes, infoWorkersRes, infoUsuariosRes] = await Promise.all([
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`).then((res) => res.json()),
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketUnfinished`).then((res) => res.json()),
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/informacionTodosWorkers`).then((res) => res.json()),
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/informacionTodosUsuarios`).then((res) => res.json()),
    ]);

    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        data: { workerRes, unfinishedRes, infoWorkersRes, infoUsuariosRes },
        timestamp: Date.now(),
      }));
    } catch (_) {}

    applyData(workerRes, unfinishedRes, infoWorkersRes, infoUsuariosRes);
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      sessionStorage.removeItem(CACHE_KEY);
      fetchData();
    }, 900000);

    return () => clearInterval(intervalId);
  }, []);

  // restaura la seleccion que venia en la URL (si volvimos del detalle de un ticket).
  // separado del fetch porque router.query puede tardar un tick en poblarse
  // (router.isReady) y no siempre llega al mismo tiempo que los datos.
  useEffect(() => {
    if (!router.isReady || restoredFromUrl.current) return;
    if (worker === null || usuarios === null) return;
    restoredFromUrl.current = true;

    const { view: qView, worker: qWorker, usuario: qUsuario } = router.query;
    if (qView === "2") {
      setView(2);
      const found = qUsuario ? usuarios.filter((u) => u === qUsuario) : usuarios;
      setUsuariosAlt(found.length > 0 ? found : usuarios);
    } else if (qWorker) {
      const found = worker.filter((w) => w.id.toString() === qWorker);
      setWorkerAlt(found.length > 0 ? found : worker);
    }
  }, [router.isReady, router.query, worker, usuarios]);

  const handleClick = (e) => {
    e.preventDefault();
    const clickedId = e.currentTarget.getAttribute("value");
    setWorkerAlt(worker.filter((f) => f.id.toString() === clickedId));
    syncUrl(1, clickedId, null);
  };

  const handleClickUsuarios = (e) => {
    e.preventDefault();
    const clickedValue = e.currentTarget.getAttribute("value");
    setUsuariosAlt(usuarios.filter((f) => f === clickedValue));
    syncUrl(2, null, clickedValue);
  };

  const handleSetView = (nextView) => {
    if (nextView === view) return;
    setView(nextView);
    setFinder("");
    if (nextView === 2) {
      setUsuariosAlt(usuarios);
    } else {
      setWorkerAlt(worker);
    }
    syncUrl(nextView, null, null);
  };

  const handleOpenMenu = () => {
    setViewMenu(viewMenu === 1 ? 2 : 1);
  };

  const handleResetFilters = (e) => {
    e.preventDefault();
    setWorkerAlt(worker);
    setUsuariosAlt(usuarios);
    setFinder("");
    syncUrl(view, null, null);
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
            <div className={style.tabs}>
              <button
                type="button"
                className={`${style.tab} ${view === 1 ? style.tabActive : ""}`}
                onClick={() => handleSetView(1)}
              >
                Workers
              </button>
              <button
                type="button"
                className={`${style.tab} ${view === 2 ? style.tabActive : ""}`}
                onClick={() => handleSetView(2)}
              >
                Usuarios
              </button>
            </div>
            <div className={style.toolbarActions}>
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
          </div>

          <div className={view === 2 ? style.chipScroll : undefined}>
            <div className={style.chipRow}>
              {view === 1 ? (
                worker && worker.length > 0 ? (
                  <>
                    <div
                      className={`${style.chip} ${style.chipAll}`}
                      onClick={handleResetFilters}
                    >
                      Todos<span className={style.chipCount}>{worker.length}</span>
                    </div>
                    {worker.map((e) => (
                      <div
                        key={e.id}
                        className={`${style.chip} ${
                          workerAlt && workerAlt.length === 1 && workerAlt[0].id === e.id
                            ? style.chipActive
                            : ""
                        }`}
                        value={e.id}
                        onClick={handleClick}
                      >
                        <div className={`${style.avatar} ${style[`c${colorIndex(e.id)}`]}`}>
                          {devuelveIniciales(e.firstname, e.lastname)}
                        </div>
                        {e.firstname} {e.lastname}
                      </div>
                    ))}
                  </>
                ) : (
                  <NoAccountsSharpIcon />
                )
              ) : usuarios && usuarios.length > 0 ? (
                <>
                  <div
                    className={`${style.chip} ${style.chipAll}`}
                    onClick={handleResetFilters}
                  >
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

        {view === 1 ? (
          workerAlt !== null && workerAlt.length >= 1 ? (
            <>
              {workerAlt.length === worker.length ? <CardInformacionGeneralV2 /> : null}
              <div className={style.cardGrid}>
                {workerAlt.map((e) => (
                  <div className={`${style.containerInfoTicket} ${workerAlt.length !== worker.length ? style.containerInfoTicketFull : ""}`} key={e.id}>
                    <CardInformacionWorkerV2
                      id={e.id}
                      firstname={e.firstname}
                      lastname={e.lastname}
                      data={infoWorkers ? infoWorkers.find((w) => w.id === e.id) : null}
                    />
                    {workerAlt.length !== worker.length ? (
                      <CardInformacionTicketsWorker id={e.id} />
                    ) : null}
                  </div>
                ))}
              </div>
            </>
          ) : null
        ) : usuariosAlt !== null && usuariosAlt.length >= 1 ? (
          <>
            {usuariosAlt.length === usuarios.length ? <CardInformacionGeneralV2 /> : null}
            <div className={style.cardGrid}>
              {usuariosAlt.map((e) => (
                <div className={`${style.containerInfoTicket} ${usuariosAlt.length !== usuarios.length ? style.containerInfoTicketFull : ""}`} key={e}>
                  <CardInformacionUsuarioV2
                    user={e}
                    data={infoUsuarios ? infoUsuarios.find((u) => u.username === e) : null}
                  />
                  {usuariosAlt.length !== usuarios.length ? (
                    <CardInformacionTicketUsuario user={e} />
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

export default NewTicketsSupervisorV2;
