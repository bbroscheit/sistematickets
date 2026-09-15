import React from 'react'
import { useState, useEffect } from 'react'
import style from '../modules/tableroV2.module.css'

function DashboardCardTicketV2({ id }) {
  const [pendientes, setPendientes] = useState(null)
  const [desarrollo, setDesarrollo] = useState(null)
  const [asignados, setAsignados] = useState(null)
  const [desarrolloPendiente, setDesarrolloPendiente] = useState(null)

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
      .then((res) => res.json())
      .then((data) => {
        setPendientes(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketAsignados`)
      .then((res) => res.json())
      .then((data) => {
        setAsignados(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo`)
      .then((res) => res.json())
      .then((data) => {
        setDesarrollo(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsPendientes24`)
      .then((res) => res.json())
      .then((data) => {
        setDesarrolloPendiente(data);
      });
  }, []);

  const borderClass = id === 1 ? style.kpiGreen : id === 4 ? style.kpiRed : style.kpiOrange;

  const label = id === 1
    ? "Pendientes de asignación"
    : id === 2
    ? "Asignados, pendientes de desarrollo"
    : id === 3
    ? "En desarrollo"
    : "En desarrollo hace +24hs";

  const value = id === 1
    ? (pendientes !== null && pendientes.length > 0 ? pendientes.length : 0)
    : id === 2
    ? (asignados !== null && asignados.length > 0 ? asignados.length : 0)
    : id === 3
    ? (desarrollo !== null && desarrollo.length > 0 ? desarrollo.length : 0)
    : (desarrolloPendiente !== null && desarrolloPendiente.length > 0 ? desarrolloPendiente.length : 0);

  return (
    <div className={`${style.kpiCard} ${borderClass}`}>
      <span className={style.kpiLabel}>{label}</span>
      <span className={`${style.kpiValue} ${id === 4 ? style.kpiValueDanger : ""}`}>{value}</span>
    </div>
  )
}

export default DashboardCardTicketV2
