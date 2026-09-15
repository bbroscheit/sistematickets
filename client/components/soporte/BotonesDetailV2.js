import React from "react";
import style from "@/modules/detailV2.module.css";


const ROLE = {
  EMPLEADO: 1,
  ENCARGADO: 2,
  JEFE: 3,
  GERENTE: 4,
};

// helper: intersección por id, "a" es un arreglo de ids planos (user.sector/user.salePoint
// vienen así desde localStorage) y "b" es un arreglo de objetos {id, ...} (los sectors/salepoints
// que trae el ticket desde el backend)
const hasIntersection = (a = [], b = []) =>
  a.some(x => b.some(y => y.id === x));

const SoporteActionsV2 = ({
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

  const userSectors = user.sector || [];
  const userSalepoints = user.salePoint || [];

  const suporteUserSectors = soporteUser?.sectors || [];
  const suporteUserSalepoints = soporteUser?.salepoints || [];

  const userRoleId = user.role;

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
        emphasis: "secondary",
      },
      // desarrollador asignado
      {
        show: user.name === soporte.worker,
        label: "Comenzar Desarrollo",
        onClick: submitAcceptAssigment,
        emphasis: "primary",
      },
      // jefatura / gerencia
      {
        show: isJefaturaOGerencia,
        label: "Agregar Información",
        onClick: handleOpenInfoUser,
        emphasis: "secondary",
      },
    ],

    Desarrollo: [
      {
        show: user.name === soporteUser?.username,
        label: "Agregar Información",
        onClick: handleOpenInfoUser,
        emphasis: "secondary",
      },
      {
        show: user.name === soporte.worker,
        label: "Agregar Información",
        onClick: handleOpenInfo,
        emphasis: "secondary",
      },
      {
        show: user.name === soporte.worker,
        label: "Resolver",
        onClick: handleOpenSolution,
        emphasis: "primary",
      },
      {
        show: isJefaturaOGerencia,
        label: "Agregar Información",
        onClick: handleOpenInfoUser,
        emphasis: "secondary",
      },
    ],

    Informacion: [
      {
        show: user.name === soporteUser?.username,
        label: "Agregar Información",
        onClick: handleOpenInfoUser,
        emphasis: "secondary",
      },
      {
        show: user.name === soporte.worker,
        label: "Agregar Información",
        onClick: handleOpenInfo,
        emphasis: "secondary",
      },
      {
        show: isJefaturaOGerencia,
        label: "Agregar Información",
        onClick: handleOpenInfoUser,
        emphasis: "secondary",
      },
    ],

    Completado: [
      {
        show: user.name === soporteUser?.username,
        label: "Re Abrir",
        onClick: handleOpenInfoUser,
        emphasis: "secondary",
      },
      {
        show: user.name === soporteUser?.username,
        label: "Cerrar Ticket",
        onClick: SubmitCloseTicket,
        emphasis: "primary",
      },
    ],
  };

  const actions = actionMap[soporte.state] || [];

  return (
    <div className={style.actions}>
      {actions
        .filter(a => a.show)
        .map((a, idx) => (
          <button
            key={idx}
            type="button"
            onClick={a.onClick}
            className={`${style.btn} ${a.emphasis === "primary" ? style.btnPrimary : style.btnSecondary}`}
          >
            {a.label}
          </button>
        ))}
    </div>
  );
};

export default SoporteActionsV2;
