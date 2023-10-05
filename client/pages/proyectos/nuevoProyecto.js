import React, { useState, useEffect } from "react";
import mainStyle from "@/styles/Home.module.css";
import Style from "@/modules/nuevoProyecto.module.css";
import Router from "next/router";
import { postProject } from "../api/postProject";


function nuevoProyecto() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  const [input, setInput] = useState({
    state: "creado",
    projectname: "",
    projectdetail: "",
    requirer: "",
    worker: [],
    finishdate: "",
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
    fetch("http://localhost:3001/user")
      .then((res) => res.json())
      .then((data) => {
        let userFiltered = data.filter((e) => e.isprojectworker === true);
        setUser(userFiltered);
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

  function handleSubmit(e) {
    e.preventDefault();
    postProject(input);
    alert("proyecto creado exitosamente");
    setInput({
      state: "",
      projectname: "",
      projectdetail: "",
      requirer: "",
      worker: [],
      finishdate: "",
    });

    setTimeout(() => {
      Router.push("/dashboard");
    }, 400);
    // console.log(input)
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

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Nuevo Proyecto</h1>
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
