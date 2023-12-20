import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../modules/detail.module.css";
import mainStyles from "@/styles/Home.module.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { updateWorker } from "../api/updateWorker";
import { updateSolutionTicket } from "../api/updateSolutionTicket";
import { postFaq } from "../api/postFaq";
import { updateInfoTicket } from "../api/updateInfoTicket";
import { updateInfoTicketByUser } from "../api/updateInfoTicketByUser";
import { updateCloseTicket } from "../api/updateCloseTicket";
import { deleteUser } from "../api/deleteUser";
import { updateUser } from "../api/updateUser";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function Soporte() {
  const router = useRouter();
  const id = router.query.id;

//   const [openSolution, setOpenSolution] = useState(false);
//   const [openInfo, setOpenInfo] = useState(false);
  const [openChange, setOpenChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [sector, setSector] = useState(null);
  const [salepoint, setSalepoint] = useState(null);
  const [modify, setModify] = useState(false);
//   const [asignar, setAsignar] = useState({ name: "sin asignar" });
//   const [control, setControl] = useState(0);
//   const [faq, setFaq] = useState(null);
//   const [solution, setSolution] = useState({ solution: "" });
//   const [info, setInfo] = useState({ info: "" });
//   const [yesState, setYesState] = useState(0);
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

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/userDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setInput({
          username: data.username,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phonenumber: data.phonenumber,
          isworker: data.isworker,
          isprojectmanager:data.isprojectmanager,
          isprojectworker: data.isprojectworker,
          sectorname: data.sectorname,
          salepoint: data.salepoint.salepoint,
        })
        });
  }, [router.query.id]);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`)
      .then((res) => res.json())
      .then((data) => {
        setSalepoint(data);
      });
  }, []);

  function handleSelect(e){
    e.preventDefault();
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    let filterSector = salepoint.filter( t => t.salepoint === e.target.value )
    setSector(filterSector[0].sectors)
  }

  function handleModify(e){
    e.preventDefault()
    setModify(true)
  }

  function handleModifyReset(e){
    e.preventDefault()
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/userDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setInput({
          username: data.username,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          phonenumber: data.phonenumber,
          isworker: data.isworker,
          isprojectmanager:data.isprojectmanager,
          isprojectworker: data.isprojectworker,
          sectorname: data.sectorname,
          salepoint: data.salepoint.salepoint,
        })
        });
    setModify(false)
  }

  function handleUserDelete(e){
    e.preventDefault()
    deleteUser(id)
    setTimeout(() => {
      router.push("/usuarios");
    }, 300);
  }
//   useEffect(() => {
//     fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
//       .then((res) => res.json())
//       .then((data) => {
//         setWorker(data);
//       });
//   }, [router.query.id]);

//   useEffect(() => {
//     fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`)
//       .then((res) => res.json())
//       .then((data) => {
//         setFaq(data);
//       });
//   }, [router.query.id]);

