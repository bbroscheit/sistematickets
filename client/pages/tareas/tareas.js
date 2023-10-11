import React, { useState, useEffect } from "react";
import mainStyles from "@/styles/Home.module.css";
import style from "@/modules/tareas.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  border: "2px solid white",
  borderRadius: "10px",
  bgcolor: "#e9e7e7",
  boxShadow: 24,
  p: 4,
};

function Tareas() {
  const [project, setProject] = useState(null);
  const [storiesname, setStoriesname] = useState(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    idStorie: "",
    state: "generado",
    taskdetail: "",
    taskfinishdate: "",
  });

  useEffect(() => {
    try {
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/projectStoriesTask`)
        .then((res) => res.json())
        .then((data) => {
          setProject(data);
        });
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  const handleOpen = () => setOpen(true);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    e.preventDefault();
    let id = e.target.value
    let stories = project.filter ( p => p.id === id)
    setStoriesname({stories : stories[0].userstories });
    console.log("value", e.target.value, stories)
  }
  
  function handleClose(e) {
    setInput({
      id: "router.query.id",
      state: "generado",
      storiesname: "",
      storiesdetail: "",
      priority: "",
    });

    setOpen(false);
  }

  console.log("userstories", storiesname);
  console.log("input", input)

  return (
    <div className={mainStyles.container}>
      <h1 className={mainStyles.title}>Desarrollos</h1>
      <div className={style.titleContainer}>
        <h2 className={mainStyles.subtitle}>Proyectos</h2>
        <h2 className={mainStyles.subtitle}>
          Nueva Tarea{" "}
          <AddCircleOutlineIcon
            onClick={(e) => handleOpen(e)}
            sx={{ cursor: "pointer", color: "#EA6558" }}
          />
        </h2>
      </div>
      <div className={style.tareaAccordeon}>
        {project != null && project.length > 0 ? (
          project.map((e) => (
            <div className={style.projectContainer}>
              <Accordion
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "15px",
                  marginTop: "10px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{e.projectname}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {e.userstories &&
                    e.userstories.map((userstory) => (
                      <div key={userstory.id}>
                        <Accordion
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            marginBottom: "15px",
                            marginTop: "10px",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>{userstory.storiesname}</Typography>
                          </AccordionSummary>
                          {/*  */}
                          {userstory.tasks &&
                            userstory.tasks.map((task) => (
                              <AccordionDetails>
                                <Typography>{task.taskdetail}</Typography>
                              </AccordionDetails>
                            ))}
                        </Accordion>
                      </div>
                    ))}
                </AccordionDetails>
              </Accordion>
            </div>
          ))
        ) : (
          <h2> aùn no hay proyectos asignados a tu usuario </h2>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "#3C3C3B", paddingBottom: "5px" }}
            >
              Proyecto
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              label="Proyecto"
              onChange={(e) => handleSelect(e)}
              sx={{ marginBottom: "12px", color: "#3C3C3B" }}
              // InputProps={{
              //   style: {
              //     color: "white",
              //     borderColor: "white", // Cambia el color del texto
              //     // Puedes agregar más estilos CSS aquí si es necesario
              //   },
              // }}
              // InputLabelProps={{
              //   style: {
              //     color: "black",
              //     backgroundColor: "black", // Cambia el color del texto del placeholder
              //   },
              // }}
            >
              {
                project !== null && project.length > 0 ?
                project.map( e => <MenuItem value={e.id}>{e.projectname}</MenuItem> ):null
              }
            </Select>
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
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: "12px", color: "#3C3C3B" }}
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
                  backgroundColor: "black", // Cambia el color del texto del placeholder
                },
              }}
            >
              {
                    storiesname !== null && storiesname.length > 0 ?
                    storiesname[0].stories.map( e => <MenuItem value={e.id}>{e.storiesname}</MenuItem> ):null
                  }
            </Select>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "#3C3C3B", paddingBottom: "5px" }}
            >
              Tarea
            </InputLabel>

            <TextField
              id="outlined-multiline-flexible"
              label="Tarea"
              fullWidth
              multiline
              maxRows={2}
              name="taskdetail"
              value={input.taskdetail}
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: "12px" }}
              // InputProps={{
              //   style: {
              //     color: "#3C3C3B",
              //     borderColor: "white", // Cambia el color del texto
              //     // Puedes agregar más estilos CSS aquí si es necesario
              //   },
              // }}
            />
            <div className={style.labelContainer}>
              <label for="finishDate">Fecha de finalizacion:</label>
              <input
                type="date"
                id="finishdate"
                name="taskfinishdate"
                onChange={(e) => handleChange(e)}
                value={input.taskfinishdate}
              />
            </div>
            <div className={mainStyles.buttonContainer}>
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
    </div>
  );
}

export default Tareas;
