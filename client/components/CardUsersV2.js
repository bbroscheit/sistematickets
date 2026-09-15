import React from "react";
import Link from "next/link";
import style from "@/modules/usuariosV2.module.css";
import colorIndex from "@/functions/colorIndex";
import { devuelveIniciales } from "@/functions/devuelveIniciales";

function CardUsersV2({ id, username, firstname, lastname, phonenumber, email, sectors, salepoints }) {
  const sector = sectors && sectors.length > 0 ? sectors[0] : null;
  const salepoint = salepoints && salepoints.length > 0 ? salepoints[0] : null;

  return (
    <Link href={`/usuarios/${id}`} className={style.userCard}>
      <div className={style.userHead}>
        <div className={`${style.avatar} ${style[`c${colorIndex(username)}`]}`}>
          {devuelveIniciales(firstname, lastname)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div className={style.userName}>{firstname || "Sin nombre"} {lastname || ""}</div>
          <div className={style.userHandle}>@{username}</div>
        </div>
      </div>
      <div className={style.tagRow}>
        <span className={`${style.tag} ${style[`c${colorIndex(sector ? sector.sectorname : "sin-sector")}`]}`}>
          {sector ? sector.sectorname : "Sin sector"}
        </span>
        <span className={`${style.tag} ${style[`c${colorIndex(salepoint ? salepoint.salepoint : "sin-sucursal")}`]}`}>
          {salepoint ? salepoint.salepoint : "Sin sucursal"}
        </span>
      </div>
      <div className={style.contactBlock}>
        <span>Int. {phonenumber || "sin datos"}</span>
        <span>{email || "sin datos"}</span>
      </div>
    </Link>
  );
}

export default CardUsersV2;
