import React from "react";
import { useState, useEffect } from "react";
import Router from "next/router";
import style from "@/modules/Layout.module.css";
import mainStyle from "@/styles/Home.module.css";
import { postTicket } from "@/pages/api/postTicket.js";

//formulario funciona pero no guarda usuario de la base de datos , revisar

function FormNormal({ user }) {
  const [input, setInput] = useState({
    state: "sin asignar",
    worker: user,
    subject: "",
    detail: "",
    userresolved: false,
  });

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleReset(e) {
    e.preventDefault();
    setInput({
      state: "",
      //usuario que genera el soporte
      worker: "",
      subject: "",
      detail: "",
      userresolved: false,
    });
  }

  function handleSubmitNoFaq(e) {
    e.preventDefault();
    postTicket(input);
    alert("ticket generado con exito");

    // setTimeout(() => {
    //   Router.push("/tickets");
    // }, 500);
  }

  return (
    <form className={mainStyle.interform} onSubmit={(e) => handleSubmitNoFaq(e)}>
      <div className={style.minimalGrid}>
        <h3 className={mainStyle.subtitle}>Título :</h3>
        <input
          type="text"
          placeholder="Ingrese el Título"
          className={mainStyle.input}
          name="subject"
          value={input.subject}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={mainStyle.labelWithTextarea}>
        <h3 className={mainStyle.subtitle}>Descripcíon :</h3>
        <textarea
          type="text"
          placeholder="Ingrese el inconveniente"
          rows="10"
          name="detail"
          value={input.detail}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={style.buttonContainer}>
        <button className={mainStyle.button} type="submit">
          Generar Soporte
        </button>
        <button className={mainStyle.button} onClick={(e) => handleReset(e)}>
          Borrar
        </button>
      </div>
    </form>
  );
}

export default FormNormal;
