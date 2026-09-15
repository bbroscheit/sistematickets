import React, { useState, useEffect } from 'react'
import style from '@/modules/ticketsSupervisorV2.module.css'
import CardTicketWorkerV2 from '@/components/CardTicketWorkerV2'

const TABS = [
  { label: "Todos", value: null },
  { label: "Sin Asignar", value: "sin asignar" },
  { label: "Asignados", value: "Asignado" },
  { label: "Desarrollo", value: "Desarrollo" },
  { label: "Información", value: "Informacion" },
  { label: "Completo", value: "Completado" },
];

function CardInformacionTicketUsuarioV2({ user }) {
  const [soportes, setSoportes] = useState(null);
  const [soportesAlt, setSoportesAlt] = useState(null);
  const [activeTab, setActiveTab] = useState("Todos");

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsByUsuarioId?usuarioId=${user}`)
      .then(res => res.json())
      .then(data => {
        setSoportes(data);
        setSoportesAlt(data);
        setActiveTab("Todos");
      })
  }, [user]);

  function handleSelectFilter(tab) {
    setActiveTab(tab.label);
    setSoportesAlt(tab.value === null ? soportes : soportes.filter(s => s.state === tab.value));
  }

  return (
    <div className={style.ticketsPanel}>
      <div className={style.ticketsPanelHead}>
        <h3>Tickets</h3>
        <div className={style.tabs}>
          {TABS.map(tab => (
            <button
              key={tab.label}
              type="button"
              className={`${style.tab} ${activeTab === tab.label ? style.tabActive : ""}`}
              onClick={() => handleSelectFilter(tab)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {soportesAlt !== null && soportesAlt.length > 0 ? (
        <CardTicketWorkerV2 soportes={soportesAlt} />
      ) : (
        <div className={style.emptyState}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#c3c7cd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12h6M9 16h6M9 8h2" />
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
          </svg>
          <span>No hay resultados</span>
        </div>
      )}
    </div>
  )
}

export default CardInformacionTicketUsuarioV2
