import React from "react";
import style from "../modules/ticketsSupervisorV2.module.css";
import colorIndex from "@/functions/colorIndex";
import { devuelveInicialDesdeUsuario } from "@/functions/devuelveInicialDesdeUsuario";

function CardInformacionUsuarioV2({ user, data }) {
  const nombre = data ? data.nombreCompleto : user;
  const avatarColor = style[`c${colorIndex(user)}`];

  const sinAsignar = data ? data.sinAsignar : 0;
  const asignados = data ? data.asignados : 0;
  const desarrollo = data ? data.desarrollo : 0;
  const informacion = data ? data.informacion : 0;
  const completo = data ? data.completado : 0;
  const terminado = data ? data.terminado : 0;

  return (
    <div className={style.personCard}>
      <div className={style.personHead}>
        <div className={`${style.avatarLg} ${avatarColor}`}>
          {devuelveInicialDesdeUsuario(user)}
        </div>
        <div>
          <div className={style.personName}>{nombre}</div>
          <div className={style.personSub}>
            {data ? data.totalTickets : 0} tickets totales
          </div>
        </div>
      </div>
      <div className={style.statGrid}>
        <div className={`${style.statCell} ${sinAsignar > 0 ? style.alert : ""}`}>
          <span className={style.statLabel}>No Asignados</span>
          <span className={style.statValue}>{sinAsignar}</span>
        </div>
        <div className={style.statCell}>
          <span className={style.statLabel}>Asignados</span>
          <span className={`${style.statValue} ${asignados === 0 ? style.muted : ""}`}>
            {asignados}
          </span>
        </div>
        <div className={style.statCell}>
          <span className={style.statLabel}>Desarrollo</span>
          <span className={`${style.statValue} ${desarrollo === 0 ? style.muted : ""}`}>
            {desarrollo}
          </span>
        </div>
        <div className={style.statCell}>
          <span className={style.statLabel}>Información</span>
          <span className={`${style.statValue} ${informacion === 0 ? style.muted : ""}`}>
            {informacion}
          </span>
        </div>
        <div className={style.statCell}>
          <span className={style.statLabel}>Completo</span>
          <span className={`${style.statValue} ${completo === 0 ? style.muted : ""}`}>
            {completo}
          </span>
        </div>
        <div className={style.statCell}>
          <span className={style.statLabel}>Terminado</span>
          <span className={style.statValue}>{terminado}</span>
        </div>
      </div>
    </div>
  );
}

export default CardInformacionUsuarioV2;
