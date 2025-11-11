import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { extraeFecha } from "@/functions/extraeFecha";
import style from "@/modules/listadoSinAsignar.module.css";

function ListadoSinAsignar({ soportes }) {
  const router = useRouter();
  function idKeep(e) {
    
    const idSoporte = e.target.getAttribute("value");
    localStorage.setItem("idSoporte", JSON.stringify(idSoporte));
    
    router.push(`/soportes/[id]`, `/soportes/${idSoporte}`)
  }

  return (
    <div className={style.ticketContainer}>
      {soportes.map((e) => (
        <div className={style.ticketLine}>
          <p onClick={ u => idKeep(u) } value={e.id}>{`N° ${e.id}`}</p>
          <p>{extraeFecha(e.created)}</p>
          <p>{e.subject}</p>
          <p>{`${e.user.firstname} ${e.user.lastname}`}</p>
        </div>
      ))}
    </div>
  );
}

export default ListadoSinAsignar;

