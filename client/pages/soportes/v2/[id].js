import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "@/modules/detailV2.module.css";
import mainStyle from "@/styles/Home.module.css";
import Swal from "sweetalert2";
import BotonesDetailV2 from "@/components/soporte/BotonesDetailV2";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { updateWorker } from "../../api/updateWorker";
import { updateSolutionTicket } from "../../api/updateSolutionTicket";
import { updateInfoTicket } from "../../api/updateInfoTicket";
import { updateInfoTicketByUser } from "../../api/updateInfoTicketByUser";
import { updateCloseTicket } from "../../api/updateCloseTicket";
import { sendEmailAssigment } from "../../api/sendEmailAssigment";
import { sendEmailAssigmentUser } from "../../api/sendEmailAssigmentUser";
import { sendEmailComplete } from "../../api/sendEmailComplete";
import { sendEmailMoreInfo } from "../../api/sendEmailMoreInfo";
import { sendEmailCloseTicket } from "../../api/sendEmailCloseTicket";
import getFilename from "../../../functions/getFilename";
import { ticketAssigment } from "../../api/ticketAssigment";
import { updatePriority } from "../../api/updatePriority";
import { extraeFecha } from "@/functions/extraeFecha";
import { postProveedor } from "../../api/postProveedor";
import { updateProveedor } from "../../api/updateProveedor";
import { closeProveedor } from "../../api/closeProveedor";
import { updateReasignar } from "../../api/updateReasignar";
import ajustaDevuelveHoraDesdeTimestamp from "@/functions/ajustaDevuelveHoraDesdeTimestamp";
import useUser from "@/hooks/useUser";

function statePill(state) {
  switch (state) {
    case "sin asignar":
      return { label: "Sin asignar", cls: style.pillGray };
    case "Asignado":
      return { label: "Asignado", cls: style.pillBlue };
    case "Desarrollo":
      return { label: "Desarrollo", cls: style.pillAmber };
    case "Informacion":
      return { label: "Información", cls: style.pillPurple };
    case "Completado":
      return { label: "Completado", cls: style.pillGreen };
    case "Terminado":
      return { label: "Terminado", cls: style.pillGreen };
    default:
      return { label: state, cls: style.pillGray };
  }
}

