import React, { useState, useEffect } from "react";
import mainStyle from "../../styles/Home.module.css";
import style from "@/modules/newSector.module.css";
import { postSector } from "../api/postSector";

function nuevoSector() {
   
  const [salepoint, setSalepoint] = useState(null);
  const [input, setInput] = useState({
    sectorName: "",
    salepoint: "",
  });
  const [error, setError] = useState("");
  const [button, setButton] = useState({
    complete : false
  })

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`)
      .then((res) => res.json())
      .then((data) => {
        setSalepoint(data);
      });
  }, []);

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
      salepoint:"",
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
        <div className={mainStyle.minimalGrid}>
        <h3 className={mainStyle.subtitle}>Localidad</h3>
          <select className={mainStyle.select} value={input.salepoint} name="salepoint" onChange={e => handleChange(e)}>
            <option className={mainStyle.option} value="">Elija una Opción</option>
            {salepoint &&
              salepoint.map((e) => (
                <option className={mainStyle.option} value={e.salepoint} key={e.id}>{e.salepoint}</option>
              ))}
          </select>
        </div>
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
