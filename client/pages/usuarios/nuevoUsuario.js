import React, { useState, useEffect }from "react";
import { postUser } from '../api/postuser'
import mainStyles from "../../styles/Home.module.css";
import style from "@/modules/newUser.module.css";

function nuevoUsuario() {
  const [sector, setSector] = useState(null);
  const [salepoint, setSalepoint] = useState(null);
  const [input, setInput] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    isworker: "",
    isprojectmanager:"",
    isprojectworker:"",
    sectorname: "",
    salepoint: "",
  });
  const [error, setError] = useState("");
  const [button, setButton] = useState({
    complete: false,
  });

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`)
      .then((res) => res.json())
      .then((data) => {
        setSalepoint(data);
      });
  }, []);

  function validate(input){
    let errors = []
      if (!input.username) {
        errors.username = "El campo no puede estar vacío";
      }
      if (!input.password) {
        errors.password = "El campo no puede estar vacío";
      }
      if (!input.firstname) {
        errors.firstname = "El campo no puede estar vacío";
      }
      if (!input.lastname) {
        errors.lastname = "El campo no puede estar vacío";
      }
      if (!input.email) {
        errors.email = "El campo no puede estar vacío";
      }
      if (!input.phonenumber) {
        errors.phonenumber = "El campo no puede estar vacío";
      }
    return errors
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    setError(validate({
      ...input,
      [e.target.name] : e.target.value
    }))
  }

  function handleToggle(field, value) {
    setInput({
      ...input,
      [field]: value,
    })
  }

  function handleSelect(e){
    e.preventDefault();
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    let filterSector = salepoint.filter( t => t.salepoint === e.target.value )
    setSector(filterSector[0].sectors)
  }

  function handleReset(e) {
    e.preventDefault();
    setInput({
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      isworker: "",
      isprojectmanager:"",
      isprojectworker:"",
      sectorname: "",
      salepoint: "",
    })
    setError("")
  }

  function handleSubmit(e) {
    e.preventDefault();
    postUser(input)
    alert("usuario creado con exito")
    setInput({
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      isworker: "",
      isprojectmanager:"",
      isprojectworker:"",
      sectorname: "",
      salepoint: "",
    })
  }

  return (
    <div className={mainStyles.container}>
      <div className={style.pageWrap}>
        <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
          <div className={style.pageHead}>
            <h1 className={mainStyles.title}>Creación de Usuario</h1>
            <p>Completá los datos para dar de alta un nuevo usuario en el sistema.</p>
          </div>

          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>1</span>Cuenta</div>
            <div className={style.fieldRow}>
              <div className={style.field}>
                <label>Usuario</label>
                <input
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={e => handleChange(e)}
                />
                {error.username ? <p className={style.fieldError}>{error.username}</p> : null}
              </div>
              <div className={style.field}>
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>2</span>Datos personales</div>
            <div className={style.fieldRow}>
              <div className={style.field}>
                <label>Nombre</label>
                <input
                  type="text"
                  name="firstname"
                  value={input.firstname}
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className={style.field}>
                <label>Apellido</label>
                <input
                  type="text"
                  name="lastname"
                  value={input.lastname}
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
            <div className={style.fieldRow}>
              <div className={style.field}>
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={e => handleChange(e)}
                />
              </div>
              <div className={style.field}>
                <label>Interno</label>
                <input
                  type="text"
                  name="phonenumber"
                  value={input.phonenumber}
                  onChange={e => handleChange(e)}
                />
              </div>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>3</span>Permisos</div>
            <div className={style.permisosRow}>
              <div className={style.toggleGroup}>
                <label>¿Soporte?</label>
                <div className={style.togglePair}>
                  <button type="button" className={input.isworker === "yes" ? style.selectedYes : ""} onClick={() => handleToggle("isworker", "yes")}>Sí</button>
                  <button type="button" className={input.isworker === "no" ? style.selectedNo : ""} onClick={() => handleToggle("isworker", "no")}>No</button>
                </div>
              </div>
              <div className={style.toggleGroup}>
                <label>¿Proyectos?</label>
                <div className={style.togglePair}>
                  <button type="button" className={input.isprojectmanager === "yes" ? style.selectedYes : ""} onClick={() => handleToggle("isprojectmanager", "yes")}>Sí</button>
                  <button type="button" className={input.isprojectmanager === "no" ? style.selectedNo : ""} onClick={() => handleToggle("isprojectmanager", "no")}>No</button>
                </div>
              </div>
              <div className={style.toggleGroup}>
                <label>¿Desarrollador?</label>
                <div className={style.togglePair}>
                  <button type="button" className={input.isprojectworker === "yes" ? style.selectedYes : ""} onClick={() => handleToggle("isprojectworker", "yes")}>Sí</button>
                  <button type="button" className={input.isprojectworker === "no" ? style.selectedNo : ""} onClick={() => handleToggle("isprojectworker", "no")}>No</button>
                </div>
              </div>
            </div>
          </div>

          <div className={style.card}>
            <div className={style.cardTitle}><span className={style.n}>4</span>Ubicación y sector</div>
            <div className={style.fieldRow}>
              <div className={style.field}>
                <label>Localidad</label>
                <select value={input.salepoint} name="salepoint" onChange={e => handleSelect(e)}>
                  <option value="">Elija una opción</option>
                  {salepoint &&
                    salepoint.map((e) => (
                      <option value={e.salepoint} key={e.id}>{e.salepoint}</option>
                    ))}
                </select>
              </div>
              <div className={style.field}>
                <label>Sector</label>
                <select value={input.sectorname} name="sectorname" onChange={e => handleChange(e)}>
                  <option value="">Elija una opción</option>
                  {sector &&
                    sector.map((e) => (
                      <option value={e.sector} key={e.id}>{e.sectorname}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className={style.actions}>
            <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={handleReset}>Limpiar</button>
            <button type="submit" className={`${style.btn} ${style.btnPrimary}`}>Crear usuario</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default nuevoUsuario;
