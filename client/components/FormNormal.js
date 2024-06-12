import React from "react";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
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
    user:user.name,
    email:""
  });
  const [login, setLogin] = useState(null)
  const [error, setError] = useState("");
  const [button, setButton] = useState({
    complete : false
  })

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setLogin(loginParse);
    setInput({
      ...input,
      user:loginParse.name,
      email:loginParse.email
    })
    // setEmail({
      
    // })
  }, []);

  useEffect(() => {
    const textarea = document.getElementById('mi-textarea');
    textarea.style.height = 'auto'; // Restablece la altura a automática
    textarea.style.height = textarea.scrollHeight + 'px'; // Establece la altura según el contenido
  }, [input.detail]);

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
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
      user:user.name,
      email:""
    });
  }

  function handleSubmitNoFaq(e) {
    e.preventDefault();
    postTicketFormData(input)
      .then(res => {
        
        if (res.state === "success") {
        sendEmailNewTicket(input)
        Swal.fire(({
          icon: "success",
          title: "Tu soporte fue generado con éxito!",
          showConfirmButton: false,
          timer: 1500
        }));
        setTimeout(() => {
          Router.push("/Tickets");
        }, 1500);
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
  }

  function validate(input){
    let errors = []
      if (!input.subject) {
        errors.subject = "El campo no puede estar vacío";
      }
      if (!input.detail) {
        errors.detail = "El campo no puede estar vacío";
      }
      if (input.detail.length < 50 ) {
        errors.detail = "El campo de tener un mínimo de 50 caracteres";
      }

      if (!errors.subject && !errors.detail) {
        setButton({ complete : true })
      }else{
        setButton({ complete: false })
      }
      
    return errors
  }

  
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
      <p className={ error.subject ? `${mainStyle.danger}` : `${mainStyle.normal}`}>
          {error.subject}
      </p>
      <div className={mainStyle.labelWithTextarea}>
        <h3 className={mainStyle.subtitle}>Descripcíon :</h3>
        <textarea
          id="mi-textarea"
          type="text"
          placeholder="Ingrese el inconveniente"
          name="detail"
          value={input.detail}
          onChange={(e) => handleChange(e)}
          style={{
            minHeight: '120px',
            resize: 'none',
            overflowY: 'hidden'
          }}
        />
      </div>
      <p className={ error.detail ? `${mainStyle.danger}` : `${mainStyle.normal}`}>
          {error.detail}
      </p>
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
        {
          button.complete === true ?
            <button className={mainStyle.button} type="submit"> Generar Soporte </button> 
            : <button className={mainStyle.buttonDisabled} type="submit" disabled> Generar Soporte </button> 
        }
        
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
