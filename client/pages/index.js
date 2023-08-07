import React from "react";
import { useState } from "react";
import Head from "next/head";
import styles from "../modules/index.module.css";
import { getUser } from "../pages/api/getUser";
import Router from "next/router";

export default function Home() {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [button, setButton] = useState({ complete: false });
  const [errorLogin, setErrorLogin] = useState({ state: false });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrorLogin({
      state: false,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
   
  }

  function validate(input) {
    let errors = {};
    if (!input.username) {
      errors.username = "El campo no puede quedar vacio";
    }
    if (!input.password) {
      errors.password = "El campo no puede quedar vacio";
    }

    if (errors.username || errors.password) {
      setButton({
        complete: false,
      });
    } else {
      setButton({
        complete: true,
      });
    }
    return errors;
  }

  async function onHandleSubmit(e) {
    e.preventDefault(e);
    let login = await getUser(input);
    console.log(login)
    if(login.id){
      const user = {
        id: login.id,
        name: login.name,
        email: login.email,
        isWorker: login.isworker,
        phoneNumber: login.phonenumber,
        salePoint: login.salepoint.salepoint,
        sector: login.sector.sectorname
      }
      localStorage.setItem('user', JSON.stringify(user));
      Router.push("/tickets")
    }else{
      setErrorLogin({ state: true });
    }
  }

  return (
    <>
      <Head>
        <title>Soportes Basani</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.indexContainer}>
        <form className={styles.indexForm} onSubmit={(e) => onHandleSubmit(e)}>
          <p
            className={
              errorLogin.state === true
                ? `${styles.dangerLogin}`
                : `${styles.normalLogin}`
            }
          >
            "Usuario o contraseña incorrecta"
          </p>
          <label className={styles.indexLabel}>Nombre de Usuario</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={(e) => handleChange(e)}
          />
          <p
            className={error.username ? `${styles.danger}` : `${styles.normal}`}
          >
            {error.username}
          </p>
          <label className={styles.indexLabel}>Contraseña</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(e) => handleChange(e)}
          />
          <p
            className={error.password ? `${styles.danger}` : `${styles.normal}`}
          >
            {error.password}
          </p>

          {button.complete === false ? (
            <button
              type="submit"
              disabled
              className={styles.indexButtonDisabled}
            >
              Ingresar
            </button>
          ) : (
            <button type="submit" className={styles.indexButton}>
              Ingresar
            </button>
          )}
        </form>
      </div>
    </>
  );
}
