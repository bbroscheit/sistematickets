import React from "react";
import { useState, useEffect } from "react";

function tickets() {
  const [ticketGenerados, setTicketsGenerados] = useState(null);
  const [ticketDesarrollo, setTicketsDesarrollo] = useState(null);
  const [ticketDesarrollo2, setTicketsDesarrollo2] = useState(null);
  const [ticketCompletado, setTicketsCompletado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/ticketGenerados")
      .then((res) => res.json())
      .then((data) => {
        setTicketsGenerados(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/ticketDesarrollo")
      .then((res) => res.json())
      .then((data) => {
        setTicketsDesarrollo(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/ticketDesarrollo2")
      .then((res) => res.json())
      .then((data) => {
        setTicketsDesarrollo2(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/ticketCompletado")
      .then((res) => res.json())
      .then((data) => {
        setTicketsCompletado(data);
      });
  }, []);

  return (
    <div>
      <h1>Tickets</h1>
      {ticketGenerados  && (
        <div>
          <h2>Tickets Generados</h2>
          {ticketGenerados.map((e) => (
            <h3>{e.id}</h3>
          ))}
        </div>
      )}
      {ticketDesarrollo && (
        <div>
          <h2>Tickets En Desarrollo</h2>
          {ticketDesarrollo.map((e) => (
            <h3>{e.id}</h3>
          ))}
        </div>
      )}
      {ticketDesarrollo2 && (
        <div>
          <h2>Tickets que necesitan mas información</h2>
          {ticketDesarrollo2.map((e) => (
            <h3>{e.id}</h3>
          ))}
        </div>
      )}
      {ticketCompletado && (
        <div>
          <h2>Tickets Completados - Solicitan cierre por parte del usuario</h2>
          {ticketCompletado.map((e) => (
            <h3>{e.id}</h3>
          ))}
        </div>
      )}
    </div>
  );
}

export default tickets;
