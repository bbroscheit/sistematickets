import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../modules/detail.module.css";
import mainStyle from "@/styles/Home.module.css";
import Swal from "sweetalert2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { updateWorker } from "../api/updateWorker";
import { updateSolutionTicket } from "../api/updateSolutionTicket";
import { postFaq } from "../api/postFaq";
import { updateInfoTicket } from "../api/updateInfoTicket";
import { updateInfoTicketByUser } from "../api/updateInfoTicketByUser";
import { updateCloseTicket } from "../api/updateCloseTicket";
import { sendEmailAssigment } from "../api/sendEmailAssigment";
import { sendEmailAssigmentUser } from "../api/sendEmailAssigmentUser";
import { sendEmailComplete } from "../api/sendEmailComplete";
import { sendEmailMoreInfo } from "../api/sendEmailMoreInfo";
import { sendEmailInfoUser } from "../api/sendEmailInfoUser";
import { sendEmailCloseTicket } from "../api/sendEmailCloseTicket";
import getFilename from "../../functions/getFilename";
import { ticketAssigment } from "../api/ticketAssigment";
import { updatePriority } from "../api/updatePriority";
import { extraeFecha } from "@/functions/extraeFecha";
import devuelveHoraDesdeTimestamp from "@/functions/devuelveHoraDesdeTimestamp";
import { postProveedor } from "../api/postProveedor";
import { updateProveedor } from "../api/updateProveedor";
import { closeProveedor } from "../api/closeProveedor";
import { updateReasignar } from "../api/updateReasignar";
import ajustaDevuelveHoraDesdeTimestamp from "@/functions/ajustaDevuelveHoraDesdeTimestamp";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
  const id = router.query.id ;
  const [openSolution, setOpenSolution] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openInfoUser, setOpenInfoUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [openChangeWorker, setOpenChangeWorker] = useState(false);
  const [openCreateProveedor, setOpenCreateProveedor] = useState(false);
  const [openWorkernote, setOpenWorkernote] = useState(false);
  const [openProveedor, setOpenProveedor] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [newPriority, setNewPriority] = useState({ name: "sin asignar" });
  const [user, setUser] = useState(null);
  const [soporte, setSoporte] = useState(null);
  const [worker, setWorker] = useState(null);
  const [proveedor, setProveedor] = useState(null);
  const [asignar, setAsignar] = useState({ name: "sin asignar" });
  const [asignarProveedor, setAsignarProveedor] = useState({ 
    name: "sin asignar",
    description:"sin descripcion" 
  });
  const [reasignarWorker, setReasignarWorker] = useState({ 
    name: "sin asignar",
    description:"Agrega un motivo" 
  });
  const [errorReasignar, setErrorReasignar] = useState("");
  const [buttonReasignar, setButtonReasignar] = useState({complete:false})
  const [control, setControl] = useState(0);
  const [faq, setFaq] = useState(null);
  const [solution, setSolution] = useState({ 
    solution: "" , 
    files : []
  });
  const [errorSolution, setErrorSolution] = useState("");
  const [buttonSolution, setButtonSolution] = useState({complete:false})
  const [info, setInfo] = useState({ 
    info: "" , 
    files:[] 
  });
  const [errorInfo, setErrorInfo] = useState("");
  const [buttonMoreInfo, setButtonMoreInfo] = useState({complete:false})
  const [yesState, setYesState] = useState(0);
  const [soporteId, setSoporteId] = useState(1)
  const [answer , setAnswer] = useState({ 
    info: "" , 
    files: []
  })
  const [errorAnswer, setErrorAnswer] = useState("");
  const [buttonAnswer, setButtonAnswer] = useState({complete:false})
  const [email, setEmail] = useState({
    idTicket: id ? id : soporteId,
    useremail: "",
    worker: "",
    detail:"",
    question:"",
    answer:""
  });
  const [inputFaq, setInputFaq] = useState({
    title: "",
    description: "",
    answer: "",
    uresolved: false,
    questioner: "",
  });
  const [inputProveedor, setInputProveedor] = useState({
    name: "",
    description: "",
    address: "",
    zone: ""
  });

  

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDetail/${id}`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSoporte(data);
        setInputFaq({
          title: data.subject,
          description: data.detail,
          answer: data.answer,
          uresolved: false,
          questioner: data.user ? data.user.username : "sin usuario",
        });
        setSolution({
          ...solution,
          solution: user ? data.answer : "Sin resolución",
        });
        setEmail({
          ...email,
          idTicket:data.id,
          useremail: data.user.email,
          detail: data.detail
        });
      });

      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
      .then((res) => res.json())
      .then((data) => {
        setWorker(data);
      });

      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`)
      .then((res) => res.json())
      .then((data) => {
        setFaq(data);
      });

      let userLogin = localStorage.getItem("user");
      let loginParse = JSON.parse(userLogin);
      setUser(loginParse);

      let idSoporte = localStorage.getItem("idSoporte");
      setSoporteId(idSoporte);
      
  }, [router.query.id]);
  
  //trae toda la lista de proveedores
  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/proveedor`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/proveedor`)
      .then((res) => res.json())
      .then((data) => {
        setProveedor(data);
      });
  }, [router.query.id])

  // los siguientes effects se encargan de agrandar el textarea hasta que css permita el uso de form-sizing
  useEffect(() => {
    if (soporte !== null) {
      const textarea = document.getElementById('mi-textarea');
      if (textarea) {
        textarea.style.height = 'auto'; // Restablece la altura a automática
        textarea.style.height = textarea.scrollHeight + 'px'; // Establece la altura según el contenido
      }
    }
  }, [inputFaq.description]);

  
  useEffect(() => {
    if (soporte !== null) {
      const textarea = document.getElementById('mi-textareaAnswer');
      if (textarea) {
        textarea.style.height = 'auto'; // Restablece la altura a automática
        textarea.style.height = textarea.scrollHeight + 'px'; // Establece la altura según el contenido
      }
    }
  }, [answer.answer]);

  
  useEffect(() => {
    if (soporte !== null) {
      const textarea = document.getElementById('mi-textareaInfo');
      if (textarea) {
        textarea.style.height = 'auto'; // Restablece la altura a automática
        textarea.style.height = textarea.scrollHeight + 'px'; // Establece la altura según el contenido
      }
    }
  }, [info.info]);

  useEffect(() => {
    if (soporte !== null) {
      const textarea = document.getElementById('mi-textareaSolution');
      if (textarea) {
        textarea.style.height = 'auto'; // Restablece la altura a automática
        textarea.style.height = textarea.scrollHeight + 'px'; // Establece la altura según el contenido
      }
    }
  }, [solution.solution]);

  useEffect(() => {
    if (soporte !== null) {
      const textarea = document.getElementById('mi-textareaReasignar');
      if (textarea) {
        textarea.style.height = 'auto'; // Restablece la altura a automática
        textarea.style.height = textarea.scrollHeight + 'px'; // Establece la altura según el contenido
      }
    }
  }, [reasignarWorker.description]);

  // abre y cierra el modal de la asignacion de worker, se cambio a function porque se reiniciaba la app
  function handleOpenProveedor(e) {
    e.preventDefault();
    setOpenProveedor(true);
  }

  function handleCloseProveedor() {
    setOpenProveedor(false);
  }

  // abre el modal para seleccionar un worker al soporte
  function handleOpen(e) {
    e.preventDefault();
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // abre el modal para ver los mensajes de re asignacion de soportes
  function handleOpenWorkernote(e) {
      e.preventDefault();
      setOpenWorkernote(true);
  }

  function handleCloseWorkernote() {
      setOpenWorkernote(false);
  }

  // abre el modal para cambiar al worker del soporte
  function handleOpenChangeWorker(e) {
    e.preventDefault();
    setOpenChangeWorker(true);
  }

  function handleCloseChangeWorker() {
    setOpenChangeWorker(false);
  }

  // abre el modal de creacion de proveedor
  function handleOpenCreateProveedor(e) {
    e.preventDefault();
    setOpenCreateProveedor(true);
  }

  function handleCloseCreateProveedor() {
    setOpenCreateProveedor(false);
  }

  // abre el modal de asignacion de prioridad
  function handleOpenPriority(e) {
    e.preventDefault();
    setOpenPriority(true);
  }

  function handleClosePriority() {
    control === 0 ? setControl(1) : setControl(0);
    setOpenPriority(false);
  }

  // Guarda los datos para asignar un worker al soporte
  function handleAsignar(e) {
    e.preventDefault();
    setAsignar({
      name: e.target.value,
    });
    setEmail({
      ...email,
      worker: e.target.value,
    });
  }

  // Guarda los datos para asignar un proveedor a un ticket
  function handleAsignarProveedor(e) {
    e.preventDefault();
    setAsignarProveedor({
      ...asignarProveedor,
      [e.target.name]: e.target.value,
    });
  }

  // Guarda los datos para re-asignar un worker a un ticket
  function handleReasignarWorker(e) {
    e.preventDefault();
    setReasignarWorker({
      ...reasignarWorker,
      [e.target.name]: e.target.value,
    });
    setErrorReasignar(validateReasignar({
      ...reasignarWorker,
      [e.target.name] : e.target.value
    }))
  }

  // asigna prioridad a un ticket
  function handleAsignarPriority(e) {
    e.preventDefault();
    setNewPriority({
      state: e.target.value,
    });
  }

  //guarda en el soporte la asignacion del desarrollador
  function submitAsignar(e) {
    e.preventDefault();
    updateWorker(id, asignar)
    .then(res => {
      if (res.state === "success") {
        sendEmailAssigment(email);
        window.location.reload(true);
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
  }

    //guarda en el soporte la re-asignacion del desarrollador
  function submitReasignar(e) {
      e.preventDefault();
      updateReasignar(id, reasignarWorker)
      .then(res => {
        if (res.state === "success") {
          window.location.reload(true);
        }
      })
      .catch(error => {
        console.error("Error al enviar el formulario:", error);
      });
  }

  //guarda en el soporte la asignacion del proveedor
  function submitAsignarProveedor(e) {
    e.preventDefault();
    updateProveedor(id, asignarProveedor)
    .then(res => {
      if (res.state === "success") {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDetail/${id}`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDetail/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setSoporte(data);
            setInputFaq({
              title: data.subject,
              description: data.detail,
              answer: data.answer,
              uresolved: false,
              questioner: data.user ? data.user.username : "sin usuario",
            });})
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
  }

  function submitAsignarPriority(e) {
    e.preventDefault();
    updatePriority(id, newPriority);
    window.location.reload(true);
  }

  // las siguientes 2 funciones abren y cierran el modal de la solucion
  function handleOpenSolution(e) {
    e.preventDefault();
    setOpenSolution(true);
  }

  function handleCloseSolution() {
    control === 0 ? setControl(1) : setControl(0);
    setOpenSolution(false);
  }

  function handleChangeSolution(e) {
    setSolution({
      ...solution,
      [e.target.name]: e.target.value,
    });
    setErrorSolution(validateSolution({
      ...solution,
      [e.target.name] : e.target.value
    }))
    setInputFaq({
      ...inputFaq,
      answer: e.target.value,
    });
  }

  // dentro del modal de la solucion permite decir si el usuario puede resolverlo o no
  function handleClickUresolvedYes(e) {
    e.preventDefault();
    setYesState(true);
    setInputFaq({
      ...inputFaq,
      uresolved: true,
    });
  }

  function handleClickUresolvedNo(e) {
    e.preventDefault();
    setYesState(false);
    setInputFaq({
      ...inputFaq,
      uresolved: false,
    });
  }

  function submitSolution(e) {
    e.preventDefault();
    updateSolutionTicket(soporteId, solution)
    .then(res => {
      if (res.state === "success") {
        postFaq(inputFaq);
        sendEmailComplete(email);
        window.location.reload(true);
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
  }

  // las siguientes 2 funciones abren y cierran el modal del pedido de mas informacion

  function handleOpenInfo(e) {
    e.preventDefault();
    setOpenInfo(true);
  }

  function handleCloseInfo() {
    control === 0 ? setControl(1) : setControl(0);
    setOpenInfo(false);
  }

  function submitInfo(e) {
    e.preventDefault();
    updateInfoTicket(soporteId, info)
      .then(res => {
        if (res.state === "success") {
          sendEmailMoreInfo(email);
          window.location.reload(true);
        }
      })
      .catch(error => {
        console.error("Error al enviar el formulario:", error);
      });
  }

  // las siguientes 2 funciones abren y cierran el modal del pedido de mas informacion

  function handleOpenInfoUser(e) {
    e.preventDefault();
    setOpenInfoUser(true);
  }

  function handleCloseInfoUser() {
    control === 0 ? setControl(1) : setControl(0);
    setOpenInfoUser(false);
  }

  function handleChangeInfo(e) {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
    setErrorInfo(validateInfo({
      ...info,
      [e.target.name] : e.target.value
    }))
    setEmail({
      ...email,
      question: e.target.value
    })
  }

  function handleChangeAnswer(e) {
    setAnswer({
      ...answer,
      [e.target.name]: e.target.value,
    });
    setErrorAnswer(validateAnswer({
      ...answer,
      [e.target.name] : e.target.value
    }))
    setEmail({
      ...email,
      answer: e.target.value
    })
  }

  function handleChangeCreateProveedor(e) {
    setInputProveedor({
      ...inputProveedor,
      [e.target.name]: e.target.value,
    });
  }

  function submitInfoUser(e) {
    e.preventDefault();
    updateInfoTicketByUser(soporteId, answer)
      .then(res => {
        if (res.state === "success") {
          sendEmailInfoUser(email);
          window.location.reload(true);
        }
      })
      .catch(error => {
        console.error("Error al enviar el formulario:", error);
      });    
  }

  // ingresa archivos en pedido de Información
  function handleChangeFile(e) {
    e.preventDefault();
    const filesArray = [...e.target.files];  // Convierte la colección de archivos en un array
    setInfo({
      ...info,
      files: filesArray,
    });
  }

  // ingresa archivos en pedido de Información
  function handleChangeFileAnswer(e) {
    e.preventDefault();
    const filesArray = [...e.target.files];  // Convierte la colección de archivos en un array
    setAnswer({
      ...answer,
      files: filesArray,
    });
  }

  // ingresa archivos en pedido de Información
  function handleChangeFileSolution(e) {
    e.preventDefault();
    const filesArray = [...e.target.files];  // Convierte la colección de archivos en un array
    setSolution({
      ...solution,
      files: filesArray,
    });
  }


  // funcion para pasar el estado del ticket a Terminado
  function SubmitCloseTicket(e) {
    e.preventDefault();
    updateCloseTicket(soporteId)
      .then(res => {
        if (res.state === "success") {
          sendEmailCloseTicket(email);
          window.location.reload(true);
        }
      })
      .catch(error => {
        console.error("Error al enviar el formulario:", error);
      });
  }

  function submitAcceptAssigment(e) {
    e.preventDefault();
    ticketAssigment(id)
    .then(res => {
      if (res.state === "success") {
        sendEmailAssigmentUser(email);
        window.location.reload(true);
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
    
  }

  function submitCreateProveedor(e) {
    e.preventDefault();
    postProveedor(inputProveedor)
    .then(res => {
      if (res.state === "success") {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/proveedor`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/proveedor`)
          .then((res) => res.json())
          .then((data) => {
        setProveedor(data);
        });
        setInputProveedor({
          name: "",
          description: "",
          address: "",
          zone: ""
        })
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
    
  }

  function submitCloseProveedor(e , id){
    e.preventDefault()
    closeProveedor(id)
    .then(res => {
        if (res.state === "success") {
            Swal.fire(({
              icon: "success",
              title: "Cerraste la tarea del proveedor",
              showConfirmButton: false,
              timer: 1500
            }));
   

         }
      })
      .catch(error => {
        console.error("Error al enviar el formulario:", error);
      });
  }

  function validateInfo(info){
    let errors = []
      if (!info.info) {
        errors.info = "El campo no puede estar vacío";
      }else if(info.info.length < 20 ){
        errors.info = "El campo debe tener más de 20 caracteres"
      }

      if (!errors.info) {
        setButtonMoreInfo({ complete : true })
      }else{
        setButtonMoreInfo({ complete: false })
      }
      
    return errors
  }

  function validateSolution(solution){
    let errors = []
      if (!solution.solution) {
        errors.solution = "El campo no puede estar vacío";
      }else if(solution.solution.length < 20 ){
        errors.solution = "El campo debe tener más de 20 caracteres"
      }

      if (!errors.solution) {
        setButtonSolution({ complete : true })
      }else{
        setButtonSolution({ complete: false })
      }
      
    return errors
  }

  function validateAnswer(answer){
    let errors = []
      if (!answer.answer) {
        errors.answer = "El campo no puede estar vacío";
      }else if(answer.answer.length < 20 ){
        errors.answer = "El campo debe tener más de 20 caracteres"
      }

      if (!errors.answer) {
        setButtonAnswer({ complete : true })
      }else{
        setButtonAnswer({ complete: false })
      }
      
    return errors
  }

  function validateReasignar(reasignarWorker){
    let errors = []
      if (!reasignarWorker.description) {
        errors.description = "El campo no puede estar vacío";
      }else if(reasignarWorker.description.length < 20 ){
        errors.description = "El campo debe tener más de 20 caracteres"
      }

      if (!errors.description) {
        setButtonReasignar({ complete : true })
      }else{
        setButtonReasignar({ complete: false })
      }
      
    return errors
  }

  
  return (
    <>
      <div>
        {soporte !== null ? (
          <>
            <div className={style.visibilityContainer}>
              <div className={style.infoContainer}>
                <div>
                  <h1 className={style.title}>Soporte Nº {soporte.id}</h1>
                  <h2 className={style.subtitle}>{soporte.subject}</h2>                  
                </div>
                  {/* Se agrega hora y fecha a pedido de Adrian y solo en las vistas de usuarios de Sistemas */}
                  {user !== null &&
                    user.sector === "Sistemas" ? 
                      <div className={style.hours}>
                        <h5>Creado: </h5>
                        <h5>{extraeFecha(soporte.createdAt)}</h5>
                        <h5>{ajustaDevuelveHoraDesdeTimestamp(soporte.createdAt)}</h5>
                      </div> : null}

                <div className={style.titleContainer}>
                  <div className={style.stateContainer}>
                    <h3> Estado: </h3>
                    <p>{soporte.state}</p>
                  </div>
                  <div className={style.stateContainer}>
                    <h3> Solicitante: </h3>
                    <p>
                      {soporte.user.firstname} {soporte.user.lastname}
                    </p>
                  </div>

                  {/* Vista de desarrollador si el usuario es de sistemas o supervisor */}
                   {user !== null && ( user.sector === "Sistemas" || user.sector === "Supervisor")?
                    <div className={style.stateContainer}>
                      <h3> Asignado a : </h3> <p>{soporte.worker}</p>
                      {
                        soporte.state === "sin asignar" ? 
                        <button onClick={(e) => { handleOpen(e) }}> Cambiar </button>  
                        : null
                      }

                      {
                        soporte.state !== "Terminado" && soporte.state !== "Completado" && soporte.state !== "sin asignar"? 
                          <button onClick={(e) => { handleOpenChangeWorker(e) }}> Cambiar </button>  
                          : null
                      } 
                      {
                        soporte && soporte.workernote ?
                        <div className={style.workernote} onClick={handleOpenWorkernote}><AssignmentRoundedIcon /></div>
                      : null
                  }
                    </div>: 
                    <div className={style.stateContainer}>
                        <h3> Asignado a : </h3> <p>{soporte.worker}</p>
                    </div> 
                    }
                  {/* Vamos a crear un icono si existe una nota en el ticket y al clickear se abre un modal que muestra el detalle */}
                 
                 
                  {/* Sector de cambio de prioridad */}
                  {user !== null && user.sector === "Sistemas" ? (
                    <div className={style.stateContainer}>
                      <h3> Prioridad : </h3> <p>{soporte.priority}</p>
                      
                      
                        <button
                          onClick={(e) => {
                            handleOpenPriority(e);
                          }}
                        >
                          {" "}
                          Cambiar{" "}
                        </button>
                      
                    </div>
                  ) : null}

                </div>
              </div>
              
              {/* si el soporte esta en desarrollo muestra el boton , sino muestra la informacion del tercero y el boton de finalizar */}
              {
                soporte !== null && soporte.state === "Desarrollo" && soporte.proveedornote ?
                  <div className={style.centerStateContainer}> 
                    <div>
                      <h3>{soporte.proveedornote.proveedor.name}</h3>
                      <p>{soporte.proveedornote.description}</p>
                    </div>
                    <div className={style.centerStateContainerDates}>
                    <p>Comienza : {extraeFecha(soporte.proveedornote.createdAt)}</p>
                    {
                      soporte.proveedornote.state === "Comenzado" ? 
                        <button onClick={ e => submitCloseProveedor(e , soporte.proveedornote.id)}> Cerrar </button> : 
                          <p> Terminado : {extraeFecha(soporte.proveedornote.updatedAt)}</p>
                    }
                    </div>
                  </div> : soporte !== null && soporte.state === "Desarrollo" && !soporte.proveedornote ? user !== null && user.sector === "Sistemas" ?
                        <div className={style.stateContainer}>
                          <h3> Proveedor Externo: </h3>
                          <button onClick={(e) => handleOpenProveedor(e)}>Agregar</button>
                        </div> : null : null
              }

              {/* si el soporte esta terminado o completado , solo muestra la informacion del proveedor */}
              { soporte !== null && (soporte.state === "Terminado" || soporte.state === "Completado")&& soporte.proveedornote ?
                  <div className={style.centerStateContainer}> 
                    <div>
                      <h3>{soporte.proveedornote.proveedor.name}</h3>
                      <p>{soporte.proveedornote.description}</p>
                    </div>
                    <div className={style.centerStateContainerDates}>
                    <p>Comienza : {extraeFecha(soporte.proveedornote.createdAt)}</p>
                    {
                      soporte.proveedornote.state === "Comenzado" ? 
                        <button className={mainStyle.button} onClick={ e => submitCloseProveedor(e , soporte.proveedornote.id)}> Cerrar </button> : 
                          <p> Terminado : {extraeFecha(soporte.proveedornote.updatedAt)}</p>
                    }
                    </div>
                  </div> : null
              }
                         
              <div className={style.form}>
                                
                <div>
                  <h3 className={style.label}>Detalle : </h3>
                  <textarea
                    id="mi-textarea"
                    type="text"
                    value={soporte.detail}
                    cols="80"
                    style={{
                      minHeight: '120px',
                      resize: 'none',
                      overflowY: 'hidden'
                    }}
                    className={style.textarea}
                  />
                </div>

                {/* Abre la vista solucion para cualquier usuario perteneciente a Sistemas*/}
                { user !== null && user.sector !== "Sistemas" ? null : soporte !== null && soporte.answer !== "Sin resolución" ? (
                  <div>
                    <h3 className={style.label}>Solución : </h3>
                    <textarea
                      id="mi-textarea"
                      placeholder={soporte.answer}
                      // disabled
                      cols="80"
                      // rows="14"
                      className={style.textarea}
                      style={{
                        minHeight: '120px',
                        resize: 'none',
                        overflowY: 'hidden'
                      }}
                    />
                  </div>
                ) : null}
                
                {/* Abre la vista solucion para cualquier usuario no perteneciente a Sistemas y el estado del soporte es Completado*/}
                { user !== null && user.sector === "Sistemas" ? null : soporte !== null && soporte.state === "Completado" ? (
                    <div>
                      <h3 className={style.label}>Solución : </h3>
                      <textarea
                        id="mi-textarea"
                        placeholder={soporte.answer}
                        // disabled
                        cols="80"
                        // rows="14"
                        className={style.textarea}
                        style={{
                          minHeight: '120px',
                          resize: 'none',
                          overflowY: 'hidden'
                        }}
                      />
                    </div>
                  ) : null}

                {/* Abre la vista solucion para cualquier usuario no perteneciente a Sistemas y el estado del soporte es Terminado*/}
                { user !== null && user.sector === "Sistemas" ? null : soporte !== null && soporte.state === "Terminado" ? (
                    <div>
                      <h3 className={style.label}>Solución : </h3>
                      <textarea
                        id="mi-textarea"
                        placeholder={soporte.answer}
                        // disabled
                        cols="80"
                        // rows="14"
                        className={style.textarea}
                        style={{
                          minHeight: '120px',
                          resize: 'none',
                          overflowY: 'hidden'
                        }}
                      />
                    </div>
                  ) : null}

                {/* Visor de adjuntos si es que existen */}
                { soporte !== null && soporte.files && soporte.files.length > 0 ? (
                  <>
                    <h3 className={style.label}>Adjuntos:</h3>
                    {soporte.files && soporte.files.length > 0
                      ? soporte.files.map((file, index) => (
                          <div key={index} className={style.adjuntos}>
                            <a href={encodeURI(file)} download>
                              {getFilename(file)}
                            </a>
                          </div>
                        ))
                      : null}
                  </>
                ) : null}

                {/* definicion de botones por usuario y estado del soporte */}

                {/* si el soporte esta Asignado y el desarrollador coincide con el worker muestra "comenzar desarrollo" */}
                { soporte !== null && soporte.state === "Asignado" && user.name === soporte.worker ? 
                    <div className={mainStyle.buttonContainer}>
                      <button
                        onClick={(e) => submitAcceptAssigment(e)}
                        className={mainStyle.button}
                      >
                        Comenzar Desarrollo
                      </button>
                    </div>: null
                }

                {/* si el soporte esta en Desarrollo y el desarrollador coincide con el worker muestra "resolver y mas info" */}
                { soporte !== null && soporte.state === "Desarrollo" && user.name === soporte.worker ? 
                    <div className={mainStyle.buttonContainer}>
                    <button
                      onClick={(e) => handleOpenSolution(e)}
                      className={mainStyle.button}
                    >
                      Resolver
                    </button>
                    <button
                      onClick={(e) => handleOpenInfo(e)}
                      className={mainStyle.button}
                    >
                      Mas Info
                    </button>
                  </div>: null
                }

                {/* si el soporte esta en Informacion y el usuario coincide con el usuario creador muestra "Agregar Información" */}
                { soporte !== null && soporte.state === "Informacion" && user.name === soporte.user.username ? 
                    <div className={mainStyle.buttonContainer}>
                    <button
                      onClick={(e) => handleOpenInfoUser(e)}
                      className={mainStyle.button}
                    >
                      Agregar Información
                    </button>
                  </div>: null
                }

                {/* si el soporte esta en Completado y el usuario coincide con el usuario creador muestra "Re Abrir y Cerar Ticket" */}
                { soporte !== null && soporte.state === "Completado" && user.name === soporte.user.username ? 
                    <div className={mainStyle.buttonContainer}>
                    <button
                      onClick={(e) => handleOpenInfoUser(e)}
                      className={mainStyle.button}
                    >
                      Re Abrir 
                    </button>
                    <button
                      onClick={(e) => SubmitCloseTicket(e)}
                      className={mainStyle.button}
                    >
                      Cerrar Ticket
                    </button>
                  
                  </div>: null
                }

              </div>
            </div>

          </>
        ) : (
          <h3> Loading... </h3>
        )}
      </div>

          {/* modal asignacion de worker de soporte */}
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
            ¿ A quien deseas asignarle el soporte?
          </Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={asignar.name}
            className={style.modalSelect}
            onChange={(e) => handleAsignar(e)}
          >
            {worker !== null && worker.length > 0
              ? worker.map((e) => (
                  <MenuItem value={e.username} key={worker.id}>
                    {e.username}{" "}
                  </MenuItem>
                ))
              : null}
          </Select>
          <button
            onClick={(e) => {
              submitAsignar(e);
              handleClose();
            }}
            className={style.modalButton}
          >
            Asignar
          </button>
        </Box>
      </Modal>

          {/* modal cambio de worker en soporte */}
      <Modal
        open={openChangeWorker}
        onClose={handleCloseChangeWorker}
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
            ¿ A quien deseas Re-asignarle el soporte?
          </Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={reasignarWorker.name}
            className={style.modalSelect}
            name="name"
            onChange={(e) => handleReasignarWorker(e)}
          >
            {worker !== null && worker.length > 0
              ? worker.map((e) => (
                  <MenuItem value={e.username} key={worker.id}>
                    {e.username}{" "}
                  </MenuItem>
                ))
              : null}
          </Select>
          < textarea  id="mi-textareaReasignar"
                      name="description" 
                      value={reasignarWorker.description} 
                      onChange={handleReasignarWorker}
                      style={{
                        minHeight: '120px',
                        resize: 'none',
                        overflowY: 'hidden'
                      }}
                      />    
          <p className={ errorReasignar.description ? `${mainStyle.danger}` : `${mainStyle.normal}`}>
            {errorReasignar.description}
          </p>  
          {
          buttonReasignar.complete === true ?
            <button className={style.modalButton} type="submit" onClick={(e) => { submitReasignar(e);  handleCloseChangeWorker()}} > Asignar </button> 
            : <button className={style.modalButtonDisabled} type="submit" disabled> Aceptar </button> 
          }   
        </Box>
      </Modal>

      {/* modal para ver los mensajes de reasignacion */}
      <Modal
        open={openWorkernote}
        onClose={handleCloseWorkernote}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          {soporte !== null && soporte.workernote ? (
            <textarea
              id="mi-textareaInfoAsigment"    
              className={style.modalTextarea}
              style={{
                height:'200px',
                
                
              }}
            >
              {soporte.workernote.description}
            </textarea>
          ) : null}
        </Box>
      </Modal>

          {/* modal asignacion de prioridad */}
      <Modal
        open={openPriority}
        onClose={handleClosePriority}
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
            Asigna una prioridad
          </Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={newPriority.name}
            className={style.modalSelect}
            onChange={(e) => handleAsignarPriority(e)}
          >
              <MenuItem value="Alta">Alta</MenuItem>
              <MenuItem value="Media">Media</MenuItem>
              <MenuItem value="Baja">Baja</MenuItem>
               
          </Select>
          <button
            onClick={(e) => {
              submitAsignarPriority(e);
              handleClosePriority();
            }}
            className={style.modalButton}
          >
            Asignar
          </button>
        </Box>
      </Modal>

          {/* modal para agregar una solucion */}
      <Modal
        open={openSolution}
        onClose={handleCloseSolution}
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
            Anota la solución
          </Typography>
          {soporte !== null ? (
            <textarea
              id="mi-textareaSolution"
              placeholder={
                soporte !== null && soporte.answer === "Sin resolucion"
                  ? ""
                  : soporte.answer
              }
              value={solution.solution}
              name="solution"
              onChange={(e) => handleChangeSolution(e)}
              className={style.modalTextarea}
              style={{
                minHeight: '120px',
                resize: 'none',
                overflowY: 'hidden'
              }}
            />
          ) : null}
          <p className={ errorSolution.solution ? `${mainStyle.danger}` : `${mainStyle.normal}`}>
            {errorSolution.solution}
          </p>
          <div className={style.modalSubtitleContainer}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className={style.modalSubitle}
            >
              ¿ Puede resolverlo el usuario ?
            </Typography>
            <div className={style.modalChecks}>
              <button
                className={
                  yesState === true ? style.buttonGreen : style.buttonGrey
                }
                onClick={(e) => handleClickUresolvedYes(e)}
              >
                <CheckCircleOutlineIcon />
              </button>
              <button
                className={
                  yesState === true ? style.buttonGrey : style.buttonRed
                }
                onClick={(e) => handleClickUresolvedNo(e)}
              >
                <CancelOutlinedIcon />
              </button>
            </div>
            <div>
            <h3 className={mainStyle.subtitle}> ¿ Deseas agregar algun archivo ?</h3>
            <input
              type="file"
              name="files"
              multiple
              className={mainStyle.inputFile}
              onChange={(e) => handleChangeFileSolution(e)}
            />
          </div>
          </div>
          {
          buttonSolution.complete === true ?
            <button className={style.modalButton} type="submit" onClick={(e) => { submitSolution(e); handleCloseSolution();}} > Cerrar Ticket </button> 
            : <button className={style.modalButtonDisabled} type="submit" disabled> Cerrar Ticket </button> 
          }
          
        </Box>
      </Modal>

          {/* modal para solicitar informacion */}
      <Modal
        open={openInfo}
        onClose={handleCloseInfo}
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
            Solicita mas Información
          </Typography>
          {soporte !== null ? (
            <textarea
              id="mi-textareaInfo"
              value={info.info}
              name="info"
              onChange={(e) => handleChangeInfo(e)}
              className={style.modalTextarea}
              style={{
                minHeight: '120px',
                resize: 'none',
                overflowY: 'hidden'
              }}
            />
          ) : null}
          <p className={ errorInfo.info ? `${mainStyle.danger}` : `${mainStyle.normal}`}>
            {errorInfo.info}
          </p>
          <div>
            <h3 className={mainStyle.subtitle}> ¿ Deseas agregar algun archivo ?</h3>
            <input
              type="file"
              name="files"
              multiple
              className={mainStyle.inputFile}
              onChange={(e) => handleChangeFile(e)}
            />
          </div>
          {
          buttonMoreInfo.complete === true ?
            <button className={style.modalButton} type="submit" onClick={(e) => { submitInfo(e); handleCloseInfo();}} > Aceptar </button> 
            : <button className={style.modalButtonDisabled} type="submit" disabled> Aceptar </button> 
          }

          
        </Box>
      </Modal>

          {/* modal para agregar informacion */}
      <Modal
        open={openInfoUser}
        onClose={handleCloseInfoUser}
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
            Agrega más Información
          </Typography>
          {soporte !== null ? (
            <textarea
              id="mi-textareaAnswer"
              value={answer.answer}
              name="answer"
              onChange={(e) => handleChangeAnswer(e)}
              className={style.modalTextarea}
              style={{
                minHeight: '120px',
                resize: 'none',
                overflowY: 'hidden'
              }}
            />
          ) : null}
          <p className={ errorAnswer.answer ? `${mainStyle.danger}` : `${mainStyle.normal}`}>
            {errorAnswer.answer}
          </p>
          <div>
            <h3 className={mainStyle.subtitle}> ¿ Deseas agregar algun archivo ?</h3>
            <input
              type="file"
              name="files"
              multiple
              className={mainStyle.inputFile}
              onChange={(e) => handleChangeFileAnswer(e)}
            />
          </div>
          {
          buttonAnswer.complete === true ?
            <button className={style.modalButton} type="submit" onClick={(e) => { submitInfoUser(e);  handleCloseInfoUser()}} > Aceptar </button> 
            : <button className={style.modalButtonDisabled} type="submit" disabled> Aceptar </button> 
          }
          
        </Box>
      </Modal>

          {/* modal para seleccionar proveedor */}
      <Modal
        open={openProveedor}
        onClose={handleCloseProveedor}
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
            Elije el proveedor
          </Typography>
          <select
            value={asignarProveedor.name}
            className={style.modalSelect}
            name="name"
            onChange={(e) => handleAsignarProveedor(e)}
          >
            {proveedor !== null && proveedor.length > 0
                ? proveedor.map((e) => (
                  <option value={e.name} key={e.id}>
                    {e.name}{" "}
                  </option>
                  ))
                : null}
          </select>
          <textarea
              id="mi-textareaAnswer"
              value={asignarProveedor.description}
              name="description"
              onChange={(e) => handleAsignarProveedor(e)}
              className={style.modalTextarea}
              style={{
                minHeight: '120px',
                resize: 'none',
                overflowY: 'hidden'
              }}
            />
          <div>
          <button
            onClick={(e) => {
              submitAsignarProveedor(e);
              handleCloseProveedor();
            }}
            className={style.modalButton}
          >
            Asignar
          </button>
          <button
            onClick={(e) => {
              handleOpenCreateProveedor(e);
            }}
            className={style.modalButton}
          >
            Crear
          </button>
          <button
            onClick={(e) => {
              handleCloseProveedor();
            }}
            className={style.modalButton}
          >
            Cerrar
          </button>
          </div>
        </Box>
      </Modal>   

        {/* modal para crear proveedor */}
      <Modal
        open={openCreateProveedor}
        onClose={handleCloseCreateProveedor}
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
            Ingresa el Proveedor
          </Typography>
          <input placeholder="Ingrese Razon Social" type="text" value={inputProveedor.name} name="name" onChange={ e => handleChangeCreateProveedor(e)} className={style.inputModal}/>
          <input placeholder="Ingrese Descripción" type="text" value={inputProveedor.description} name="description" onChange={ e => handleChangeCreateProveedor(e)} className={style.inputModal}/>
          <input placeholder="Ingrese Dirección" type="text" value={inputProveedor.address} name="address" onChange={ e => handleChangeCreateProveedor(e)} className={style.inputModal}/>
          <input placeholder="Ingrese Localidad" type="text" value={inputProveedor.zone} name="zone" onChange={ e => handleChangeCreateProveedor(e)} className={style.inputModal}/>
          <button
            onClick={(e) => {
              submitCreateProveedor(e);
              handleCloseCreateProveedor();
            }}
            className={style.modalButton}
          >
            Aceptar
          </button>
        </Box>
      </Modal>



    </>
  );
}
export default Soporte;