function Soporte() {
  const router = useRouter();
  const id = router.query.id;
  const [openSolution, setOpenSolution] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openInfoUser, setOpenInfoUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [openChangeWorker, setOpenChangeWorker] = useState(false);
  const [openCreateProveedor, setOpenCreateProveedor] = useState(false);
  const [openWorkernote, setOpenWorkernote] = useState(false);
  const [openProveedor, setOpenProveedor] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [newPriority, setNewPriority] = useState({ state: "sin asignar" });
  const [user, setUser] = useUser();
  const [soporte, setSoporte] = useState(null);
  const [worker, setWorker] = useState(null);
  const [proveedor, setProveedor] = useState(null);
  const [asignar, setAsignar] = useState({ name: "sin asignar" });
  const [asignarProveedor, setAsignarProveedor] = useState({
    name: "sin asignar",
    description: "sin descripcion"
  });
  const [reasignarWorker, setReasignarWorker] = useState({
    name: "sin asignar",
    description: "Agrega un motivo"
  });
  const [errorReasignar, setErrorReasignar] = useState("");
  const [buttonReasignar, setButtonReasignar] = useState({ complete: false })
  const [control, setControl] = useState(0);
  const [solution, setSolution] = useState({
    solution: "",
    files: []
  });
  const [dragOverSolution, setDragOverSolution] = useState(false);
  const [errorSolution, setErrorSolution] = useState("");
  const [buttonSolution, setButtonSolution] = useState({ complete: false })
  const [info, setInfo] = useState({
    info: "",
    files: []
  });
  const [dragOverInfo, setDragOverInfo] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const [buttonMoreInfo, setButtonMoreInfo] = useState({ complete: false })
  const [yesState, setYesState] = useState(0);
  const [answer, setAnswer] = useState({
    info: "",
    answer: "",
    firstname: "",
    lastname: "",
    files: []
  })
  const [dragOverAnswer, setDragOverAnswer] = useState(false);
  const [errorAnswer, setErrorAnswer] = useState("");
  const [buttonAnswer, setButtonAnswer] = useState({ complete: false })
  const [email, setEmail] = useState({
    idTicket: null,
    useremail: "",
    worker: "",
    detail: "",
    question: "",
    answer: ""
  });
  const [inputProveedor, setInputProveedor] = useState({
    name: "",
    description: "",
    address: "",
    zone: ""
  });


  // trae el detalle del soporte segun el id y la lista de los programadores
  useEffect(() => {
    if (!id) return;
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSoporte(data);
        setSolution({
          ...solution,
          solution: user ? data.answer : "Sin resolución",
        });
        setEmail({
          ...email,
          idTicket: data.id,
          useremail: data.user.email,
          detail: data.detail
        });
      });

    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
      .then((res) => res.json())
      .then((data) => {
        setWorker(data);
      });

  }, [router.query.id]);

  //trae toda la lista de proveedores
  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/proveedor`)
      .then((res) => res.json())
      .then((data) => {
        setProveedor(data);
      });
  }, [router.query.id])

  useEffect(() => {
    if (soporte !== null) {
      const textarea = document.getElementById('mi-textareaAnswer');
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }
  }, [answer.answer]);


  useEffect(() => {
    if (soporte !== null) {
      const textarea = document.getElementById('mi-textareaInfo');
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }
  }, [info.info]);

  useEffect(() => {
    if (soporte !== null) {
      const textarea = document.getElementById('mi-textareaSolution');
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }
  }, [solution.solution]);

  useEffect(() => {
    if (soporte !== null) {
      const textarea = document.getElementById('mi-textareaReasignar');
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
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
    // el <select> nativo muestra el primer <option> como seleccionado aunque el value
    // controlado no matchee ninguno, así que sincronizamos el estado con lo que se ve
    if (worker && worker.length > 0) {
      setAsignar({ name: worker[0].username });
      setEmail({ ...email, worker: worker[0].username });
    }
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
    // mismo motivo que en handleOpen: sincronizamos el value controlado con lo que
    // el <select> nativo va a mostrar seleccionado por defecto
    if (worker && worker.length > 0) {
      setReasignarWorker({ ...reasignarWorker, name: worker[0].username });
    }
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
      [e.target.name]: e.target.value
    }))
  }

  // asigna prioridad a un ticket
  function handleAsignarPriority(value) {
    setNewPriority({
      state: value,
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
            .then((res) => res.json())
            .then((data) => {
              setSoporte(data);
            })
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
      [e.target.name]: e.target.value
    }))

  }

  // dentro del modal de la solucion permite decir si el usuario puede resolverlo o no
  function handleClickUresolvedYes(e) {
    e.preventDefault();
    setYesState(true);

  }

  function handleClickUresolvedNo(e) {
    e.preventDefault();
    setYesState(false);

  }

  function submitSolution(e) {
    e.preventDefault();
    updateSolutionTicket(id, solution)
      .then(res => {
        if (res.state === "success") {
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
    updateInfoTicket(id, info)
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
    setAnswer({
      ...answer,
      firstname: user.firstname,
      lastname: user.lastname,
    })
    setOpenInfoUser(true);
  }

  function handleCloseInfoUser() {
    setAnswer({
      ...answer,
      firstname: "",
      lastname: "",
    })
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
      [e.target.name]: e.target.value
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
      [e.target.name]: e.target.value
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
    updateInfoTicketByUser(id, answer)
      .then(res => {
        if (res.state === "success") {
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
    processFilesInto(e.target.files, info, setInfo);
  }

  function handleChangeFileAnswer(e) {
    e.preventDefault();
    processFilesInto(e.target.files, answer, setAnswer);
  }

  function handleChangeFileSolution(e) {
    e.preventDefault();
    processFilesInto(e.target.files, solution, setSolution);
  }

  function processFilesInto(fileList, currentState, setter) {
    const filesArray = [...fileList];
    setter({
      ...currentState,
      files: filesArray,
    });
  }

  // funcion para pasar el estado del ticket a Terminado
  function SubmitCloseTicket(e) {
    e.preventDefault();
    updateCloseTicket(id)
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

  function submitCloseProveedor(e, id) {
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

  function validateInfo(info) {
    let errors = []
    if (!info.info) {
      errors.info = "El campo no puede estar vacío";
    } else if (info.info.length < 20) {
      errors.info = "El campo debe tener más de 20 caracteres"
    }

    if (!errors.info) {
      setButtonMoreInfo({ complete: true })
    } else {
      setButtonMoreInfo({ complete: false })
    }

    return errors
  }

  function validateSolution(solution) {
    let errors = []
    if (!solution.solution) {
      errors.solution = "El campo no puede estar vacío";
    } else if (solution.solution.length < 8) {
      errors.solution = "El campo debe tener más de 80 caracteres"
    }

    if (!errors.solution) {
      setButtonSolution({ complete: true })
    } else {
      setButtonSolution({ complete: false })
    }

    return errors
  }

  function validateAnswer(answer) {
    let errors = []
    if (!answer.answer) {
      errors.answer = "El campo no puede estar vacío";
    } else if (answer.answer.length < 20) {
      errors.answer = "El campo debe tener más de 20 caracteres"
    }

    if (!errors.answer) {
      setButtonAnswer({ complete: true })
    } else {
      setButtonAnswer({ complete: false })
    }

    return errors
  }

  function validateReasignar(reasignarWorker) {
    let errors = []
    if (!reasignarWorker.description) {
      errors.description = "El campo no puede estar vacío";
    } else if (reasignarWorker.description.length < 20) {
      errors.description = "El campo debe tener más de 20 caracteres"
    }

    if (!errors.description) {
      setButtonReasignar({ complete: true })
    } else {
      setButtonReasignar({ complete: false })
    }

    return errors
  }

  function makeDropHandlers(setDragOver, onFiles) {
    return {
      onDragOver: (e) => { e.preventDefault(); setDragOver(true); },
      onDragLeave: (e) => { e.preventDefault(); setDragOver(false); },
      onDrop: (e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          onFiles(e.dataTransfer.files);
        }
      },
    };
  }

  const dropSolution = makeDropHandlers(setDragOverSolution, (files) => processFilesInto(files, solution, setSolution));
  const dropInfo = makeDropHandlers(setDragOverInfo, (files) => processFilesInto(files, info, setInfo));
  const dropAnswer = makeDropHandlers(setDragOverAnswer, (files) => processFilesInto(files, answer, setAnswer));

  const pill = soporte ? statePill(soporte.state) : null;
  const isSistemas = user !== null && Array.isArray(user.sector) && user.sector.includes(5);
  const isSupervisorOSistemas = user !== null && Array.isArray(user.sector) && (user.sector.includes(5) || user.sector.includes(7));

  return (
    <div className={mainStyle.container}>
      <div className={style.pageWrap}>
        <div className={style.column}>

          {soporte !== null ? (
            <>
              {isSistemas ? <span className={style.badge}>Vista desarrollador (Sistemas)</span> : null}

              <div className={style.pageHead}>
                <h1>Soporte N.° {soporte.id}</h1>
                <h2>{soporte.subject}</h2>
              </div>

              {/* Se agrega hora y fecha a pedido de Adrian y solo en las vistas de usuarios de Sistemas */}
              {isSistemas ? (
                <div className={style.metaRow}>
                  <span>Creado: <strong>{extraeFecha(soporte.createdAt)} {ajustaDevuelveHoraDesdeTimestamp(soporte.createdAt)}</strong></span>
                </div>
              ) : null}

              <div className={style.card}>
                <div className={style.fieldLine}>
                  <span className={style.lbl}>Estado</span>
                  <span className={style.val}><span className={`${style.pill} ${pill.cls}`}>{pill.label}</span></span>
                </div>
                <div className={style.fieldLine}>
                  <span className={style.lbl}>Solicitante</span>
                  <span className={style.val}>{soporte.user.firstname} {soporte.user.lastname}</span>
                </div>

                {/* Vista de desarrollador si el usuario es de sistemas o supervisor */}
                {isSupervisorOSistemas ? (
                  <div className={style.fieldLine}>
                    <span className={style.lbl}>Asignado a</span>
                    <span className={style.val}>
                      {soporte.worker}
                      {soporte.state === "sin asignar" ? (
                        <button type="button" className={style.linkbtn} onClick={(e) => handleOpen(e)}>Cambiar</button>
                      ) : null}
                      {soporte.state !== "Terminado" && soporte.state !== "Completado" && soporte.state !== "sin asignar" ? (
                        <button type="button" className={style.linkbtn} onClick={(e) => handleOpenChangeWorker(e)}>Cambiar</button>
                      ) : null}
                      {soporte && soporte.workernote ? (
                        <button type="button" className={style.iconbtn} title="Ver nota de reasignación" onClick={handleOpenWorkernote}>
                          <AssignmentRoundedIcon fontSize="small" />
                        </button>
                      ) : null}
                    </span>
                  </div>
                ) : (
                  <div className={style.fieldLine}>
                    <span className={style.lbl}>Asignado a</span>
                    <span className={style.val}>{soporte.worker}</span>
                  </div>
                )}

                {/* Sector de cambio de prioridad */}
                {isSistemas ? (
                  <div className={style.fieldLine}>
                    <span className={style.lbl}>Prioridad</span>
                    <span className={style.val}>
                      {soporte.priority}
                      <button type="button" className={style.linkbtn} onClick={(e) => handleOpenPriority(e)}>Cambiar</button>
                    </span>
                  </div>
                ) : null}
              </div>

              {/* si el soporte esta en desarrollo muestra el boton , sino muestra la informacion del tercero y el boton de finalizar */}
              {soporte.state === "Desarrollo" && soporte.proveedornote && isSistemas ? (
                <div className={style.card}>
                  <span className={style.cardLabel}>Proveedor externo</span>
                  <div className={style.proveedorCard}>
                    <div>
                      <h4>{soporte.proveedornote.proveedor.name}</h4>
                      <p>{soporte.proveedornote.description}</p>
                    </div>
                    <div className={style.proveedorDates}>
                      <span>Comienza: {extraeFecha(soporte.proveedornote.createdAt)}</span>
                      {soporte.proveedornote.state === "Comenzado" ? (
                        <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={e => submitCloseProveedor(e, soporte.proveedornote.id)}>Cerrar</button>
                      ) : (
                        <span>Terminado: {extraeFecha(soporte.proveedornote.updatedAt)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : soporte.state === "Desarrollo" && !soporte.proveedornote && isSistemas ? (
                <div className={style.card}>
                  <div className={style.fieldLine}>
                    <span className={style.lbl}>Proveedor externo</span>
                    <span className={style.val}>
                      <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={(e) => handleOpenProveedor(e)}>Agregar</button>
                    </span>
                  </div>
                </div>
              ) : null}

              {/* si el soporte esta terminado o completado , solo muestra la informacion del proveedor */}
              {(soporte.state === "Terminado" || soporte.state === "Completado") && soporte.proveedornote && isSistemas ? (
                <div className={style.card}>
                  <span className={style.cardLabel}>Proveedor externo</span>
                  <div className={style.proveedorCard}>
                    <div>
                      <h4>{soporte.proveedornote.proveedor.name}</h4>
                      <p>{soporte.proveedornote.description}</p>
                    </div>
                    <div className={style.proveedorDates}>
                      <span>Comienza: {extraeFecha(soporte.proveedornote.createdAt)}</span>
                      {soporte.proveedornote.state === "Comenzado" ? (
                        <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={e => submitCloseProveedor(e, soporte.proveedornote.id)}>Cerrar</button>
                      ) : (
                        <span>Terminado: {extraeFecha(soporte.proveedornote.updatedAt)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className={style.card}>
                <span className={style.cardLabel}>Detalle</span>
                <div className={style.readtext}>{soporte.detail}</div>
              </div>

              {/* Abre la vista solucion para cualquier usuario perteneciente a Sistemas*/}
              {isSistemas && soporte.answer !== "Sin resolución" ? (
                <div className={style.card}>
                  <span className={style.cardLabel}>Solución</span>
                  <div className={style.readtext}>{soporte.answer}</div>
                </div>
              ) : null}

              {/* Abre la vista solucion para cualquier usuario no perteneciente a Sistemas y el estado del soporte es Completado o Terminado */}
              {!isSistemas && (soporte.state === "Completado" || soporte.state === "Terminado") ? (
                <div className={style.card}>
                  <span className={style.cardLabel}>Solución</span>
                  <div className={style.readtext}>{soporte.answer}</div>
                </div>
              ) : null}

              {/* Visor de adjuntos si es que existen */}
              {soporte.files && soporte.files.length > 0 ? (
                <div className={style.card}>
                  <span className={style.cardLabel}>Adjuntos</span>
                  <div className={style.chips}>
                    {soporte.files.map((file, index) => (
                      <a key={index} href={encodeURI(file)} download className={style.chip}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                        {getFilename(file)}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              <BotonesDetailV2
                soporte={soporte}
                user={user}
                submitAcceptAssigment={submitAcceptAssigment}
                handleOpenSolution={handleOpenSolution}
                handleOpenInfo={handleOpenInfo}
                SubmitCloseTicket={SubmitCloseTicket}
                handleOpenInfoUser={handleOpenInfoUser}
              />
            </>
          ) : (
            <div className={style.loading}>Cargando...</div>
          )}
        </div>
      </div>

      {/* modal asignacion de worker de soporte */}
      <Modal open={open} onClose={handleClose}>
        <Box className={style.modalBox}>
          <h2>¿A quién deseas asignarle el soporte?</h2>
          <div className={style.field}>
            <label>Desarrollador</label>
            <select value={asignar.name} onChange={(e) => handleAsignar(e)}>
              {worker !== null && worker.length > 0
                ? worker.map((e) => (
                  <option value={e.username} key={e.id}>{e.username}</option>
                ))
                : null}
            </select>
          </div>
          <button type="button" className={`${style.btn} ${style.btnPrimary}`} onClick={(e) => { submitAsignar(e); handleClose(); }}>
            Asignar
          </button>
        </Box>
      </Modal>

      {/* modal cambio de worker en soporte */}
      <Modal open={openChangeWorker} onClose={handleCloseChangeWorker}>
        <Box className={style.modalBox}>
          <h2>¿A quién deseas reasignar este soporte?</h2>
          <div className={style.field}>
            <label>Nuevo desarrollador</label>
            <select value={reasignarWorker.name} name="name" onChange={(e) => handleReasignarWorker(e)}>
              {worker !== null && worker.length > 0
                ? worker.map((e) => (
                  <option value={e.username} key={e.id}>{e.username}</option>
                ))
                : null}
            </select>
          </div>
          <div className={style.field}>
            <div className={style.fieldRow}>
              <label>Motivo de la reasignación</label>
              <span className={style.hint}>Mínimo 20 caracteres</span>
            </div>
            <textarea
              id="mi-textareaReasignar"
              name="description"
              value={reasignarWorker.description}
              onChange={handleReasignarWorker}
            />
            {errorReasignar.description ? <p className={style.fieldError}>{errorReasignar.description}</p> : null}
          </div>
          <button
            type="button"
            className={`${style.btn} ${style.btnPrimary}`}
            disabled={!buttonReasignar.complete}
            onClick={(e) => { submitReasignar(e); handleCloseChangeWorker(); }}
          >
            Asignar
          </button>
        </Box>
      </Modal>

      {/* modal para ver los mensajes de reasignacion */}
      <Modal open={openWorkernote} onClose={handleCloseWorkernote}>
        <Box className={style.modalBox}>
          <h2><AssignmentRoundedIcon fontSize="small" /> Nota de reasignación</h2>
          {soporte !== null && soporte.workernote ? (
            <div className={style.readonlyBox}>{soporte.workernote.description}</div>
          ) : null}
        </Box>
      </Modal>

      {/* modal asignacion de prioridad */}
      <Modal open={openPriority} onClose={handleClosePriority}>
        <Box className={style.modalBox}>
          <h2>Asigná una prioridad</h2>
          <div className={style.priorityRow}>
            <button type="button" className={`${style.priorityOpt} ${newPriority.state === "Alta" ? style.priorityOptSelectedAlta : ""}`} onClick={() => handleAsignarPriority("Alta")}>Alta</button>
            <button type="button" className={`${style.priorityOpt} ${newPriority.state === "Media" ? style.priorityOptSelectedMedia : ""}`} onClick={() => handleAsignarPriority("Media")}>Media</button>
            <button type="button" className={`${style.priorityOpt} ${newPriority.state === "Baja" ? style.priorityOptSelectedBaja : ""}`} onClick={() => handleAsignarPriority("Baja")}>Baja</button>
          </div>
          <button type="button" className={`${style.btn} ${style.btnPrimary}`} onClick={(e) => { submitAsignarPriority(e); handleClosePriority(); }}>
            Asignar
          </button>
        </Box>
      </Modal>

      {/* modal para agregar una solucion */}
      <Modal open={openSolution} onClose={handleCloseSolution}>
        <Box className={style.modalBox}>
          <h2>Anotá la solución</h2>
          <div className={style.field}>
            <div className={style.fieldRow}>
              <label>Solución</label>
              <span className={style.hint}>Mínimo 8 caracteres</span>
            </div>
            {soporte !== null ? (
              <textarea
                id="mi-textareaSolution"
                placeholder={soporte.answer === "Sin resolucion" ? "" : soporte.answer}
                value={solution.solution}
                name="solution"
                onChange={(e) => handleChangeSolution(e)}
              />
            ) : null}
            {errorSolution.solution ? <p className={style.fieldError}>{errorSolution.solution}</p> : null}
          </div>

          <div className={style.ask}>
            <h3>¿Puede el usuario resolverlo por su cuenta la próxima vez?</h3>
            <div className={style.togglePair}>
              <button type="button" className={yesState === true ? style.selectedYes : ""} onClick={(e) => handleClickUresolvedYes(e)}>Sí</button>
              <button type="button" className={yesState === true ? "" : style.selectedNo} onClick={(e) => handleClickUresolvedNo(e)}>No</button>
            </div>
          </div>

          <div className={style.field}>
            <label>¿Deseas agregar algún archivo?</label>
            <div className={`${style.dropzone} ${dragOverSolution ? style.dragOver : ""}`} {...dropSolution}>
              <div className={style.ic}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              </div>
              <div className={style.txt}>
                <strong>Arrastrá un archivo o hacé click para elegirlo</strong>
                <span>{solution.files.length > 0 ? solution.files.map((f) => f.name).join(", ") : "Ningún archivo seleccionado"}</span>
              </div>
              <input type="file" name="files" multiple onChange={(e) => handleChangeFileSolution(e)} />
            </div>
          </div>

          <button
            type="button"
            className={`${style.btn} ${style.btnPrimary}`}
            disabled={!buttonSolution.complete}
            onClick={(e) => { submitSolution(e); handleCloseSolution(); }}
          >
            Cerrar Ticket
          </button>
        </Box>
      </Modal>

      {/* modal para solicitar informacion */}
      <Modal open={openInfo} onClose={handleCloseInfo}>
        <Box className={style.modalBox}>
          <h2>Solicitá más información</h2>
          <div className={style.field}>
            <div className={style.fieldRow}>
              <label>¿Qué necesitás saber?</label>
              <span className={style.hint}>Mínimo 20 caracteres</span>
            </div>
            {soporte !== null ? (
              <textarea id="mi-textareaInfo" value={info.info} name="info" onChange={(e) => handleChangeInfo(e)} />
            ) : null}
            {errorInfo.info ? <p className={style.fieldError}>{errorInfo.info}</p> : null}
          </div>
          <div className={style.field}>
            <label>¿Deseas agregar algún archivo?</label>
            <div className={`${style.dropzone} ${dragOverInfo ? style.dragOver : ""}`} {...dropInfo}>
              <div className={style.ic}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              </div>
              <div className={style.txt}>
                <strong>Arrastrá un archivo o hacé click</strong>
                <span>{info.files.length > 0 ? info.files.map((f) => f.name).join(", ") : "Ningún archivo seleccionado"}</span>
              </div>
              <input type="file" name="files" multiple onChange={(e) => handleChangeFile(e)} />
            </div>
          </div>
          <button
            type="button"
            className={`${style.btn} ${style.btnPrimary}`}
            disabled={!buttonMoreInfo.complete}
            onClick={(e) => { submitInfo(e); handleCloseInfo(); }}
          >
            Aceptar
          </button>
        </Box>
      </Modal>

      {/* modal para agregar informacion (respuesta del solicitante / jefatura) */}
      <Modal open={openInfoUser} onClose={handleCloseInfoUser}>
        <Box className={style.modalBox}>
          <h2>Agregá más información</h2>
          <div className={style.field}>
            <div className={style.fieldRow}>
              <label>Tu respuesta</label>
              <span className={style.hint}>Mínimo 20 caracteres</span>
            </div>
            {soporte !== null ? (
              <textarea id="mi-textareaAnswer" value={answer.answer} name="answer" onChange={(e) => handleChangeAnswer(e)} />
            ) : null}
            {errorAnswer.answer ? <p className={style.fieldError}>{errorAnswer.answer}</p> : null}
          </div>
          <div className={style.field}>
            <label>¿Deseas agregar algún archivo?</label>
            <div className={`${style.dropzone} ${dragOverAnswer ? style.dragOver : ""}`} {...dropAnswer}>
              <div className={style.ic}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              </div>
              <div className={style.txt}>
                <strong>Arrastrá un archivo o hacé click</strong>
                <span>{answer.files.length > 0 ? answer.files.map((f) => f.name).join(", ") : "Ningún archivo seleccionado"}</span>
              </div>
              <input type="file" name="files" multiple onChange={(e) => handleChangeFileAnswer(e)} />
            </div>
          </div>
          <button
            type="button"
            className={`${style.btn} ${style.btnPrimary}`}
            disabled={!buttonAnswer.complete}
            onClick={(e) => { submitInfoUser(e); handleCloseInfoUser(); }}
          >
            Aceptar
          </button>
        </Box>
      </Modal>

      {/* modal para seleccionar proveedor */}
      <Modal open={openProveedor} onClose={handleCloseProveedor}>
        <Box className={style.modalBox}>
          <h2>Elegí el proveedor</h2>
          <div className={style.field}>
            <label>Proveedor</label>
            <select value={asignarProveedor.name} name="name" onChange={(e) => handleAsignarProveedor(e)}>
              {proveedor !== null && proveedor.length > 0
                ? proveedor.map((e) => (
                  <option value={e.name} key={e.id}>{e.name}</option>
                ))
                : null}
            </select>
          </div>
          <div className={style.field}>
            <label>Descripción de la tarea</label>
            <textarea
              id="mi-textareaProveedorDescripcion"
              value={asignarProveedor.description}
              name="description"
              onChange={(e) => handleAsignarProveedor(e)}
            />
          </div>
          <div className={style.modalActions}>
            <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={(e) => handleOpenCreateProveedor(e)}>Crear proveedor</button>
            <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={(e) => handleCloseProveedor(e)}>Cerrar</button>
            <button type="button" className={`${style.btn} ${style.btnPrimary}`} onClick={(e) => { submitAsignarProveedor(e); handleCloseProveedor(); }}>Asignar</button>
          </div>
        </Box>
      </Modal>

      {/* modal para crear proveedor */}
      <Modal open={openCreateProveedor} onClose={handleCloseCreateProveedor}>
        <Box className={style.modalBox}>
          <h2>Ingresá el proveedor</h2>
          <div className={style.field}>
            <label>Nombre</label>
            <input placeholder="Ej: ServiTec Redes SRL" type="text" value={inputProveedor.name} name="name" onChange={(e) => handleChangeCreateProveedor(e)} />
          </div>
          <div className={style.field}>
            <label>Descripción</label>
            <input placeholder="Rubro o especialidad" type="text" value={inputProveedor.description} name="description" onChange={(e) => handleChangeCreateProveedor(e)} />
          </div>
          <div className={style.field}>
            <label>Dirección</label>
            <input placeholder="Calle y número" type="text" value={inputProveedor.address} name="address" onChange={(e) => handleChangeCreateProveedor(e)} />
          </div>
          <div className={style.field}>
            <label>Zona</label>
            <input placeholder="Ej: Zona Norte" type="text" value={inputProveedor.zone} name="zone" onChange={(e) => handleChangeCreateProveedor(e)} />
          </div>
          <button
            type="button"
            className={`${style.btn} ${style.btnPrimary}`}
            onClick={(e) => { submitCreateProveedor(e); handleCloseCreateProveedor(); }}
          >
            Aceptar
          </button>
        </Box>
      </Modal>

    </div>
  );
}

export default Soporte;
