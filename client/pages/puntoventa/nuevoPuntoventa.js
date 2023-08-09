import React, { useState } from "react";
import mainStyle from "../../styles/Home.module.css";
import style from "@/modules/newSalepoint.module.css";
import { postSalepoint } from "../api/postSalepoint";

function nuevoSector() {
  const [input, setInput] = useState({
    salepoint : ""
  })
  const [error, setError] = useState("")
  const [button, setButton] = useState({
    complete: false
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })

    setError( 
      validate({
        ...input,
        [e.target.name] : e.target.value
      })
    )
  }

  function handleReset(e){
    e.preventDefault()
    setInput({
      salepoint : ""
    })
  }

  function validate(input){
    let error = []
    if(!input.salepoint){
      error.salepoint = " El campo no puede quedar vacío "
    }
    if(!error.salepoint){
      setButton({
        complete:true
      })
    }else{
      setButton({
        complete:false
      })
    }
    return error 
  }

  function handleSubmit(e){
    e.preventDefault()
    postSalepoint(input)
    alert("punto de venta creado con exito")
    setInput({salepoint:""})
  }



  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Creación de Unidad de Negocio</h1>
      <form className={mainStyle.form} onSubmit={e => handleSubmit(e)}>
        <div className={mainStyle.minimalGrid}>
          <h3 className={mainStyle.subtitle}>Nombre :</h3>
          <input
            type="text"
            name="salepoint"
            value={input.salepoint}
            className={mainStyle.input}
            onChange={ e => handleChange(e)}
          />
        </div>
        <p
          className={
            error.salepoint ? `${mainStyle.danger}` : `${mainStyle.normal}`
          }
        >
          {error.salepoint}
        </p>
        <div className={style.buttonContainer}>
        {button.complete === false ? (
            <button
              type="submit"
              disabled
              className={mainStyle.buttonDisabled}
            >
              Crear
            </button>
          ) : (
            <button type="submit" className={mainStyle.button}>
              Crear
            </button>
          )}
          <button className={mainStyle.button} onClick={e => handleReset(e)}>Limpiar</button>
        </div>
      </form>
    </div>
  );
}

export default nuevoSector;
