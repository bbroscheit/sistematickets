import React from "react";
import { useState, useEffect } from "react";
import Router from "next/router";
import style from "@/modules/Layout.module.css";
import mainStyle from "@/styles/Home.module.css";
import { postTicket } from "@/pages/api/postTicket.js";
import { postTicketFormData } from "@/pages/api/postTicketFormData.js";


function FormNormal({ user }) {
  
  const [input, setInput] = useState({
    state: "sin asignar",
    worker: "sin asignar",
    subject: "",
    detail: "",
    files:[],
    userresolved: false,
    user:user.name
  });

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  // function handleChangeFile(e){
  //   e.preventDefault();
  //   setInput({
  //     ...input,
  //     files : [...input.files, e.target.value]
  //   })
  // }

  function handleChangeFile(e) {
    e.preventDefault();
    const filesArray = [...e.target.files];  // Convierte la colección de archivos en un array
    setInput({
      ...input,
      files: filesArray,
    });
  }

  function handleReset(e) {
    e.preventDefault();
    setInput({
      state: "sin asignar",
      worker: "sin asignar",
      subject: "",
      detail: "",
      userresolved: false,
      user:user.name
    });
  }

  function handleSubmitNoFaq(e) {
    e.preventDefault();
    // postTicket(input);
    postTicketFormData(input)
    alert("ticket generado con exito");

    setTimeout(() => {
      Router.push("/tickets");
    }, 500);
  }

  console.log("input", input)

  return (
    <form className={mainStyle.interform} onSubmit={(e) => handleSubmitNoFaq(e)}  encType="multipart/form-data">
      <div className={mainStyle.minimalGrid}>
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
      <div>
        <h3 className={mainStyle.subtitle}> ¿ Deseas agregar algun archivo ?</h3>
        <input
          type="file"
          name="files"
          multiple
          // value={input.files}
          onChange={(e) => handleChangeFile(e)}
        />
      </div>
      <div className={mainStyle.buttonContainer}>
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
