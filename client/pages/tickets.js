import React from "react";
import { useState, useEffect } from "react";
import Card from '../components/Card.js';
import styles from '../modules/Ticket.module.css';
import mainStyles from '@/styles/Home.module.css'


function tickets() {
  const [ticketGenerados, setTicketsGenerados] = useState(null);
  const [ticketDesarrollo, setTicketsDesarrollo] = useState(null);
  const [ticketDesarrollo2, setTicketsDesarrollo2] = useState(null); // le puse desarrollo2 pero en realidad son los que necesitan mas informacion
  const [ticketCompletado, setTicketsCompletado] = useState(null);
  const [user, setUser] = useState(null)

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
   
  }, []);
  
  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsGenerados(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsDesarrollo(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDesarrollo2`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsDesarrollo2(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketCompletado`)
      .then((res) => res.json())
      .then((data) => {
        setTicketsCompletado(data);
      });
  }, []);

  console.log("sin asignar", )

  return (
    <div className={mainStyles.container}>
      <h1 className={mainStyles.title}>SOPORTES</h1>
      {ticketGenerados  && (
        <div className={styles.gridContainer}>
          <h2>Soportes Generados</h2>
          {ticketGenerados.map((e) => (
            <Card id= {e.id} subject= {e.subject} state={e.state}/>
             ))}
        </div>
      )}
      {ticketDesarrollo && (
        <div className={styles.gridContainer}>
          <h2>Soportes En Desarrollo</h2>
          {ticketDesarrollo.map((e) => (
            <Card id= {e.id} subject= {e.subject} state={e.state}/>
          ))}
        </div>
      )}
      {ticketDesarrollo2 && (
        <div className={styles.gridContainer}>
          <h2>Soportes que necesitan mas información</h2>
          {ticketDesarrollo2.map((e) => (
            <Card id= {e.id} subject= {e.subject} state={e.state}/>
          ))}
        </div>
      )}
      {ticketCompletado && (
        <div className={styles.gridContainer}>
          <h2>Soportes pendientes de cierre</h2>
          {ticketCompletado.map((e) => (
            <Card id= {e.id} subject= {e.subject} state={e.state}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default tickets;