//   useEffect(() => {
//     let userLogin = localStorage.getItem("user");
//     let loginParse = JSON.parse(userLogin);
//     setUser(loginParse);
//   }, []);

  // abre y cierra el modal del borrado del usuario
  function handleOpen(e) {
    e.preventDefault();
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
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

  function handleSelect(e){
    e.preventDefault();
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    let filterSector = salepoint.filter( t => t.salepoint === e.target.value )
    setSector(filterSector[0].sectors)
  }

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

  function submitChange(e){
    e.preventDefault();
    updateUser(id, input)
    setModify(false)
  }
//   // asigna un worker al soporte
//   function handleAsignar(e) {
//     e.preventDefault();
//     setAsignar({
//       name: e.target.value,
//     });
//   }

//   //guarda en el soporte la asignacion del desarrollador
//   function submitAsignar(e) {
//     e.preventDefault();
//     updateWorker(id, asignar);
//     window.location.reload(true);
//   }

  // las siguientes 2 funciones abren y cierran el modal de la solucion

  function handleOpenChange(e) {
    e.preventDefault();
    setOpenChange(true);
  }

  function handleCloseChange(e) {
    e.preventDefault();
    setOpenChange(false);
  }

//   function handleChangeSolution(e) {
//     setSolution({
//       ...solution,
//       [e.target.name]: e.target.value,
//     });
//     setInputFaq({
//       ...inputFaq,
//       answer: e.target.value,
//     });
//   }

//   // dentro del modal de la solucion permite decir si el usuario puede resolverlo o no
//   function handleClickUresolvedYes(e) {
//     e.preventDefault();
//     setYesState(true);
//     setInputFaq({
//       ...inputFaq,
//       uresolved: true,
//     });
//   }

//   function handleClickUresolvedNo(e) {
//     e.preventDefault();
//     setYesState(false);
//     setInputFaq({
//       ...inputFaq,
//       uresolved: false,
//     });
//   }

//   function submitSolution(e) {
//     e.preventDefault();
//     updateSolutionTicket(soporte.id, solution);
//     postFaq(inputFaq);

//     setTimeout(() => {
//       router.push("/tickets");
//     }, 300);
//   }

//   // las siguientes 2 funciones abren y cierran el modal del pedido de mas informacion

//   function handleOpenInfo(e) {
//     e.preventDefault();
//     setOpenInfo(true);
//   }

//   function handleCloseInfo() {
//     control === 0 ? setControl(1) : setControl(0);
//     setOpenInfo(false);
//   }

//   function handleChangeInfo(e) {
//     setInfo({
//       ...info,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function submitInfo(e) {
//     e.preventDefault();
//     updateInfoTicket(soporte.id, info);

//     setTimeout(() => {
//       router.push("/tickets");
//     }, 300);
//   }

//   // las siguientes 2 funciones abren y cierran el modal del pedido de mas informacion

//   function handleOpenInfoUser(e) {
//     e.preventDefault();
//     setOpenInfoUser(true);
//   }

//   function handleCloseInfoUser() {
//     control === 0 ? setControl(1) : setControl(0);
//     setOpenInfoUser(false);
//   }

//   function handleChangeInfo(e) {
//     setInfo({
//       ...info,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function submitInfoUser(e) {
//     e.preventDefault();
//     updateInfoTicketByUser(soporte.id, info);

//     setTimeout(() => {
//       router.push("/tickets");
//     }, 300);
//   }

//   // funcion para pasar el estado del ticket a Terminado

//   function SubmitCloseTicket(e) {
//     e.preventDefault();
//     updateCloseTicket(soporte.id);

//     setTimeout(() => {
//       router.push("/tickets");
//     }, 300);
//   }

//   // console.log("soporte", soporte)
//   // console.log("faq", faq)
  console.log("id id", id)
  console.log("user", user)
//   // console.log("asignar", asignar)
//   // console.log("control", control)
//   // console.log("solution", solution)

  return (
    <>
      <div className={mainStyles.container}>
        <h1 className={mainStyles.title}>Usuario</h1>
        <form className={mainStyles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={mainStyles.minimalGrid}>
          <h3 className={mainStyles.subtitle}>Usuario</h3>
          <input
            type="text"
            name="username"
            value={input.username}
            className={mainStyles.input}
            onChange={e => handleChange(e)}
            disabled= {modify === false ? true : false}
          />
        </div>
        <p
          className={
            error.username ? `${mainStyles.danger}` : `${mainStyles.normal}`
          }
        >
          {error.username}
        </p>
        <div className={mainStyles.minimalGrid}>
          <h3 className={mainStyles.subtitle}>Password </h3>
          <input
            type="password"
            name="password"
            value={input.password}
            className={mainStyles.input}
            onChange={e => handleChange(e)}
            disabled= {modify === false ? true : false}
          />
          <h3 className={mainStyles.subtitle}>Nombre</h3>
          <input
            type="text"
            name="firstname"
            value={input.firstname}
            className={mainStyles.input}
            onChange={e => handleChange(e)}
            disabled= {modify === false ? true : false}
          />
          <h3 className={mainStyles.subtitle}>Apellido</h3>
          <input
            type="text"
            name="lastname"
            value={input.lastname}
            className={mainStyles.input}
            onChange={e => handleChange(e)}
            disabled= {modify === false ? true : false}
          />
          <h3 className={mainStyles.subtitle}>E-mail</h3>
          <input
            type="email"
            name="email"
            value={input.email}
            className={mainStyles.input}
            onChange={e => handleChange(e)}
            disabled= {modify === false ? true : false}
          />
        </div>
        
          <div className={mainStyles.minimalGrid}>
            <h3 className={mainStyles.subtitle}>Interno</h3>
            <input type="text" name="phonenumber" value={input.phonenumber} onChange={e => handleChange(e)} disabled= {modify === false ? true : false}/>
          </div>
        <div className={mainStyles.minimalFlex}>  
          <div className={mainStyles.minimalGrid}>
            <h3 className={mainStyles.subtitle} >Soporte ?</h3>
            <select value={input.isworker} name="isworker" onChange={e => handleChange(e)} className={mainStyles.select} disabled= {modify === false ? true : false}>
              <option className={mainStyles.option}>Elija una opción</option>
              <option value= "yes" className={mainStyles.option}>Si</option>
              <option value="no" className={mainStyles.option}>No</option>
            </select>
          </div>
          <div className={mainStyles.minimalGrid}>
            <h3 className={mainStyles.subtitle} >Projectos ?</h3>
            <select value={input.isprojectmanager} name="isprojectmanager" onChange={e => handleChange(e)} className={mainStyles.select} disabled= {modify === false ? true : false}>
              <option className={mainStyles.option}>Elija una opción</option>
              <option value= "yes" className={mainStyles.option}>Si</option>
              <option value="no" className={mainStyles.option}>No</option>
            </select>
          </div>
          <div className={mainStyles.minimalGrid}>
            <h3 className={mainStyles.subtitle} >Desarrollador ?</h3>
            <select value={input.isprojectworker} name="isprojectworker" onChange={e => handleChange(e)} className={mainStyles.select} disabled= {modify === false ? true : false}>
              <option className={mainStyles.option}>Elija una opción</option>
              <option value= "yes" className={mainStyles.option}>Si</option>
              <option value="no" className={mainStyles.option}>No</option>
            </select>
          </div>
        </div>
        <div className={mainStyles.minimalGrid}>
          <h3 className={mainStyles.subtitle}>Localidad</h3>
          <select className={mainStyles.select} value={input.salepoint} name="salepoint" onChange={e => handleSelect(e)} disabled= {modify === false ? true : false}>
            <option className={mainStyles.option} value="">Elija una Opción</option>
            {salepoint &&
              salepoint.map((e) => (
                <option className={mainStyles.option} value={e.salepoint} key={e.id}>{e.salepoint}</option>
              ))}
          </select>
        </div>
        <div className={mainStyles.minimalGrid}>
          <h3 className={mainStyles.subtitle}>Sector</h3>
          <select className={mainStyles.select} value={input.sectorname} name="sectorname" onChange={e => handleChange(e)} disabled= {modify === false ? true : false}>
            <option className={mainStyles.option} value="">Elija una Opción</option>
            {sector &&
              sector.map((e) => (
                <option className={mainStyles.option} value={e.sector} key={e.id}>{e.sectorname}</option>
              ))}
            
          </select>
        </div>

        <div className={style.buttonContainer}>
          { modify === false ? 
          <button className={mainStyles.button} onClick={ e => handleModify(e)}>
            Modificar
          </button> : 
          <button className={mainStyles.button} onClick={ e => handleOpenChange(e)}>
            Guardar Cambios
          </button>}
          { modify === true ? 
          <button className={mainStyles.button} onClick={ e => handleModifyReset(e)}>
            Borrar cambios
          </button> : null }
          <button className={mainStyles.button} onClick={ e => handleOpen(e)}>Borrar Usuario</button>
        </div>
      </form>
      </div>  

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className={style.modalTitle}
          >
            ¿ Deseas eliminar este usuario ?
          </Typography>
          <button
            onClick={(e) => {
              handleUserDelete(e);
              handleClose(e);
            }}
            className={style.modalButton}
          >
            Aceptar
          </button>
          <button
            onClick={(e) => {
              handleClose(e);
            }}
            className={style.modalButton}
          >
            Cancelar
          </button>
        </Box>
      </Modal>

      <Modal
        open={openChange}
        onClose={handleCloseChange}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className={style.modalTitle}
          >
            ¿ Deseas guardar los cambios ?
          </Typography>
          <button
            onClick={(e) => {
              submitChange(e);
              handleCloseChange(e);
            }}
            className={style.modalButton}
          >
            Aceptar
          </button>
          <button
            onClick={(e) => {
              handleCloseChange(e);
            }}
            className={style.modalButton}
          >
            Cancelar
          </button>
        </Box>
      </Modal>
    </>
  );
}
export default Soporte;
