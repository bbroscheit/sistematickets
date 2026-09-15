import React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2'
import Router from "next/router";
import style from '@/modules/formFaqV2.module.css'
import { postTicketFormData } from "@/pages/api/postTicketFormData.js";
import { sendEmailNewTicket } from "@/pages/api/sendEmailNewTIcket";
import { updateFaq } from "@/pages/api/updateFaq.js";


function FormFaqV2({ id, title, description, answer, uresolved, user, useremail }) {
  const [option, setOption] = useState(false); // abre la opcion para agregar mas detalles al soporte
  const [open, setOpen] = useState(false); //estado para saber si el modal esta abierto o cerrado
  const [dragOver, setDragOver] = useState(false);
  const [user2, setUser2] = useState(null);
  const [input, setInput] = useState({
    state: "sin asignar",
    worker: "sin asignar",
    subject: title,
    detail: description,
    files:[],
    answer: answer,
    userresolved: uresolved,
    user: user,
    email:""
  });
  const [updatedFaq, setUpdateFaq] = useState({
    id : id,
    userQuestioner: user
  })


  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser2(loginParse);
  }, []);


  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setInput({
      ...input,
      email: loginParse.email
    })
  }, []);

  // agranda el textarea de acuerdo al texto ingresado
  useEffect(() => {

      const textarea = document.getElementById('mi-textarea');
      if (textarea) {
        textarea.style.height = 'auto'; // Restablece la altura a automática
        textarea.style.height = textarea.scrollHeight + 'px'; // Establece la altura según el contenido
      }

  }, [input.detail]);

    function handleOpen(e) {
        e.preventDefault();
        setOpen(true)
    } ;

  const handleClose = () => {
    setOpen(false)
  }

  function handleCancelClose(e) {
    e.preventDefault();
    // el usuario dijo que sí lo pudo resolver y se arrepintió al ver la confirmación:
    // volvemos el estado del ticket a como estaba antes de aceptar, para no dejarlo
    // marcado como "Terminado" sin haberse enviado
    setInput({
      ...input,
      state: "sin asignar",
    });
    setOpen(false);
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

   //cambia el estado de options para que aparezca la pantalla de agregar ams datos

   function handleOption(e) {
        e.preventDefault();
        setOption(true)
    } ;

  //cambia el estado de opstion para que no aparezca en la pantalla la parte de agregar mas datos
  function handleReset(e) {
    e.preventDefault();
    setOption(false)
  } ;


  //añade al detail que viene por props los detalles que se le agrega por formulario
  function handleTextarea(e) {
    setInput({
      ...input,
      detail: e.target.value,
    });
  }

  //solo cambia el stado del soporte a terminado antes que se haga el submit
  function handleAccept(e) {
    e.preventDefault();
    setInput({
      ...input,
      state: "Terminado",
    });
  }



  //envia el input al back, genera un alert que luego lo cambiare por un sweet alert que es mas lindo y te redirige al home
  function handleSubmit(e) {
    e.preventDefault();
    postTicketFormData(input)
      .then(res => {

      if (res.state === "success") {
      updateFaq( updatedFaq )
      sendEmailNewTicket(input)
      Swal.fire(({
        icon: "success",
        title: "Tu soporte fue generado con éxito!",
        showConfirmButton: false,
        timer: 1500
      }));
      setTimeout(() => {
        user2.sector === "Supervisor" ? Router.push("/TicketsSupervisor")
          : user2.sector.includes("Jefatura") ? Router.push("/TicketsSupervisorSector")
          : user2.sector.includes("Jefe") ? Router.push("/TicketSupervisorGeneral")
          : Router.push("/TicketsV2");

      }, 1500);
    }
  })
  .catch(error => {
    console.error("Error al enviar el formulario:", error);
  });

  }

  const dropzone = (
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
        <input type="file" name="files" multiple onChange={(e) => handleChangeFile(e)} />
      </div>
    </div>
  );

  return (
    <>
    <form encType="multipart/form-data" onSubmit={ e => handleSubmit(e)}>
      <div className={style.card}>
      {uresolved === true ? (
        option === false ? (
          <>
            <div className={style.block}>
              <label>Descripción</label>
              <div className={style.readtext}>{input.detail}</div>
            </div>

            <div className={style.solution}>
              <div className={style.lbl}>
                <span className={style.ic}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"></path></svg>
                </span>
                Probá estos pasos
              </div>
              <div className={style.steps}>{input.answer}</div>
            </div>

            <div className={style.ask}>
              <h3>¿Pudiste resolver tu problema?</h3>
              <div className={style.answerPair}>
                <button
                  type="button"
                  className={style.btnYes}
                  onClick={(e) => {
                    handleAccept(e); // Cambia el estado a "terminado"
                    handleOpen(e); // Abre el modal
                }}
                >
                  Sí, gracias
                </button>

                <button
                  type="button"
                  className={style.btnNo}
                  onClick={ (e) => handleOption(e)}
                >
                  No, necesito ayuda
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={style.field}>
              <label>Agregá más detalles</label>
              <textarea
                id="mi-textarea"
                value={input.detail}
                onChange={(e) => handleTextarea(e)}
              />
            </div>

            {dropzone}

            <div className={style.actions}>
              <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={(e) => handleReset(e)}>
                Borrar
              </button>
              <button type="submit" className={`${style.btn} ${style.btnPrimary}`}>
                Generar Soporte
              </button>
            </div>
          </>
        )
      ) : (
        option === false ? (
          <>
            <div className={style.block}>
              <label>Detalle</label>
              <div className={style.readtext}>{input.detail}</div>
            </div>

            {dropzone}

            <div className={style.actions}>
              <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={(e) => handleOption(e)}>
                Agregar más datos
              </button>
              <button type="submit" className={`${style.btn} ${style.btnPrimary}`}>
                Cargar Soporte
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={style.field}>
              <label>Agregá más datos</label>
              <textarea
                id="mi-textarea"
                value={input.detail}
                onChange={(e) => handleTextarea(e)}
              />
            </div>

            {dropzone}

            <div className={style.actions}>
              <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={(e) => handleReset(e)}>
                Borrar
              </button>
              <button type="submit" className={`${style.btn} ${style.btnPrimary}`}>
                Crear
              </button>
            </div>
          </>
        )
      )}
      </div>
    </form>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.modalBox}>
          <div className={style.ic}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 id="modal-modal-title">¿Deseas cerrar el soporte?</h2>
          <p>Vas a marcar esta consulta como resuelta. Si más adelante volvés a tener el mismo problema, podés generar un nuevo soporte.</p>
          <div className={style.modalActions}>
            <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={(e) => handleCancelClose(e)}>
              No, cancelar
            </button>
            <button type="button" className={`${style.btn} ${style.btnPrimary}`} onClick={(e) => handleSubmit(e)}>
              Sí, cerrar
            </button>
          </div>
        </Box>
    </Modal>
    </>
  );
}

export default FormFaqV2;
