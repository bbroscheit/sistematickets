import React from "react";
import mainStyle from "@/styles/Home.module.css";


const ROLE = {
  EMPLEADO: 1,
  ENCARGADO: 2,
  JEFE: 3,
  GERENTE: 4,
};

// helper: intersección por id
const hasIntersection = (a = [], b = []) =>
  a.some(x => b.some(y => y.id === x.id));

const SoporteActions = ({
  soporte,
  user,
  submitAcceptAssigment,
  handleOpenSolution,
  handleOpenInfo,
  SubmitCloseTicket,
  handleOpenInfoUser,
}) => {
  if (!soporte || !user) return null;

  const soporteUser = soporte.user;

  const userSectors = user.sectors || [];
  const userSalepoints = user.salepoints || [];

  const suporteUserSectors = soporteUser?.sectors || [];
  const suporteUserSalepoints = soporteUser?.salepoints || [];

  const userRoleId = user.roleId;

  // regla FINAL: jefatura / gerencia
  const isJefaturaOGerencia =
    [ROLE.ENCARGADO, ROLE.JEFE, ROLE.GERENTE].includes(userRoleId) &&
    user.name !== soporteUser?.username &&
    hasIntersection(userSectors, suporteUserSectors) &&
    hasIntersection(userSalepoints, suporteUserSalepoints);

  const actionMap = {
    Asignado: [
      // creador
      {
        show: user.name === soporteUser?.username,
        label: "Agregar Información",
        onClick: handleOpenInfoUser,
      },
      // desarrollador asignado
      {
        show: user.name === soporte.worker,
        label: "Comenzar Desarrollo",
        onClick: submitAcceptAssigment,
      },
      // jefatura / gerencia
      {
        show: isJefaturaOGerencia,
        label: "Agregar Información",
        onClick: handleOpenInfoUser,
      },
    ],

    Desarrollo: [
      {
        show: user.name === soporteUser?.username,
        label: "Agregar Información",
        onClick: handleOpenInfoUser,
      },
      {
        show: user.name === soporte.worker,
        label: "Resolver",
        onClick: handleOpenSolution,
      },
      {
        show: user.name === soporte.worker,
        label: "Agregar Información",
        onClick: handleOpenInfo,
      },
      {
        show: isJefaturaOGerencia,
        label: "Agregar Información",
        onClick: handleOpenInfoUser,
      },
    ],

    Informacion: [
      {
        show: user.name === soporteUser?.username,
        label: "Agregar Información",
        onClick: handleOpenInfoUser,
      },
      {
        show: user.name === soporte.worker,
        label: "Agregar Información",
        onClick: handleOpenInfo,
      },
      {
        show: isJefaturaOGerencia,
        label: "Agregar Información",
        onClick: handleOpenInfoUser,
      },
    ],

    Completado: [
      {
        show: user.name === soporteUser?.username,
        label: "Re Abrir",
        onClick: handleOpenInfoUser,
      },
      {
        show: user.name === soporteUser?.username,
        label: "Cerrar Ticket",
        onClick: SubmitCloseTicket,
      },
    ],
  };

  const actions = actionMap[soporte.state] || [];

  return (
    <div className={mainStyle.buttonContainer}>
      {actions
        .filter(a => a.show)
        .map((a, idx) => (
          <button
            key={idx}
            onClick={a.onClick}
            className={mainStyle.button}
          >
            {a.label}
          </button>
        ))}
    </div>
  );
};

export default SoporteActions;

