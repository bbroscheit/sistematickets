import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import style from "../../modules/detailFaq.module.css";
import mainStyle from "@/styles/Home.module.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { contarUsuarios } from "@/functions/contarUsuarios";
import { updateCompleteFaq } from '../api/updateCompleteFaq';
import { deleteFaq } from '../api/deleteFaq';
import { unifyFaq } from '../api/unifyFaq';

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

  const [openUnify, setOpenUnify] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [faq, setFaq] = useState(null);
  const [usuarios, setUsuarios] = useState(null)
  const [modify, setModify] = useState(false);
  const [allFaq, setAllFaq] = useState(null);
  const [filterFaq, setFilterFaq] = useState(null);
  const [yesState, setYesState] = useState(0);
  const [inputFaq, setInputFaq] = useState({
    title: "",
    description: "",
    answer: "",
    uresolved: false,
  });

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faqDetail/${id}`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faqDetail/${id}`)
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

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`)
      .then((res) => res.json())
      .then((data) => {
        setAllFaq(data);
      });
  }, [router.query.id]);

  // abre y cierra el modal para aceptar las modificaciones
  
  function openModalModify(e) {
    e.preventDefault();
    setOpen(true);
  }

  function closeModalModify() {
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

   // las siguientes 2 funciones abren y cierran el modal de la unificacion

  function handleOpenUnify(e) {
    e.preventDefault();
    setOpenUnify(true);
  }

  function handleCloseUnify() {
    setOpenUnify(false);
  }

  function handleSubmitUnify(e) {
    e.preventDefault();
    unifyFaq(id, filterFaq);
    
    setTimeout(() => {
      router.push("/faq");
    }, 300);
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
    .then(res => {
        if (res.state === "success") {
      
      Swal.fire(({
        icon: "success",
        title: "Tu soporte fue borrado con éxito!",
        showConfirmButton: false,
        timer: 1500
      }));
      setTimeout(() => {
        router.push("/Faq");
      }, 1500);
    }
  })
  .catch(error => {
    console.error("Error al enviar el formulario:", error);
  });
    setTimeout(() => {
      router.push("/Faq");
    }, 300);
  }

  function handleAsignar(e) {
    setFilterFaq( allFaq.filter( f => f.title === e.target.value));
  }

  function handleSubmitUnify(e) {
    e.preventDefault();
    unifyFaq(id, filterFaq);

    setTimeout(() => {
      router.push("/faq");
    }, 300);
  }

  return (
    <>
      <div >
        {faq !== null ? (
          <>
            <div className={style.container}>
              <h1 className={style.title}>Detalle de FAQ</h1>
              <form className={mainStyle.form}>
                <div className={mainStyle.minimalGrid}>
                  <label className={style.label}> Título : </label>
                  <input 
                    className={mainStyle.input} 
                    disabled = {modify === true ? false : true}
                    name= "title"
                    value = {inputFaq.title}
                    onChange = { e => handleChange(e)}
                  />
                </div>
                <div className={mainStyle.minimalGrid}>
                  <label > Detalle : </label>
                  <textarea
                    className={mainStyle.textarea}
                    disabled = {modify === true ? false : true}
                    name= "description"
                    value = {inputFaq.description}
                    onChange = { e => handleChange(e)}
                  />
                </div>
                <div className={mainStyle.minimalGrid}>
                  <label > Respuesta : </label>
                  <textarea 
                    className={mainStyle.textarea} 
                    disabled = {modify === true ? false : true}
                    name= "answer"
                    value = {inputFaq.answer}
                    onChange = { e => handleChange(e)}
                  />
                </div>
                <div className={style.modalChecks}>
                  <h4>¿ Resuelve el usuario ?</h4>
                  <div>
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
                </div>
                <div className={style.grid}>
                  <div ><h4>Usuario</h4></div>
                  <div ><h4>Frecuencia</h4></div>

                  {Object.keys(usuarios).map((usuario) => (
                    <>
                      <div><p>{usuario}</p></div>
                      <div><p>{usuarios[usuario]} veces</p></div>
                    </>
                    ))}
                  </div>
                <div className={style.buttonContainer}>
                  {
                    modify === false ? <button className={style.button} onClick={ e => handleModify(e)}> Modificar </button> : null
                  }
                  {
                    modify === false ? null : <button className={style.button} onClick={ e => openModalModify(e)}> Guardar </button>
                  }
                  <button className={style.button} onClick={ e => handleOpenDelete(e)}> Borrar </button>
                  <button className={style.button} onClick={ e => handleOpenUnify(e)}> Unificar y Borrar </button>
                </div>
              </form>
            </div>
            
            <div className={style.visibilityContainerMobile}>
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
                <textarea
                  className={style.textarea}
                  disabled = {modify === true ? false : true}
                  name= "description"
                  value = {inputFaq.description}
                  onChange = { e => handleChange(e)}
                />
                
                <label > Respuesta : </label>
                <textarea
                  className={style.textarea} 
                  disabled = {modify === true ? false : true}
                  name= "answer"
                  value = {inputFaq.answer}
                  onChange = { e => handleChange(e)}
                />
                
                <div className={style.modalChecks}>
                  <h4>¿ Resuelve el usuario ?</h4>
                  <div>
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
                </div>
                <div className={style.grid}>
                  <div ><h4>Usuario</h4></div>
                  <div ><h4>Frecuencia</h4></div>

                  {Object.keys(usuarios).map((usuario) => (
                    <>
                      <div><p>{usuario}</p></div>
                      <div><p>{usuarios[usuario]} veces</p></div>
                    </>
                    ))}
                  </div>
                <div className={style.buttonContainer}>
                  {
                    modify === false ? <button className={style.button} onClick={ e => handleModify(e)}> Modificar </button> : null
                  }
                  {
                    modify === false ? null : <button className={style.button} onClick={ e => openModalModify(e)}> Guardar </button>
                  }
                  <button className={style.button} onClick={ e => handleOpenDelete(e)}> Borrar </button>
                  <button className={style.button} onClick={ e => handleOpenUnify(e)}> Unificar </button>
                </div>
              </form>
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
             
      <Modal
        open={openUnify}
        onClose={handleCloseUnify}
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
            Elije con que FAQ quieres unificar
          </Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            // value={asignar.name}
            className={style.modalSelect}
            native = "true"
            onChange={(e) => handleAsignar(e)}
          >
            {allFaq !== null && allFaq.length > 0
              ? allFaq.map((e) => (
                  <MenuItem value={e.title} key={e.id}>
                    {e.title}{" "}
                  </MenuItem>
                ))
              : null}
          </Select>
            <div>
          <button
            onClick={(e) => {
              handleSubmitUnify(e);
            }}
            className={style.modalButton}
          >
            Aceptar
          </button>
          <button
            onClick={(e) => {
              
              handleCloseUnify(e);
            }}
            className={style.modalButton}
          >
            Cancelar
          </button>
          </div>
        </Box>
      </Modal>
          
    </>
  );
}
export default Soporte;
