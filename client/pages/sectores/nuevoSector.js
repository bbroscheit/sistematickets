import React, { useState } from "react";
import mainStyle from "../../styles/Home.module.css";
import style from "@/modules/newSector.module.css";
import { postSector } from "../api/postSector";

function nuevoSector() {
  const [input, setInput] = useState({
    sectorName: "",
  });
  const [error, setError] = useState("");
  const [button, setButton] = useState({
    complete : false
  })

  function validate(input) {
    let error = [];
    if (!input.sectorName) {
      error.sector = "El campo no puede estar vacío";
    }
    if(!error.sector){
      setButton({
        complete:true
      })
    }else{
      setButton({
        complete:false
      })
    }
    return error;
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleReset(e) {
    e.preventDefault();
    setInput({
      sectorName: "",
    });
    setButton({complete:false})
    
  }

  function handleSubmit(e) {
    e.preventDefault();
    postSector(input);
    alert("sector creado");
    setInput({
      sectorName: "",
    });
    setButton({complete:false})
  }

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Creación de Sector</h1>
      <form className={mainStyle.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={mainStyle.minimalGrid}>
          <h3 className={mainStyle.subtitle}>Nuevo Sector :</h3>
          <input
            type="text"
            name="sectorName"
            value={input.sectorName}
            className={mainStyle.input}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <p
          className={
            error.sector ? `${mainStyle.danger}` : `${mainStyle.normal}`
          }
        >
          {error.sector}
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
          <button className={mainStyle.button} onClick={(e) => handleReset(e)}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default nuevoSector;
