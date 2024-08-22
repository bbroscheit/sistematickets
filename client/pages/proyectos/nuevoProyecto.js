import React, { useState, useEffect } from "react";
import mainStyle from "@/styles/Home.module.css";
import Swal from "sweetalert2";
import Style from "@/modules/nuevoProyecto.module.css";
import Router from "next/router";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { postProject } from "../api/postProject";


function nuevoProyecto() {
  const [user, setUser] = useState(null);
  const [ allUser , setAllUser ] = useState(null)
  const [ altUser , setAltUser ] = useState(null)
  const [ login, setLogin ] = useState(null);
  const [ input, setInput ] = useState({
    state: "creado",
    projectname: "",
    projectdetail: "",
    requirer: "",
    worker: [],
    finishdate: "",
    files:[]
  });

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setLogin(loginParse);
    setInput({
      ...input,
      requirer: loginParse.name,
    });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
      .then((res) => res.json())
      .then((data) => {
        let userFiltered = data.filter((e) => e.isprojectworker === true);
        setUser(userFiltered);
        const allNames = data.map( e => `${e.username}`)
        setAllUser(allNames);
      });
  }, []);

  function handleCheck(e) {
    let nombre = e.target.name;
    if (e.target.checked) {
      setInput({
        ...input,
        worker: [...input.worker, nombre],
      });
    } else {
      setInput({
        ...input,
        worker: input.worker.filter((e) => e !== nombre),
      });
    }
  }

  const handleSelect = (e) => {
    e.stopPropagation();
    setInput({
      ...input,
      requirer: e.target.innerText,
    });
    setAltUser( e.target.innerText );
  };

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleTextarea(e) {
    setInput({
      ...input,
      projectdetail: e.target.value,
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

  function handleSubmit(e) {
    e.preventDefault();
    postProject(input)
    .then(res => {
        if (res.state === "success") {
          setInput({
            state: "creado",
            projectname: "",
            projectdetail: "",
            requirer: "",
            worker: [],
            finishdate: "",
          });
          Swal.fire(({
            icon: "success",
            title: "Tu proyecto fue generado con éxito!",
            showConfirmButton: false,
            timer: 1500
          }));
          setTimeout(() => {
            Router.push("/Dashboard");
          }, 1500);
        }
      })
      .catch(error => { console.error("Error al enviar el formulario:", error)});
    }

  function handleReset(e){
    e.preventDefault();
    setInput({
      state: "",
      projectname: "",
      projectdetail: "",
      requirer: "",
      worker: [],
      finishdate: "",
    });
  }

  console.log("user", altUser)
  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Nuevo Proyecto</h1>

      <div className={Style.labelContainerCreator}>
            <label >Elegir en caso de que sea solicitado por otro usuario</label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allUser}
              fullWidth
              renderInput={(params) => <TextField {...params}/>}
              onChange={(e) => handleSelect(e)}
              sx={{margin:"8px 10px"}}
            />
      </div>
      <form className={mainStyle.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={mainStyle.minimalGrid}>
          <label className={mainStyle.subtitle}>Nombre :</label>
          <input
            type="text"
            name="projectname"
            value={input.projectname}
            className={mainStyle.input}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={mainStyle.minimalGrid}>
          <label className={mainStyle.subtitle}>Detalles : </label>
          <textarea
            rows="10"
            value={input.projectdetail}
            onChange={(e) => handleTextarea(e)}
            className={mainStyle.textarea}
          />
        </div>
        <div className={Style.formContainer}>
          <div className={Style.labelContainer}>
            <label for="finishDate">Fecha de finalizacion</label>
            <input
              type="date"
              id="finishdate"
              name="finishdate"
              onChange={(e) => handleChange(e)}
              value={input.finishdate}
            />
          </div>
          <div className={Style.labelContainer}>
            <label> Elije Desarrollador </label>
            <div className={Style.checkContainer}>
            {user !== null &&
              user.map((e) => (
                <div >
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheck(e)}
                    value={input.worker}
                    name={e.username}
                  />
                  <label>{e.firstname}</label>
                </div>
              ))}</div>
          </div>
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
        <div className={mainStyle.buttonContainer}>
          <button className={mainStyle.button} type="submit">
            Crear
          </button>
          <button className={mainStyle.button} onClick={(e) => handleReset(e)}>
            Borrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default nuevoProyecto;
