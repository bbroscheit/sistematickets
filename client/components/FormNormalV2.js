import React from "react";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import Router from "next/router";
import style from "@/modules/formNormalV2.module.css";
import { postTicketFormDataAndDesarrollo }  from "@/pages/api/postTicketFormDataAndDesarrollo";
import { postTicketFormData } from "@/pages/api/postTicketFormData.js";
import { sendEmailNewTicket } from "@/pages/api/sendEmailNewTIcket";


function FormNormalV2({ user }) {
  const [desarrollos, setDesarrollos] = useState(null);
  const [desarrolloInput, setDesarrolloInput] = useState({option: 0});
  const [dragOver, setDragOver] = useState(false);
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
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/desarrollo`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/desarrollo`)
      .then((res) => res.json())
      .then((data) => {
          setDesarrollos(data.filter((des) =>
          des.users?.some((u) => u.username === user.name)
        ));
      });
  }, []);

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setLogin(loginParse);
    setInput({
      ...input,
      user:loginParse.name,
      email:loginParse.email
    })
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

  function processFiles(fileList) {
    const filesArray = [...fileList];
    setInput({
      ...input,
      files: filesArray,
    });
  }

  function handleChangeFile(e) {
    e.preventDefault();
    processFiles(e.target.files);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
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

  function handleSelectDesarrollo(e) {
    e.preventDefault();
    setDesarrolloInput({
      option : e.target.value,
    });
  }

  function handleSubmitNoFaq(e) {
    e.preventDefault();
    if(desarrolloInput.option === 0 ){
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
          user.sector === "Supervisor" ? Router.push("/TicketsSupervisor")
            : user.sector.includes("Jefatura") ? Router.push("/TicketsSupervisorSector")
            : user.sector.includes("Jefe") ? Router.push("/TicketSupervisorGeneral")
            : Router.push("/TicketsV2");

        }, 1500);
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
    }else{
      //postTicketFormData(input)
      postTicketFormDataAndDesarrollo(input, desarrolloInput)
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
          user.sector === "Supervisor" ? Router.push("/TicketsSupervisor")
            : user.sector.includes("Jefatura") ? Router.push("/TicketsSupervisorSector")
            : user.sector.includes("Jefe") ? Router.push("/TicketSupervisorGeneral")
            : Router.push("/TicketsV2");

        }, 1500);
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
    }

  }

  function validate(input){
    let errors = []
      if (!input.subject) {
        errors.subject = "El campo no puede estar vacío";
      }
      if (input.subject.length > 0 && input.subject.length < 20 ) {
        errors.subject = "El campo debe tener un mínimo de 20 caracteres";
      }
      if (!input.detail) {
        errors.detail = "El campo no puede estar vacío";
      }
      if (input.detail.length > 0 && input.detail.length < 20 ) {
        errors.detail = "El campo debe tener un mínimo de 20 caracteres";
      }

      if (!errors.subject && !errors.detail) {
        setButton({ complete : true })
      }else{
        setButton({ complete: false })
      }

    return errors
  }

  return (
    <form onSubmit={(e) => handleSubmitNoFaq(e)} encType="multipart/form-data">
      <div className={style.card}>
        <div className={style.field}>
          <div className={style.fieldRow}>
            <label>Título</label>
            <span className={style.hint}>Mínimo 20 caracteres</span>
          </div>
          <input
            type="text"
            placeholder="Ingrese el título"
            name="subject"
            value={input.subject}
            onChange={(e) => handleChange(e)}
          />
          {error.subject ? <p className={style.fieldError}>{error.subject}</p> : null}
        </div>

        {desarrollos !== null && desarrollos.length > 0 ? (
          <div className={style.field}>
            <label>Desarrollo <span className={style.hint}>(opcional, si aplica a un desarrollo activo)</span></label>
            <select
              name="option"
              value={desarrolloInput.option}
              onChange={(e) => handleSelectDesarrollo(e)}
            >
              <option value={0}>Sin desarrollo</option>
              {desarrollos.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className={style.field}>
          <div className={style.fieldRow}>
            <label>Descripción</label>
            <span className={style.hint}>Mínimo 20 caracteres</span>
          </div>
          <textarea
            id="mi-textarea"
            placeholder="Contanos qué pasó, cuándo empezó y qué intentaste hacer..."
            name="detail"
            value={input.detail}
            onChange={(e) => handleChange(e)}
          />
          {error.detail ? <p className={style.fieldError}>{error.detail}</p> : null}
        </div>

        <div className={style.field}>
          <label>¿Deseas agregar algún archivo?</label>
          <div
            className={`${style.dropzone} ${dragOver ? style.dragOver : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className={style.ic}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </div>
            <div className={style.txt}>
              <strong>Arrastrá un archivo o hacé click para elegirlo</strong>
              <span>{input.files.length > 0 ? input.files.map((f) => f.name).join(", ") : "Ningún archivo seleccionado"}</span>
            </div>
            <input
              type="file"
              name="files"
              multiple
              onChange={(e) => handleChangeFile(e)}
            />
          </div>
        </div>

        <div className={style.actions}>
          <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={(e) => handleReset(e)}>
            Borrar
          </button>
          <button
            type="submit"
            className={`${style.btn} ${style.btnPrimary}`}
            disabled={!button.complete}
          >
            Generar Soporte
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormNormalV2;
