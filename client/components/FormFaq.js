import React from 'react'
import { useState, useEffect } from 'react';
import Router from "next/router";
import mainStyle from '@/styles/Home.module.css'
import { postTicket } from "@/pages/api/postTicket.js";


function FormFaq({ id, title, description, answer , uresolved, user }) {
    
    const [ option, setOption ] = useState({ state: false });
    const [ input, setInput ] = useState({
        state: "sin asignar",
        worker: user,
        subject: title,
        detail: description,
        answer: answer,
        userresolved: uresolved,
      });
    
    //crea un pre input con los datos que vienen del faq que se selecciono
    useEffect( () => {
        setInput({
            state: "sin asignar",
            worker: user,
            subject: title,
            detail: description,
            answer: answer,
            userresolved: uresolved,
        });
        setOption({
            state:false
        })
    },[id])

    //cambia el estado de options para que aparezca la pantalla de agregar ams datos
    function handleOption(e) {
        e.preventDefault();
        setOption({
          state: true,
        });
      }

    //añade al detail que viene por props los detalles que se le agrega por formulario
    function handleTextarea(e){
        setInput({
            ...input,
            detail : e.target.value
        })
    }

    //solo cambia el stado del soporte a terminado antes que se haga el submit
    function handleAccept(e){
        setInput({
            ...input,
            state : "terminado"
        })
    }
      
      function handleReset(e) {
        e.preventDefault();
        setOption({
          state: false,
        });
      }
      
      //envia el input al back, genera un alert que luego lo cambiare por un sweet alert que es mas lindo y te redirige al home
      function handleSubmit(e) {
        e.preventDefault();
        postTicket(input);
        alert("ticket generado con exito");
    
        setTimeout(() => {
          Router.push("/tickets");
        }, 400);
      }

  return (
    <form className={mainStyle.interform} onSubmit={(e) => handleSubmit(e)}>
    { uresolved === true  ? 
        (<div className={mainStyle.labelWithTextarea}>
            {
                option.state === false ? 
                    (<>
                        <h3 className={mainStyle.subtitle}>Prueba los siguientes pasos : </h3>
                        <textarea readOnly rows="10" value={input.answer} onChange={e => handleTextarea(e)}/>
                        
                        <h3 className={mainStyle.subtitle}>Pudiste Resolverlo ? : </h3>
                        <div className={mainStyle.buttonContainer}>
                            <button className={mainStyle.button} onClick={e => handleAccept(e)} type="submit"> Si </button>
                            <button className={mainStyle.button} onClick={ e => handleOption(e) }> No </button>
                        </div>
                    </>) : 
                    (<>
                        <h3 className={mainStyle.subtitle}>Agrega mas detalles  : </h3>
                        <textarea rows="10" value={input.detail} onChange={e => handleTextarea(e)} />
                        <div className={mainStyle.buttonContainer}>
                            <button className={mainStyle.button} type="submit">Generar Soporte </button>
                            <button className={mainStyle.button} onClick={ e => handleOption(e) }> Borrar </button>
                        </div>
                    </>)
            }
             
        </div>)
        : (<>
            { option.state === false ? 
                (<div className={mainStyle.labelWithTextarea}>
                    <h3 className={mainStyle.subtitle}>Detalle : </h3>
                    <textarea  value={input.detail} onChange={e => handleTextarea(e)} rows="10" />
                    <div className={mainStyle.buttonContainer}>
                        <button className={mainStyle.button} type="submit"> Cargar Soporte </button>
                        <button className={mainStyle.button} onClick={ e => handleOption(e) }> Agregar mas datos </button>
                    </div>
                </div>) : 
                (<div className={mainStyle.labelWithTextarea}>
                    <h3 className={mainStyle.subtitle}>Agrega mas datos : </h3>
                    <textarea  value={input.detail} onChange={e => handleTextarea(e)} rows="10" />
                    <div className={mainStyle.buttonContainer}>
                        <button className={mainStyle.button} type="submit"> Cargar Soporte </button>
                        <button className={mainStyle.button} onClick={ e => handleReset(e) }> Borrar </button>
                    </div>
                </div>)
            }</>)
        }
   </form>
  )
}

export default FormFaq