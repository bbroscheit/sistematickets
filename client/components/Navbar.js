import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Styles from "../modules/Navbar.module.css";
import { BiMessageDetail } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";

const Navbar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    let response = JSON.parse(localStorage.getItem("user"));
    setUser({ response });
  }, []);

  function sesionClose(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    Router.push("/");
  }

  return (
    <div className={Styles.container}>
      <ul>
        {user && user.response ? (
          <h2> Bienvenido {user.response.name}</h2>
        ) : (
          <li>
            <Link href="/">Ingresa al Sistema</Link>
          </li>
        )}
        <li>
          <Link href="/tickets">
            <BiMessageDetail /> Soportes
          </Link>
        </li>
        {user.response && user.response.isWorker === true ? (
          <li>
            <Link href="/soportes/nuevoSoporte">
              <BiUserCircle />
              Crear Soporte
            </Link>
          </li>
        ) : null}
        {user.response && user.response.isWorker === true ? (
          <li>
            <Link href="/usuarios">
              <BiUserCircle />
              Usuarios
            </Link>
          </li>
        ) : null}
        {user.response && user.response.isWorker === true ? (
          <li>
            <Link href="/usuarios/nuevoUsuario">
              <BiUserCircle />
              Crear Usuario
            </Link>
          </li>
        ) : null}
        {user.response && user.response.isWorker === true ? (
          <li>
            <Link href="/sectores/nuevoSector">
              <BiUserCircle />
              Crear Sector
            </Link>
          </li>
        ) : null}
        {user.response && user.response.isWorker === true ? (
          <li>
            <Link href="/puntoventa/nuevoPuntoventa">
              <BiUserCircle />
              Crear Punto de venta
            </Link>
          </li>
        ) : null}
         {user.response && user.response.isWorker === true ? (
          <li>
            <Link href="/dashboard">
              <BiUserCircle />
              Dashboard
            </Link>
          </li>
        ) : null}
        <li>
          <button onClick={(e) => sesionClose(e)}>
            <BiUserCircle />
            Cerrar Sesion
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
