import React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Router from "next/router";
import mainStyle from "@/styles/Home.module.css";
import { postTicket } from "@/pages/api/postTicket.js";
import { updateFaq } from "@/pages/api/updateFaq.js";


<<<<<<< HEAD
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function FormFaq({ id, title, description, answer, uresolved, user }) {
  const [option, setOption] = useState(false); // abre la opcion para agregar mas detalles al soporte
  const [open, setOpen] = useState(false); //estado para saber si el modal esta abierto o cerrado
  const [input, setInput] = useState({
    state: "sin asignar",
    worker: "sin asignar",
    subject: title,
    detail: description,
    answer: answer,
    userresolved: uresolved,
    user: user,
  });
  const [updatedFaq, setUpdateFaq] = useState({
    id : id,
    userQuestioner: user
  })

    function handleOpen(e) {
=======
function FormFaq({ id, title, description, answer , uresolved, user }) {
    
    const [ option, setOption ] = useState({ state: false });
    const [ input, setInput ] = useState({
        state: "sin asignar",
        worker: "sin asignar",
        subject: title,
        detail: description,
        answer: answer,
        userresolved: uresolved,
        user: user.name
      });
    
    //cambia el estado de options para que aparezca la pantalla de agregar ams datos
    function handleOption(e) {
>>>>>>> 6ca68fe5e624c8acd0b13a6e750ec3822d9404da
        e.preventDefault();
        setOpen(true)
    } ;

    const handleClose = () => setOpen(false);
  
   //cambia el estado de options para que aparezca la pantalla de agregar ams datos
   
   function handleOption(e) {
        e.preventDefault();
        setOption(true)
    } ;

  //cambia el estado de opstion para que no aparezca en la pantalla la parte de agregar mas datos
  const handleReset = () => setOption(false);

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
      state: "terminado",
    });
  }



  //envia el input al back, genera un alert que luego lo cambiare por un sweet alert que es mas lindo y te redirige al home
  function handleSubmit(e) {
    e.preventDefault();
    postTicket(input);
    updateFaq( updatedFaq )
    alert("ticket generado con exito");

    setTimeout(() => {
      Router.push("/tickets");
    }, 400);
  }

  return (
    <>
    <form className={mainStyle.interform} >
      {uresolved === true ? (
        <div className={mainStyle.labelWithTextarea}>
          {option === false ? (
            <>
              <h3 className={mainStyle.subtitle}>Descripción : </h3>
              <textarea readOnly rows="10" value={input.detail} />
              <h3 className={mainStyle.subtitle}>
                Prueba los siguientes pasos :
              </h3>
              <textarea
                readOnly
                rows="10"
                value={input.answer}
                onChange={(e) => handleTextarea(e)}
              />

              <h3 className={mainStyle.subtitle}>Pudiste Resolverlo ? : </h3>
              <div className={mainStyle.buttonContainer}>
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
              />
              <div className={mainStyle.buttonContainer}>
                <button className={mainStyle.button} type="submit">
                  Generar Soporte
                </button>
                <button
                  className={mainStyle.button}
                  onClick={handleReset}
                >
                  Borrar
                </button>
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
                onChange={(e) => handleTextarea(e)}
                rows="10"
              />
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
                value={input.detail}
                onChange={(e) => handleTextarea(e)}
                rows="10"
              />
              <div className={mainStyle.buttonContainer}>
                
                <button className={mainStyle.button} onClick={(e) => handleSubmit(e)}>
                  Cargar Soporte
                </button>

                <button className={mainStyle.button}  onClick={handleReset}>
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
            <div className={mainStyle.buttonContainer}>
                <button className={mainStyle.button} onClick={(e) => handleSubmit(e)}>
                  Si
                </button>
                <button
                  className={mainStyle.button}
                  onClick={handleReset}
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
