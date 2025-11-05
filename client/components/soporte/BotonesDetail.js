import React from "react";
import mainStyle from "@/styles/Home.module.css";

const SoporteActions = ({ soporte, user, submitAcceptAssigment, handleOpenSolution, handleOpenInfo, SubmitCloseTicket, handleOpenInfoUser, submitAcceptSolution, submitRejectSolution, submitComplete }) => {
  //arreglo para que tome la jefatura porque son muchos insert
  const soporteUser = soporte?.user
  const soporteUserSector = soporteUser.sector
  
  // condición para jefatura/gerencia
  const isJefaturaOGerencia =
    user?.sector &&
    (user.sector.toLowerCase().startsWith("jefatura") ||
      user.sector.toLowerCase().startsWith("gerencia")) &&
    soporte?.user?.sector &&
    user.sector.toLowerCase().includes(soporteUserSector.sectorname.toLowerCase()) &&
    user?.name !== soporte?.user?.username;
  
  const actionMap = {
    Asignado: [
      //usuario
      { show: user?.name === soporte.user.username, label: "Agregar Información", onClick: handleOpenInfoUser },
      //desarrollador
      { show: user?.name === soporte.worker, label: "Comenzar Desarrollo", onClick: submitAcceptAssigment },
      //jefatura/gerencia
      { show: isJefaturaOGerencia, label: "Agregar Información", onClick: handleOpenInfoUser },
    ],
    Desarrollo: [
      //usuario
      { show: user?.name === soporte.user.username, label: "Agregar Información", onClick: handleOpenInfoUser },
      //desarrollador
      { show: user?.name === soporte.worker, label: "Resolver", onClick: handleOpenSolution },
      { show: user?.name === soporte.worker, label: "Agregar Información", onClick: handleOpenInfo },
      //jefatura/gerencia
      { show: isJefaturaOGerencia, label: "Agregar Información", onClick: handleOpenInfoUser },
    ],
    Informacion: [
      //usuario
      { show: user?.name === soporte.user.username, label: "Agregar Información", onClick: handleOpenInfoUser },
      //desarrollador
      { show: user?.name === soporte.worker, label: "Agregar Información", onClick: handleOpenInfo },
      //jefatura/gerencia
      { show: isJefaturaOGerencia, label: "Agregar Información", onClick: handleOpenInfoUser },
    ],
    Completado: [
      //usuario
      { show: user?.name === soporte.user.username, label: "Re Abrir", onClick: handleOpenInfoUser },
      { show: user?.name === soporte.user.username, label: "Cerrar Ticket", onClick: SubmitCloseTicket },
    ],
  };

  const actions = actionMap[soporte.state] || [];

  return (
    <div className={mainStyle.buttonContainer}>
      {actions.filter(a => a.show).map((a, idx) => (
        <button key={idx} onClick={a.onClick} className={mainStyle.button}>
          {a.label}
        </button>
      ))}
    </div>
  );
};

export default SoporteActions;
