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
import { updateCompleteFaq } from '../api/updateCompleteFaq';
import { deleteFaq } from '../api/deleteFaq';

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
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  // const [user, setUser] = useState(null);
  const [faq, setFaq] = useState(null);
  const [usuarios, setUsuarios] = useState(null)
  const [modify, setModify] = useState(false);
  // const [asignar, setAsignar] = useState({ name: "sin asignar" });
  // const [control, setControl] = useState(0);
  // const [faq, setFaq] = useState(null);
  // const [solution, setSolution] = useState({ solution: "" });
  // const [info, setInfo] = useState({ info: "" });
  const [yesState, setYesState] = useState(0);
  const [inputFaq, setInputFaq] = useState({
    title: "",
    description: "",
    answer: "",
    uresolved: false,
  });

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faqDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFaq(data);
        setUsuarios(contarUsuarios(data.questioner))
        setInputFaq({
          title: data.title,
          description: data.description,
          answer: data.answer,
          uresolved: data.uresolved,
        })
      });
  }, [router.query.id]);

  // abre y cierra el modal para aceptar las modificaciones
  
  function openModalModify(e) {
    e.preventDefault();
    setOpen(true);
  }

  function closeModalModify() {
    control === 0 ? setControl(1) : setControl(0);
    setOpen(false);
  }

  // habilita las opciones de modificacion
  
  function handleModify(e) {
    e.preventDefault();
    setModify(true);
  }

   function handleChange(e) {
    setInputFaq({
      ...inputFaq,
      [e.target.name]: e.target.value,
    });
  }

    function handleClose(e) {
      e.preventDefault(e)
      setModify(false);
      setOpen(false);
  }

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

  function submitUpdateFaq(e) {
    e.preventDefault();
    updateCompleteFaq(id, inputFaq);
    
    setTimeout(() => {
      router.push("/faq");
    }, 300);
  }

  // las siguientes 2 funciones abren y cierran el modal del borrado de faq

  function handleOpenDelete(e) {
    e.preventDefault();
    setOpenDelete(true);
  }

  function handleCloseDelete() {
    setOpenDelete(false);
  }

  function submitDeleteFaq(e) {
    e.preventDefault(e)
    deleteFaq(id)

    setTimeout(() => {
      router.push("/faq");
    }, 300);
  }

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
                  className={mainStyle.input} 
                  disabled = {modify === true ? false : true}
                  name= "title"
                  value = {inputFaq.title}
                  onChange = { e => handleChange(e)}
                />
                <label > Detalle : </label>
                <input 
                  className={mainStyle.input}
                  disabled = {modify === true ? false : true}
                  name= "description"
                  value = {inputFaq.description}
                  onChange = { e => handleChange(e)}
                />
                
                <label > Respuesta : </label>
                <input 
                  className={mainStyle.input} 
                  disabled = {modify === true ? false : true}
                  name= "answer"
                  value = {inputFaq.answer}
                  onChange = { e => handleChange(e)}
                />
                
                <div className={style.modalChecks}>
                  <h4>¿ Resuelve el usuario ?</h4>
                  <button
                    className={ inputFaq.uresolved === true ? style.buttonGreen : style.buttonGrey}
                    onClick={(e) => handleClickUresolvedYes(e)}
                    disabled = {modify === true ? false : true}
                  >
                    <CheckCircleOutlineIcon />
                  </button>
                  <button
                    className={ inputFaq.uresolved === true ? style.buttonGrey : style.buttonRed}
                    onClick={(e) => handleClickUresolvedNo(e)}
                    disabled = {modify === true ? false : true}
                  >
                    <CancelOutlinedIcon />
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                  <div ><h4>Usuario</h4></div>
                  <div ><h4>Frecuencia</h4></div>

                  {Object.keys(usuarios).map((usuario) => (
                    <>
                      <div><p>{usuario}</p></div>
                      <div><p>{usuarios[usuario]} veces</p></div>
                    </>
                    ))}
                  </div>
                <div className={mainStyle.buttonContainer}>
                  {
                    modify === false ? <button className={mainStyle.button} onClick={ e => handleModify(e)}> Modificar </button> : null
                  }
                  {
                    modify === false ? null : <button className={mainStyle.button} onClick={ e => openModalModify(e)}> Guardar </button>
                  }
                  <button className={mainStyle.button} onClick={ e => handleOpenDelete(e)}> Borrar </button>
                  <button className={mainStyle.button}> Unificar y Borrar </button>
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

       <Modal
        open={open}
        onClose={closeModalModify}
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
          <div className={mainStyle.buttonContainer}>
          <button
            onClick={(e) => {
              submitUpdateFaq(e);
            }}
            className={style.modalButton}
          >
            Guardar
          </button>
          <button
            onClick={(e) => {
              handleClose(e);
            }}
            className={style.modalButton}
          >
            Cancelar
          </button>
          </div>
        </Box>
      </Modal>
           
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
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
            ¿ Deseas borrar esta FAQ ?
          </Typography>
          <div>
          <button
            onClick={(e) => {
              submitDeleteFaq(e);
              
            }}
            className={style.modalButton}
          >
            Aceptar
          </button>
          <button
            onClick={(e) => {

              handleCloseDelete(e);
            }}
            className={style.modalButton}
          >
            Cancelar
          </button>
          </div>
        </Box>
      </Modal>
             {/*
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
