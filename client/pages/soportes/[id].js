import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../modules/detail.module.css";
import mainStyle from "@/styles/Home.module.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
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
  const id = router.query.id ;

  const [openSolution, setOpenSolution] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openInfoUser, setOpenInfoUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const [newPriority, setNewPriority] = useState({ name: "sin asignar" });
  const [user, setUser] = useState(null);
  const [soporte, setSoporte] = useState(null);
  const [worker, setWorker] = useState(null);
  const [asignar, setAsignar] = useState({ name: "sin asignar" });
  const [control, setControl] = useState(0);
  const [faq, setFaq] = useState(null);
  const [solution, setSolution] = useState({ solution: "" });
  const [info, setInfo] = useState({ info: "" });
  const [yesState, setYesState] = useState(0);
  const [soporteId, setSoporteId] = useState(1)
  const [answer , setAnswer] = useState({ info: "" })
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

  console.log("soporte", soporte)
  console.log("inputFaq", inputFaq)
  // abre y cierra el modal de la asignacion de worker, se cambio a function porque se reiniciaba la app
  function handleOpen(e) {
    e.preventDefault();
    setOpen(true);
  }

  function handleClose() {
    control === 0 ? setControl(1) : setControl(0);
    setOpen(false);
  }

  function handleOpenPriority(e) {
    e.preventDefault();
    setOpenPriority(true);
  }

  function handleClosePriority() {
    control === 0 ? setControl(1) : setControl(0);
    setOpenPriority(false);
  }

  // asigna un worker al soporte
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
    setEmail({
      ...email,
      answer: e.target.value
    })
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
                  {user !== null && user.sector !== "Sistemas" ? (
                    <div className={style.stateContainer}>
                      
                        <h3> Asignado a : </h3> <p>{soporte.worker}</p>
                      
                      {user.name === "Administrador" &&
                      soporte.state !== "Terminado" ? (
                        <button
                          onClick={(e) => {
                            handleOpen(e);
                          }}
                        >
                          {" "}
                          Cambiar{" "}
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    <div className={style.stateContainer}>
                      <h3>Asignado a : </h3>
                      <p>{soporte.worker}</p>
                      {soporte.state !== "Terminado" ? (
                        <button
                          onClick={(e) => {
                            handleOpen(e);
                          }}
                        >
                          {" "}
                          Modificar{" "}
                        </button>
                      ) : null}
                    </div>
                  )}

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

              <div className={style.form}>
                <div>
                  <h3 className={style.label}>Detalle : </h3>
                  <textarea
                    placeholder={soporte.detail}
                    // readOnly
                    cols="80"
                    rows="5"
                    className={style.textarea}
                  />
                </div>

                {user !== null &&
                user.sector !== "Sistemas" ? null : soporte !== null &&
                  soporte.answer !== "Sin resolución" ? (
                  <div>
                    <h3 className={style.label}>Solución : </h3>
                    <textarea
                      placeholder={soporte.answer}
                      // disabled
                      cols="80"
                      rows="14"
                      className={style.textarea}
                    />
                  </div>
                ) : null}

                {soporte !== null &&
                soporte.files &&
                soporte.files.length > 0 ? (
                  <>
                    <h3 className={style.label}>Adjuntos:</h3>
                    {soporte.files && soporte.files.length > 0
                      ? soporte.files.map((file, index) => (
                          <div key={index} className={style.adjuntos}>
                            {/* <a href={encodeURI("/ticket_22/new_Free tour Munich.pdf")} download> */}
                            <a href={encodeURI(file)} download>
                              {getFilename(file)}
                            </a>
                          </div>
                        ))
                      : null}
                  </>
                ) : null}

                {user !== null && user.sector !== "Sistemas" ? (
                  soporte !== null &&
                  soporte.worker !== "sin asignar" &&
                  soporte.state === "Informacion" ? (
                    <button
                      onClick={(e) => handleOpenInfoUser(e)}
                      className={mainStyle.button}
                    >
                      Agregar Información
                    </button>
                  ) : null
                ) : soporte !== null &&
                        soporte.state === "Asignado"  ? (
                          <div className={mainStyle.buttonContainer}>
                            <button
                              onClick={(e) => submitAcceptAssigment(e)}
                              className={mainStyle.button}
                            >
                              Comenzar Desarrollo
                            </button>
                          </div>
                        ): soporte !== null &&
                        soporte.worker !== "sin asignar" &&
                        soporte.state !== "Completado" &&
                        soporte.state !== "Terminado" &&
                        soporte.state !== "Informacion" ? (
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
                          </div>
                        ) : null}

                {user !== null && user.sector !== "Sistemas" ? (
                  soporte !== null &&
                  soporte.worker !== "sin asignar" &&
                  soporte.state === "Completado" ? (
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
                    </div>
                  ) : null
                ) : null}
              </div>
            </div>

          </>
        ) : (
          <h3> Loading... </h3>
        )}
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
              placeholder={
                soporte !== null && soporte.answer === "Sin resolucion"
                  ? ""
                  : soporte.answer
              }
              value={solution.solution}
              name="solution"
              onChange={(e) => handleChangeSolution(e)}
              className={style.modalTextarea}
            />
          ) : null}
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
          </div>
          <button
            onClick={(e) => {
              submitSolution(e);
              handleCloseSolution();
            }}
            className={style.modalButton}
          >
            Cerrar Ticket
          </button>
        </Box>
      </Modal>

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
              value={info.info}
              name="info"
              onChange={(e) => handleChangeInfo(e)}
              className={style.modalTextarea}
            />
          ) : null}

          <button
            onClick={(e) => {
              submitInfo(e);
              handleCloseInfo();
            }}
            className={style.modalButton}
          >
            Aceptar
          </button>
        </Box>
      </Modal>

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
              value={answer.answer}
              name="answer"
              onChange={(e) => handleChangeAnswer(e)}
              className={style.modalTextarea}
            />
          ) : null}

          <button
            onClick={(e) => {
              submitInfoUser(e);
              handleCloseInfoUser();
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
