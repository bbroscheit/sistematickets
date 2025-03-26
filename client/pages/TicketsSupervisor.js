import React, { useState, useEffect } from "react";
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
  const [soportes, setSoportes] = useState(null);
  const [soporteUnfinished, setSoporteUnfinished] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [usuariosAlt, setUsuariosAlt] = useState(null);
  const [openSinAsignar, setOpenSinAsignar] = useState(true);
  const [worker, setWorker] = useState(null);
  const [view, setView] = useState(1);
  const [title, setTitle] = useState("Desarrollador");
  const [finder, setFinder] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLogin = localStorage.getItem("user");
    const loginParse = JSON.parse(userLogin);
    setUser(loginParse);

    const fetchData = async () => {
      const [soportesRes, workerRes, unfinishedRes] = await Promise.all([
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`).then((res) => res.json()),
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`).then((res) => res.json()),
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketUnfinished`).then((res) => res.json()),
      ]);

      setSoportes(soportesRes);
      setWorker(workerRes);
      setSoporteUnfinished(unfinishedRes);
      setUsuarios(arrayUser(unfinishedRes));
      setUsuariosAlt(arrayUser(unfinishedRes));
    };

    fetchData();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setOpenSinAsignar(!openSinAsignar);
  };

  const handleClickChange = (e) => {
    setView(view === 1 ? 2 : 1);
    setTitle(title === "Desarrollador" ? "Usuarios" : "Desarrollador");
  };

  const handleChangeFinder = (e) => {
    const value = e.target.value;
    setUsuariosAlt(value === "" ? usuarios : usuarios.filter((f) => f.toLowerCase().includes(value)));
  };

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Supervisor</h1>
      {user !== null && user.name === "Asuarez" ? (
        <>
          <div className={style.supervisorTitle}>
            <h2>Soportes por {title}</h2>
          </div>
          <div className={style.cardContainer}>
            {worker !== null && worker.length > 0 ? (
              worker.map((e) => (
                <CardWorkerSupervisor
                  key={e.username}
                  worker={e.username}
                  firstname={e.firstname}
                  lastname={e.lastname}
                />
              ))
            ) : null}
          </div>
        </>
      ) : (
        <div className={style.gridContainer}>
          {soportes !== null && soportes.length > 0 ? (
            <>
              <div className={style.supervisorTitle}>
                <h2>Soportes sin Asignar</h2>
                {openSinAsignar ? (
                  <KeyboardArrowUpIcon onClick={handleClick} />
                ) : (
                  <KeyboardArrowDownIcon onClick={handleClick} />
                )}
              </div>
              {openSinAsignar &&
                soportes.map((e) => (
                  <React.Fragment key={e.id}>
                    <Card
                      id={e.id}
                      subject={e.subject}
                      state={e.state}
                      created={e.created}
                    />
                  </React.Fragment>
                ))}
            </>
          ) : null}

          <br />

          {view === 1 ? (
            <>
              <div className={style.supervisorTitle}>
                <h2>Soportes por {title}</h2>
                <ChangeCircleIcon onClick={handleClickChange} />
              </div>
              <div className={style.cardContainer}>
                {worker !== null && worker.length > 0 ? (
                  worker.map((e) => (
                    <CardWorkerSupervisor
                      key={e.username}
                      worker={e.username}
                      firstname={e.firstname}
                      lastname={e.lastname}
                    />
                  ))
                ) : null}
              </div>
            </>
          ) : (
            <>
              <div className={style.supervisorTitle}>
                <h2>Soportes por {title}</h2>
                <ChangeCircleIcon onClick={handleClickChange} />
              </div>
              <div>
                <h5>Ingresa el apellido del usuario</h5>
                <input type="search" onChange={handleChangeFinder} />
              </div>
              <div className={style.cardContainer}>
                {usuariosAlt !== null && usuariosAlt.length > 0 ? (
                  usuariosAlt.map((e) => (
                    <CardSupervisorUsers
                      key={e}
                      soportes={soporteUnfinished}
                      usuario={e}
                    />
                  ))
                ) : (
                  <h3>No hay usuarios con tickets activos</h3>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default TicketsSupervisor;
