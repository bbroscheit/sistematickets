import React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2'
import Router from "next/router";
import styles from '@/modules/formFaq.module.css'
import styleDetail from '@/modules/detail.module.css'
import mainStyle from "@/styles/Home.module.css";
import { postTicketFormData } from "@/pages/api/postTicketFormData.js";
import { sendEmailNewTicket } from "@/pages/api/sendEmailNewTIcket";
import { updateFaq } from "@/pages/api/updateFaq.js";



// estilos del modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};


function FormFaq({ id, title, description, answer, uresolved, user, useremail }) {
  const [option, setOption] = useState(false); // abre la opcion para agregar mas detalles al soporte
  const [open, setOpen] = useState(false); //estado para saber si el modal esta abierto o cerrado
  const [user, setUser] = useState(null);
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
    setUser(loginParse);
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
  
  function handleChangeFile(e) {
    e.preventDefault();
    const filesArray = [...e.target.files];  // Convierte la colección de archivos en un array
    setInput({
      ...input,
      files: filesArray,
    });
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
        user.sector === "Supervisor" ? Router.push("/TicketsSupervisor") 
          : sector.includes("Jefatura") ? Router.push("/TicketsSupervisorSector")
          : sector.includes("Jefe") ? Router.push("/TicketSupervisorGeneral") 
          : Router.push("/Tickets"); 
        
      }, 1500);
    }
  })
  .catch(error => {
    console.error("Error al enviar el formulario:", error);
  });    
    
  }

  return (
    <>
    <form className={mainStyle.interform} encType="multipart/form-data" onSubmit={ e => handleSubmit(e)}>
      {uresolved === true ? (
        <div className={mainStyle.labelWithTextarea}>
          { option === false ? (
            <>
              <h3 className={mainStyle.subtitle}>Descripción : </h3>
              <textarea readOnly value={input.detail} />
              <h3 className={mainStyle.subtitle}>
                Prueba los siguientes pasos :
              </h3>
              <textarea
                readOnly
                value={input.answer}
                onChange={(e) => handleTextarea(e)}
              />

              <h3 className={ mainStyle.subtitleAnswer}>¿ Pudiste resolver tu problema ?</h3>
              <div className={mainStyle.buttonContainerAnswer}>
                <button
                  className={mainStyle.button}
                  onClick={(e) => {
                    handleAccept(e); // Cambia el estado a "terminado"
                    handleOpen(e); // Abre el modal
                }}
                >
                  Si
                </button>
                
                <button
                  className={mainStyle.button}
                  onClick={ (e) => handleOption(e)}
                >
                  No
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className={mainStyle.subtitle}>Agrega mas detalles : </h3>
              <textarea
                rows="10"
                value={input.detail}
                onChange={(e) => handleTextarea(e)}
                style={{
                  minHeight: '120px',
                  resize: 'none',
                  overflowY: 'hidden'
                }}
                className={styleDetail.modalTextarea}
              />
              
              <div className={styles.buttonContainerNormal}>
              <div className={mainStyle.buttonContainer}>
                <button className={mainStyle.button} type="submit">
                  Generar Soporte
                </button>
                <button
                  className={mainStyle.button}
                  onClick={(e) => handleReset(e)}
                >
                  Borrar
                </button>
              </div>
              </div>
              <div className={styles.buttonContainerMobile}>
              <div className={mainStyle.buttonContainer}>
                <button className={mainStyle.button} type="submit">
                  Generar
                </button>
                <button
                  className={mainStyle.button}
                  onClick={(e) => handleReset(e)}
                >
                  Borrar
                </button>
              </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {option === false ? (
            <div className={mainStyle.labelWithTextarea}>
              <h3 className={mainStyle.subtitle}>Detalle : </h3>
              <textarea
                readOnly
                value={input.detail}
                style={{
                  minHeight: '120px',
                  resize: 'none',
                  overflowY: 'hidden'
                }}              />
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
              
              <div className={mainStyle.buttonContainer}>
                <button className={mainStyle.button} onClick={(e) => handleSubmit(e)}>
                  Cargar Soporte
                </button>
                <button
                  className={mainStyle.button}
                  onClick={e => handleOption(e)}
                >
                  Agregar mas datos
                </button>
              </div>
            </div>
          ) : (
            <div className={mainStyle.labelWithTextarea}>
              <h3 className={mainStyle.subtitle}>Agrega mas datos : </h3>
              <textarea
                id="mi-textarea"
                value={input.detail}
                onChange={(e) => handleTextarea(e)}
                style={{
                  minHeight: '120px',
                  resize: 'none',
                  overflowY: 'hidden'
                }}
                className={styleDetail.modalTextarea}
              />
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
              <div className={mainStyle.buttonContainer}>
                
                <button className={mainStyle.button} onClick={(e) => handleSubmit(e)}>
                  Crear
                </button>

                <button className={mainStyle.button}  onClick={(e) => handleReset(e)}>
                  Borrar
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </form>
    
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿ Deseas cerrar el Soporte ?
          </Typography>
            <div className={mainStyle.buttonModalContainer}>
                <button className={mainStyle.button} onClick={(e) => handleSubmit(e)}>
                  Si
                </button>
                <button
                  className={mainStyle.button}
                  onClick={(e) => handleReset(e)}
                >
                  No
                </button>
            </div>
        </Box>
    </Modal>
    </>
  );
}

export default FormFaq;
