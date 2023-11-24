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
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { updateWorker } from "../api/updateWorker";
import { updateSolutionTicket } from "../api/updateSolutionTicket";
import { postFaq } from "../api/postFaq";
import { updateInfoTicket } from "../api/updateInfoTicket";
import { updateInfoTicketByUser } from "../api/updateInfoTicketByUser";
import { updateCloseTicket } from "../api/updateCloseTicket";
import { contarUsuarios } from "@/functions/contarUsuarios";

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

  // const [openSolution, setOpenSolution] = useState(false);
  // const [openInfo, setOpenInfo] = useState(false);
  // const [openInfoUser, setOpenInfoUser] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [user, setUser] = useState(null);
  const [faq, setFaq] = useState(null);
  const [usuarios, setUsuarios] = useState(null)
  // const [worker, setWorker] = useState(null);
  // const [asignar, setAsignar] = useState({ name: "sin asignar" });
  // const [control, setControl] = useState(0);
  // const [faq, setFaq] = useState(null);
  // const [solution, setSolution] = useState({ solution: "" });
  // const [info, setInfo] = useState({ info: "" });
  // const [yesState, setYesState] = useState(0);
  // const [inputFaq, setInputFaq] = useState({
  //   title: "",
  //   description: "",
  //   answer: "",
  //   uresolved: false,
  //   questioner: "",
  // });

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faqDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFaq(data);
        setUsuarios(contarUsuarios(data.questioner))
      });
  }, [router.query.id]);

  // abre y cierra el modal de la asignacion de worker, se cambio a function porque se reiniciaba la app
  
  // function handleOpen(e) {
  //   e.preventDefault();
  //   setOpen(true);
  // }

  // function handleClose() {
  //   control === 0 ? setControl(1) : setControl(0);
  //   setOpen(false);
  // }

  // asigna un worker al soporte
  
  // function handleAsignar(e) {
  //   e.preventDefault();
  //   setAsignar({
  //     name: e.target.value,
  //   });
  // }

  //guarda en el soporte la asignacion del desarrollador
  
  // function submitAsignar(e) {
  //   e.preventDefault();
  //   updateWorker(id, asignar);
  //   window.location.reload(true);
  // }

  // las siguientes 2 funciones abren y cierran el modal de la solucion

  // function handleOpenSolution(e) {
  //   e.preventDefault();
  //   setOpenSolution(true);
  // }

  // function handleCloseSolution() {
  //   control === 0 ? setControl(1) : setControl(0);
  //   setOpenSolution(false);
  // }

  // function handleChangeSolution(e) {
  //   setSolution({
  //     ...solution,
  //     [e.target.name]: e.target.value,
  //   });
  //   setInputFaq({
  //     ...inputFaq,
  //     answer: e.target.value,
  //   });
  // }

  // dentro del modal de la solucion permite decir si el usuario puede resolverlo o no
  
  // function handleClickUresolvedYes(e) {
  //   e.preventDefault();
  //   setYesState(true);
  //   setInputFaq({
  //     ...inputFaq,
  //     uresolved: true,
  //   });
  // }

  // function handleClickUresolvedNo(e) {
  //   e.preventDefault();
  //   setYesState(false);
  //   setInputFaq({
  //     ...inputFaq,
  //     uresolved: false,
  //   });
  // }

  // function submitSolution(e) {
  //   e.preventDefault();
  //   updateSolutionTicket(soporte.id, solution);
  //   postFaq(inputFaq);

  //   setTimeout(() => {
  //     router.push("/tickets");
  //   }, 300);
  // }

  // las siguientes 2 funciones abren y cierran el modal del pedido de mas informacion

  // function handleOpenInfo(e) {
  //   e.preventDefault();
  //   setOpenInfo(true);
  // }

  // function handleCloseInfo() {
  //   control === 0 ? setControl(1) : setControl(0);
  //   setOpenInfo(false);
  // }

  // function handleChangeInfo(e) {
  //   setInfo({
  //     ...info,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  // function submitInfo(e) {
  //   e.preventDefault();
  //   updateInfoTicket(soporte.id, info);

  //   setTimeout(() => {
  //     router.push("/tickets");
  //   }, 300);
  // }

  // las siguientes 2 funciones abren y cierran el modal del pedido de mas informacion

  // function handleOpenInfoUser(e) {
  //   e.preventDefault();
  //   setOpenInfoUser(true);
  // }

  // function handleCloseInfoUser() {
  //   control === 0 ? setControl(1) : setControl(0);
  //   setOpenInfoUser(false);
  // }

  // function handleChangeInfo(e) {
  //   setInfo({
  //     ...info,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  // function submitInfoUser(e) {
  //   e.preventDefault();
  //   updateInfoTicketByUser(soporte.id, info);

  //   setTimeout(() => {
  //     router.push("/tickets");
  //   }, 300);
  // }

  // funcion para pasar el estado del ticket a Terminado

  // function SubmitCloseTicket(e) {
  //   e.preventDefault();
  //   updateCloseTicket(soporte.id);

  //   setTimeout(() => {
  //     router.push("/tickets");
  //   }, 300);
  // }


  console.log("faq", faq)
  console.log("usuarios", usuarios)

  return (
    <>
      <div >
        {faq !== null ? (
          <>
            <div className={mainStyle.container}>
              <h1 className={mainStyle.title}>Detalle de FAQ</h1>
              <form className={mainStyle.form}>
                <label > Título : </label>
                <input 
                  className={mainStyle.input}>
                </input>
                <label > Detalle : </label>
                <input 
                  className={mainStyle.input}>
                </input>
                <label > Respuesta : </label>
                <input 
                  className={mainStyle.input}>
                </input>
                <div className={style.modalChecks}>
                  <h4>¿ Resuelve el usuario ?</h4>
                  <button
                    className={ faq.uresolved === true ? style.buttonGreen : style.buttonGrey}
                    onClick={(e) => handleClickUresolvedYes(e)}
                  >
                    <CheckCircleOutlineIcon />
                  </button>
                  <button
                    className={ faq.uresolved === true ? style.buttonGrey : style.buttonRed}
                    onClick={(e) => handleClickUresolvedNo(e)}
                  >
                    <CancelOutlinedIcon />
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                  <div style={{ fontWeight: "bold" }}>Usuario</div>
                  <div style={{ fontWeight: "bold" }}>Frecuencia</div>

                  {Object.keys(usuarios).map((usuario) => (
                    <>
                      <div>{usuario}</div>
                      <div>{usuarios[usuario]} veces</div>
                    </>
                    ))}
                  </div>
                <div className={mainStyle.buttonContainer}>
                    <button className={mainStyle.button}> Modificar </button>
                    <button className={mainStyle.button}> Borrar </button>
                    <button className={mainStyle.button}> Borrar y unificar </button>
                </div>
              </form>
            </div>
            
            <div className={style.visibilityContainerMobile}>
            </div>
            </>
        ) : (
          <h3> Loading... </h3>
        )}
      </div>

      {/* <Modal
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
              className={yesState === true ? style.buttonGrey : style.buttonRed}
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
              cols="40"
              rows="10"
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
              value={info.info}
              name="info"
              onChange={(e) => handleChangeInfo(e)}
              cols="40"
              rows="10"
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
      </Modal> */}
    </>
  );
}
export default Soporte;
