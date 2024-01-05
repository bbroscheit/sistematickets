import React from "react";
import { useState, useEffect } from "react";
import Router from "next/router";
import style from "@/modules/formNormal.module.css";
import mainStyle from "@/styles/Home.module.css";
import { postTicketFormData } from "@/pages/api/postTicketFormData.js";
import { sendEmailNewTicket } from "@/pages/api/sendEmailNewTIcket";


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

  const [login, setLogin] = useState(null)
  const [email, setEmail] = useState({ email: "" })

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setLogin(loginParse);
    setInput({
      ...input,
      user:loginParse.name
    })
    setEmail({
      email:loginParse.email
    })
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

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
    postTicketFormData(input)
    // sendEmailNewTicket(email)
    alert("ticket generado con exito");

    setTimeout(() => {
      Router.push("/tickets");
    }, 500);
  }

  // console.log("userForm Data", user)
  console.log("inputForm Data", input)

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
          className={mainStyle.inputFile}
          // value={input.files}
          onChange={(e) => handleChangeFile(e)}
        />
      </div>
      {/* se crean dos juegos de botones, uno para las vistas en celulares y el otro para las demas */}
      <div className={style.buttonContainerNormal}>
      <div className={mainStyle.buttonContainer}>
        <button className={mainStyle.button} type="submit">
          Generar Soporte
        </button>
        <button className={mainStyle.button} onClick={(e) => handleReset(e)}>
          Borrar
        </button>
      </div>
      </div>
      <div className={style.buttonContainerMobile}>
      <div className={mainStyle.buttonContainer}>
        <button className={mainStyle.button} type="submit">
          Generar
        </button>
        <button className={mainStyle.button} onClick={(e) => handleReset(e)}>
          Borrar
        </button>
      </div>
      </div>
    </form>
  );
}

export default FormNormal;
