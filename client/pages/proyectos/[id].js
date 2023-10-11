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
  const [userstories, setUserstories] = useState(null);
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [input, setInput] = useState({
    id: router.query.id,
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
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setUserstories(data[0].userstories);
      });
  }, [router.query.id]);

  const handleOpen = () => setOpen(true);
  const handleOpenTask = () => setOpenTask(true);

  function handleClose(e) {
    setInput({
      id: router.query.id,
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
    
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setUserstories(data[0].userstories);
      });

    setInput({
      id: router.query.id,
      state: "generado",
      storiesname: "",
      storiesdetail: "",
      priority: "",
    });

    setTimeout(() => {
      setOpen(false);
    }, 400);
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
    
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setUserstories(data[0].userstories);
      });

    setTimeout(() => {
      setOpenTask(false);
    }, 400);

    location.reload();
   
  }

   
  return (
    <div className={mainStyle.container}>
      {data !== null && data.length > 0 ? (
        <>
          <h1 className={mainStyle.title}>{data[0].projectname}</h1>
          <p className={Style.detailContainer}>{data[0].projectdetail}</p>
          <hr className={Style.horizontalLine} />
          <div className={Style.userStorieTitle}>
            <div className={Style.titleContainer}>
              <div>
                <h4 className={Style.storiesSubtitle}>Nueva Historia</h4>
                <AddCircleOutlineIcon onClick={(e) => handleOpen(e)} cursor="pointer" sx={{ color:"#EA6558"}} className={Style.titleTarea} />
              </div>
              <div>
                <h4 className={Style.storiesSubtitle}>Nueva Tarea</h4>
                <AddCircleOutlineIcon cursor="pointer" sx={{ color:"#EA6558"}} onClick={(e) => handleOpenTask(e)} />
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
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  name="storiesname"
                  onChange={(e) => handleChange(e)}
                  value={input.storiesname}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      color: "#3C3C3B", 
                      // Cambia el color del texto
                      // Puedes agregar más estilos CSS aquí si es necesario
                    },
                  }}
                  sx={{
                    marginBottom: "12px",
                    color: "white",
                    borderColor: "white",
                  }}
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Descripcion"
                  fullWidth
                  multiline
                  maxRows={2}
                  name="storiesdetail"
                  value={input.storiesdetail}
                  onChange={(e) => handleChange(e)}
                  sx={{ marginBottom: "12px" }}
                  className={classes.textField}
                  InputProps={{
                    style: {
                      color: "#3C3C3B",
                      borderColor: "white", // Cambia el color del texto
                      // Puedes agregar más estilos CSS aquí si es necesario
                    },
                  }}
                />
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: "#3C3C3B" , paddingBottom: "5px"}}
                >
                  Prioridad
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth
                  value={input.priority}
                  label="Priority"
                  name="priority"
                  onChange={(e) => handleSelect(e)}
                  sx={{ marginBottom: "12px", color: "#3C3C3B" }}
                  
                  InputProps={{
                    style: {
                      color: "#3C3C3B",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "black", 
                      
                    },
                  }}
                >
                  <MenuItem value={"Importante"}>Importante</MenuItem>
                  <MenuItem value={"Deseado"}>Deseado</MenuItem>
                </Select>
                <div className={mainStyle.buttonContainer}>
                  <Button
                    variant="contained"
                    sx={{ marginRight: "12px" }}
                    type="submit"
                  >
                    Agregar
                  </Button>
                  <Button variant="contained" onClick={(e) => handleClose(e)}>
                    Cancelar
                  </Button>
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
              <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: "#3C3C3B", paddingBottom: "5px" }}
                >
                  Historia
                </InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth
                  value={input.id}
                  label="Historia"
                  name="idStorie"
                  onChange={(e) => handleSelectTask(e)}
                  sx={{ marginBottom: "12px" , color: "#3C3C3B"}}
                  InputProps={{
                    style: {
                      color: "white",
                      borderColor: "white", // Cambia el color del texto
                      // Puedes agregar más estilos CSS aquí si es necesario
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "black",
                      backgroundColor:"black" // Cambia el color del texto del placeholder
                    },
                  }}
                >
                  {
                    userstories !== null && userstories.length > 0 ?
                    userstories.map( e => <MenuItem value={e.id}>{e.storiesname}</MenuItem> ):null
                  }
                  {/* <MenuItem value={"Importante"}>Importante</MenuItem>
                  <MenuItem value={"Deseado"}>Deseado</MenuItem> */}
                </Select>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Tarea"
                  fullWidth
                  multiline
                  maxRows={2}
                  name="taskdetail"
                  value={inputTask.taskdetail}
                  onChange={(e) => handleChangeTask(e)}
                  sx={{ marginBottom: "12px" }}
                  InputProps={{
                    style: {
                      color: "#3C3C3B",
                      borderColor: "white", // Cambia el color del texto
                      // Puedes agregar más estilos CSS aquí si es necesario
                    },
                  }}
                />
                <div className={Style.labelContainer}>
                  <label for="finishDate">Fecha de finalizacion:</label>
                  <input
                    type="date"
                    id="finishdate"
                    name="taskfinishdate"
                    onChange={(e) => handleChangeTask(e)}
                    value={inputTask.taskfinishdate}
                  />
          </div>
                <div className={mainStyle.buttonContainer}>
                  <Button
                    variant="contained"
                    sx={{ marginRight: "12px" }}
                    type="submit"
                  >
                    Agregar
                  </Button>
                  <Button variant="contained" onClick={(e) => handleCloseTask(e)}>
                    Cancelar
                  </Button>
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
