import React, { useEffect, useState } from "react";
import mainStyle from "@/styles/Home.module.css";
import Style from "@/modules/id.module.css";
import { makeStyles } from '@mui/styles';
import { useRouter } from "next/router";
import Router from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { postUserstorie } from "@/pages/api/postUserstories";
import { postTask} from '@/pages/api/postTask';
import UserstoriesCard from "@/components/UserstoriesCard";

const useStyles = makeStyles( theme => ({
  textField:{
    borderColor:"white"
  }
}))

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid white",
  borderRadius:"10px",
  bgcolor: "#e9e7e7",
  boxShadow: 24,
  p: 4,
};



function projectDetail() {
  const router = useRouter();
  const classes = useStyles();
  const id = router.query.id;
  const [data, setData] = useState(null);
  const [idProyecto, setIdProyecto] = useState(2)
  const [userstories, setUserstories] = useState(null);
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [input, setInput] = useState({
    id: 0,
    state: "generado",
    storiesname: "",
    storiesdetail: "",
    priority: "",
  });
   const [inputTask, setInputTask] = useState({
    idStorie: "",
    state: "generado",
    taskdetail: "",
    taskfinishdate: "",
  });

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project/${idProyecto}`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project/${idProyecto}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setUserstories(data[0].userstories);
      });
  }, [router.query.id]);

  useEffect(() => {
    let idProject = localStorage.getItem("idProyecto");
    let idParse = JSON.parse(idProject);
    setIdProyecto(idProject);
    setInput({
      ...input,
      id: idProject
    })
  }, []);


  const handleOpen = () => setOpen(true);
  const handleOpenTask = () => setOpenTask(true);

  function handleClose(e) {
    setInput({
      id: id ? id : idProyecto,
      state: "generado",
      storiesname: "",
      storiesdetail: "",
      priority: "",
    });

    setOpen(false);
  }

  function handleCloseTask(e) {
    setInputTask({
      idStorie: "",
      state: "generado",
      taskdetail: "",
      taskfinishdate: "",
    });

    setOpenTask(false);
  }

  // function handleCheck(e) {
  //   console.log("entraste a check");
  // }

  // function handleDelete(e) {
  //   console.log("entraste a delete");
  // }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeTask(e) {
    setInputTask({
      ...inputTask,
      [e.target.name]: e.target.value,
    });
  }

  const handleSelect = (e) => {
    setInput({
      ...input,
      priority: e.target.value,
    });
  };

  const handleSelectTask = (e) => {
    setInputTask({
      ...inputTask,
      idStorie: e.target.value,
    });

  };

  function handleSubmit(e) {
    e.preventDefault();
    postUserstorie(input);
    alert("storie generada con exito");

    // fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project/${id}`)
    // // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data);
    //     setUserstories(data[0].userstories);
    //   });

    setInput({
      id: id ? id : idProyecto,
      state: "generado",
      storiesname: "",
      storiesdetail: "",
      priority: "",
    });

    setTimeout(() => {
      setOpen(false);
    }, 400);

    location.reload();
  }

  function handleSubmitTask(e) {
    e.preventDefault();
    postTask(inputTask);
    alert("Tarea generada con exito");

    setInputTask({
      idStorie: "",
      state: "generado",
      taskdetail: "",
      taskfinishdate: "",
    });

    // fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project/${id}`)
    // // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setData(data);
    //     setUserstories(data[0].userstories);
    //   });

    setTimeout(() => {
      setOpenTask(false);
    }, 400);

    location.reload();

  }

  console.log("input", input)

  return (
    <div className={mainStyle.container}>
      {data !== null && data.length > 0 ? (
        <>
          <div>
            <h1 className={`${mainStyle.title} ${style.margin}`}>{data[0].projectname}</h1>
            <p >{data[0].projectdetail}</p>
          </div>
          <hr className={Style.horizontalLine} />
          <div className={Style.userStorieTitle}>
            <div className={Style.titleContainer}>
              <div className={Style.button}>
                <h5 >Nueva Historia</h5>
                <hr />
                <AddCircleOutlineIcon onClick={(e) => handleOpen(e)} cursor="pointer" sx={{ color:"#ffffff"}} className={Style.titleTarea} />
              </div>
              <div className={Style.button}>
                <h5 >Nueva Tarea</h5>
                <hr />
                <AddCircleOutlineIcon cursor="pointer" sx={{ color:"#ffffff"}} onClick={(e) => handleOpenTask(e)} />
              </div>
            </div>
          </div>
          <div className={Style.containerUserstoriesCard}>
            {userstories && userstories.length > 0
              ? userstories.map((e) => (
                  <UserstoriesCard
                    id={e.id}
                    storiesname={e.storiesname}
                    storiesdetail={e.storiesdetail}
                    key={e.id}
                  />
                ))
              : null}
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <label className={mainStyle.labelModal}>Nombre</label>
                <input
                  name="storiesname"
                  placeholder="Titulo"
                  onChange={(e) => handleChange(e)}
                  value={input.storiesname}
                  type="text"
                  className={mainStyle.inputModal}
                />
                <label className={mainStyle.labelModal}>Descripción</label>
                <input
                  name="storiesdetail"
                  placeholder="Titulo"
                  onChange={(e) => handleChange(e)}
                  value={input.storiesdetail}
                  type="text"
                  className={mainStyle.inputModal}
                />

                <label className={mainStyle.labelModal}>Prioridad</label>

                <select value={input.priority} name="priority" onChange={e => handleSelect(e)} className={mainStyle.selectModal}>
                  <option value = "" className={mainStyle.optionModal}>Elige una prioridad</option>
                  <option value="Importante" className={mainStyle.optionModal}>Importante</option>
                  <option value="Deseado" className={mainStyle.optionModal}>Deseado</option>
                </select>

                <div className={mainStyle.buttonContainer}>
                <button type="submit" className={mainStyle.buttonModal}>Agregar</button>
                <button className={mainStyle.buttonModalCancel} onClick={(e) => handleClose(e)}>Cancelar</button>

                </div>
              </form>
            </Box>
          </Modal>

          <Modal
            open={openTask}
            onClose={handleCloseTask}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={(e) => handleSubmitTask(e)}>
                <label className={mainStyle.labelModal}>Historia</label>
                <select value={input.idStorie} name="idStorie" onChange={e => handleSelectTask(e)} className={mainStyle.selectModal}>
                  <option value = "" >Elige una Historia</option>
                  {
                    userstories !== null && userstories.length > 0 ?
                    userstories.map( e => <option value={e.id} key={e.id}>{e.storiesname}</option> ):null
                  }

                </select>
            
                <label className={mainStyle.labelModal}>Tarea</label>
                <input
                  name="taskdetail"
                  placeholder="Detalle"
                  onChange={(e) => handleChangeTask(e)}
                  value={inputTask.taskdetail}
                  type="text"
                  className={mainStyle.inputModal}
                />
                
                <div className={Style.labelContainer}>
                <label >Fecha de Finalizacion</label>
                  <input
                    type="date"
                    
                    id="finishdate"
                    name="taskfinishdate"
                    onChange={(e) => handleChangeTask(e)}
                    value={inputTask.taskfinishdate}
                  />
          </div>
                <div className={mainStyle.buttonContainer}>
                <button type="submit" className={mainStyle.buttonModal}>Agregar</button>
                <button className={mainStyle.buttonModalCancel} onClick={(e) => handleCloseTask(e)}>Cancelar</button>
                </div>
              </form>
            </Box>
          </Modal>
        </>
      ) : null}
    </div>
  );
}

export default projectDetail;
