import React from "react";
import CardV2 from "@/components/CardV2";
import style from "@/modules/TicketV2.module.css";

function Section({ title, tickets }) {
  if (tickets.length === 0) return null;
  return (
    <div className={style.section}>
      <div className={style.sectionTitle}>
        <h2>{title}</h2>
        <span className={style.sectionCount}>{tickets.length}</span>
      </div>
      <div className={style.rowList}>
        {tickets.map((e) => (
          <CardV2
            key={e.id}
            id={e.id}
            subject={e.subject}
            state={e.state}
            created={e.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className={style.empty}>
      <div className={style.ic}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="13" y2="17"></line></svg>
      </div>
      <h3>No tenés soportes en este momento</h3>
      <p>Cuando generes una consulta nueva o alguien te asigne una, la vas a ver acá.</p>
      <a href="/soportes/nuevoSoporteV2" className={style.btn}>Crear nuevo soporte</a>
    </div>
  );
}

function TicketVistaV2({
  ticketGenerados,
  ticketAsignados,
  ticketDesarrollo,
  ticketDesarrollo2,
  ticketCompletado,
  user,
}) {
  const loaded =
    ticketGenerados !== null &&
    ticketAsignados !== null &&
    ticketDesarrollo !== null &&
    ticketDesarrollo2 !== null &&
    ticketCompletado !== null;

  if (!loaded) return null;

  // a pedido de Gcurcio se crea una vista para que ella pueda ver todos los soportes activos, en caso de que el usuario no sea curcio, el programa entra por la via normal y cada usuario solo ve su soporte creado o Asignado
  if (user !== null && (user.name === "Gcurcio" || user.name === "Administrador")) {
    const generados = ticketGenerados.filter((e) => e.user !== null);
    const asignados = ticketAsignados.filter((e) => e.user !== null);
    const desarrollo = ticketDesarrollo.filter((e) => e.user !== null);
    const desarrollo2 = ticketDesarrollo2.filter((e) => e.user !== null);
    const completado = ticketCompletado.filter((e) => e.user !== null);

    const total =
      generados.length + asignados.length + desarrollo.length + desarrollo2.length + completado.length;

    if (total === 0) return <EmptyState />;

    return (
      <div className={style.column}>
        <Section title="Soportes sin asignar" tickets={generados} />
        <Section title="Soportes Asignados" tickets={asignados} />
        <Section title="Soportes En Desarrollo" tickets={desarrollo} />
        <Section title="Soportes que necesitan más información" tickets={desarrollo2} />
        <Section title="Soportes pendientes de cierre" tickets={completado} />
      </div>
    );
  }

  if (user !== null && user.sector === "Sistemas") {
    const generados = ticketGenerados;
    const asignados = ticketAsignados.filter((e) => user.name === e.worker);
    const desarrollo = ticketDesarrollo.filter((e) => user.name === e.worker);
    const desarrollo2 = ticketDesarrollo2.filter((e) => user.name === e.worker);
    const completado = ticketCompletado.filter((e) => user.name === e.worker);

    const total =
      generados.length + asignados.length + desarrollo.length + desarrollo2.length + completado.length;

    if (total === 0) return <EmptyState />;

    return (
      <div className={style.column}>
        <Section title="Soportes Generados" tickets={generados} />
        <Section title="Soportes Asignados" tickets={asignados} />
        <Section title="Soportes En Desarrollo" tickets={desarrollo} />
        <Section title="Soportes que necesitan más información" tickets={desarrollo2} />
        <Section title="Soportes pendientes de cierre" tickets={completado} />
      </div>
    );
  }

  if (user !== null && user.sector !== "Sistemas") {
    const generados = ticketGenerados.filter((e) => e.user !== null && user.name === e.user.username);
    const asignados = ticketAsignados.filter((e) => e.user !== null && user.name === e.user.username);
    const desarrollo = ticketDesarrollo.filter((e) => e.user !== null && user.name === e.user.username);
    const desarrollo2 = ticketDesarrollo2.filter((e) => e.user !== null && user.name === e.user.username);
    const completado = ticketCompletado.filter((e) => e.user !== null && user.name === e.user.username);

    const total =
      generados.length + asignados.length + desarrollo.length + desarrollo2.length + completado.length;

    if (total === 0) return <EmptyState />;

    return (
      <div className={style.column}>
        <Section title="Soportes sin asignar" tickets={generados} />
        <Section title="Soportes Asignados" tickets={asignados} />
        <Section title="Soportes En Desarrollo" tickets={desarrollo} />
        <Section title="Soportes que necesitan más información" tickets={desarrollo2} />
        <Section title="Soportes pendientes de cierre" tickets={completado} />
      </div>
    );
  }

  return null;
}

export default TicketVistaV2;
