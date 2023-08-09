import React from "react";
import { useState, useEffect } from "react";
import { getSector } from "../api/getSector";
import mainStyles from "../../styles/Home.module.css";
import style from "@/modules/newUser.module.css";

function nuevoUsuario() {
  const [sector, setSector] = useState(null);
  const [salepoint, setSalepoint] = useState(null);
  const [input, setInput] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
    int: "",
    isWorker: "",
    sector: "",
    salepoint: "",
  });
  const [error, setError] = useState("");
  const [button, setButton] = useState({
    complete: false,
  });

  useEffect(() => {
    fetch("http://localhost:3001/sector")
      .then((res) => res.json())
      .then((data) => {
        setSector(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/salepoint")
      .then((res) => res.json())
      .then((data) => {
        setSalepoint(data);
      });
  }, []);

  console.log("salepoint", salepoint);
  console.log("sector", sector);

  return (
    <div className={mainStyles.container}>
      <h1 className={mainStyles.title}>Creación de Usuario</h1>
      <form className={mainStyles.form}>
        <div className={mainStyles.minimalGrid}>
          <h3 className={mainStyles.subtitle}>Usuario</h3>
          <input
            type="text"
            name="username"
            value={input.username}
            className={mainStyles.input}
            onChange={e => handleChange(e)}
          />
          <h3 className={mainStyles.subtitle}>Password </h3>
          <input
            type="password"
            name="password"
            value={input.password}
            className={mainStyles.input}
            onChange={e => handleChange(e)}
          />
          <h3 className={mainStyles.subtitle}>Nombre</h3>
          <input
            type="text"
            name="name"
            value={input.name}
            className={mainStyles.input}
            onChange={e => handleChange(e)}
          />
          <h3 className={mainStyles.subtitle}>Apellido</h3>
          <input
            type="text"
            name="surname"
            value={input.surname}
            className={mainStyles.input}
            onChange={e => handleChange(e)}
          />
          <h3 className={mainStyles.subtitle}>E-mail</h3>
          <input
            type="email"
            name="email"
            value={input.email}
            className={mainStyles.input}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className={mainStyles.minimalFlex}>
          <div className={mainStyles.minimalGrid}>
            <h3 className={mainStyles.subtitle}>Interno</h3>
            <input type="number" name="int" value={input.int} onChange={e => handleChange(e)}/>
          </div>
          <div className={mainStyles.minimalGrid}>
            <h3 className={mainStyles.subtitle} >Soporte ?</h3>
            <select value={input.isWorker} name="isWorker" onChange={e => handleChange(e)} className={mainStyles.select}>
              <option className={mainStyles.option}>Elija una opción</option>
              <option value="yes" className={mainStyles.option}>Si</option>
              <option value="no" className={mainStyles.option}>No</option>
            </select>
          </div>
        </div>
        <div className={mainStyles.minimalGrid}>
          <h3 className={mainStyles.subtitle}>Sector</h3>
          <select className={mainStyles.select} value={input.sector} name="sector" onChange={e => handleChange(e)}>
            <option className={mainStyles.option} value="">Elija una Opción</option>
            {sector &&
              sector.map((e) => (
                <option className={mainStyles.option} value={e.sector}>{e.sectorname}</option>
              ))}
          </select>
        </div>
        <div className={mainStyles.minimalGrid}>
          <h3 className={mainStyles.subtitle}>Unidad de negocio</h3>
          <select className={mainStyles.select} value={input.salepoint} name="salepoint" onChange={e => handleChange(e)}>
            <option className={mainStyles.option} value="">Elija una Opción</option>
            {salepoint &&
              salepoint.map((e) => (
                <option className={mainStyles.option} value={e.salepoint}>{e.salepoint}</option>
              ))}
          </select>
        </div>
        <div className={style.buttonContainer}>
          <button type="submit" className={mainStyles.button}>
            Crear
          </button>
          <button className={mainStyles.button}>Limpiar</button>
        </div>
      </form>
    </div>
  );
}

export default nuevoUsuario;
