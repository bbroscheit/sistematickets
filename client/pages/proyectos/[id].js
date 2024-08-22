import React, { useEffect, useState } from "react";
import mainStyle from "@/styles/Home.module.css";
import Style from "@/modules/id.module.css";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import EditIcon from '@mui/icons-material/Edit';
import { postTask} from '@/pages/api/postTask';
import { updateProject } from "../api/updateProject";
import UserstoriesCard from "@/components/UserstoriesCard";
import arrayUserProject from "@/functions/arrayUserProject";
import getFilename from "@/functions/getFilename";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 800,
  border: "2px solid white",
  borderRadius:"10px",
  bgcolor: "#e9e7e7",
  boxShadow: 24,
  p: 4,
};



function projectDetail() {
  const router = useRouter();
  const id = router.query.id;
  const [ user, setUser ] = useState(null)
  const [ allUsers , setAllUsers] = useState(null)
  const [data, setData] = useState(null);
  const [files , setFiles] = useState(null)
  const [idProyecto, setIdProyecto] = useState(0)
  const [task , setTask] = useState(null)
  const [taskFinish , setTaskFinish] = useState(null)
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [worker, setWorker] = useState(null)
  const [ allWorker, setAllWorker ] = useState(null)
  const [inputTask, setInputTask] = useState({
    idProject: idProyecto,
    state: "generado",
    taskdetail: "",
    taskfinishdate: "",
    worker:""
  });
  const [modifyProject, setModifyProject] = useState({
    idProject: idProyecto,
    projectname: "",
    projectdetail:"",
    requirer:"" ,
    worker:[],
    finishdate:"",
    files:""
  });

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
      .then((res) => res.json())
      .then((data) => {
        const allNames = data.map( e => `${e.firstname} ${e.lastname}`)
        setAllUsers(allNames);
        let allWorker = data.filter( e => e.isprojectworker === true)
        allWorker = allWorker.map( e => e.username)
        setAllWorker(allWorker)
        });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject/${id}`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setFiles(data[0].formproject )
        setTask(data[0].newtasks.filter( e => e.state === "generado") )
        setTaskFinish( data[0].newtasks.filter( e => e.state !== "generado") )
        setIdProyecto(data[0].id )
        setWorker( data[0].users  )
        setInputTask({
          ...inputTask,
          idProject: data[0].id 
        })
        setModifyProject({
          ...modifyProject,
          idProject:data[0].id,
          projectname: data[0].projectname  ,
          projectdetail: data[0].projectdetail ,
          requirer: data[0].users[0].username ,
          worker: arrayUserProject( data[0] ) ,
          finishdate:data[0].finishdate ,
          files: data[0].formproject ? data[0].formproject.files : []
        })
      });

      const interval = setInterval(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject/${id}`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject/${id}`)
      .then((res) => res.json())
      .then((data) => {
          setTask(data[0].newtasks)
          setTask(data[0].newtasks.filter( e => e.state === "generado"))
          setTaskFinish(data[0].newtasks.filter( e => e.state !== "generado"))
        });
      }, 5000)

      return (() => {
        clearInterval(interval)
      })

  }, [router.query.id]);

  useEffect(() => {
    let idProject = localStorage.getItem("idProyecto");
    let idParse = JSON.parse(idProject);
  }, []);

  function handleOpenTask(e){
    setOpenTask(true)
    if(worker !== null && worker.length <= 2){
      setInputTask({
        ...inputTask,
        idProject: idProyecto,
        worker: worker[1].id
      })
    }

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

  function handleChangeTask(e) {
    setInputTask({
      ...inputTask,
      [e.target.name]: e.target.value,
    });
  }

  const handleSelectTask = (e) => {
    //console.log(e.target.value)
    setInputTask({
      ...inputTask,
      worker: e.target.value,
    });

  };

  const handleSelectRequirer = (e) => {
    setModifyProject({
      ...modifyProject,
      requirer : [e.target.innerText]
    })
  }


  const handleSelectWorker = (e) => {
    setModifyProject({
      ...modifyProject,
      worker : [...modifyProject.worker, e.target.innerText]
    })
  }

  const handleDeleteWorker = (e) => {
    
    setModifyProject({
      ...modifyProject,
      worker: modifyProject.worker.filter( f => f !== e.target.innerText)
    });

  };

  function handleChange(e) {
    setModifyProject({
      ...modifyProject,
      [e.target.name]: e.target.value,
    });
    
  }

  function handleChangeFile(e) {
    e.preventDefault();
    const filesArray = [...e.target.files];  // Convierte la colección de archivos en un array
    setModifyProject({
      ...modifyProject,
      files: filesArray,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateProject(modifyProject)
    .then(res => {

      if (res.state === "success") {
        setOpenTask(false);
        // setInputTask({
        //   idProject: idProyecto,
        //   state: "generado",
        //   taskdetail: "",
        //   taskfinishdate: "",
        //   worker:""
        // });
        Swal.fire(({
          icon: "success",
          title: "Tu proyecto fue modificado con éxito!",
          showConfirmButton: false,
          timer: 1500
        }));
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
  }

  function handleOpen(e){
    setOpen(true)


  }

  function handleClose(e) {
    setModifyProject({
      ...modifyProject,
      projectname: data[0].projectname  ,
      projectdetail: data.projectdetail ,
      requirer: data[0].users[0].username ,
      worker: arrayUserProject( data[0] ),
      finishdate:data[0] ? data[0].finishdate : "",
      // files: data[0] ? data[0].files[0].file : ""
    })

    setOpen(false);
  }

  console.log("data", modifyProject)

  return (
    <div className={mainStyle.container}>
      {data !== null && data.length > 0 ? (
        <>
          <div className={Style.proyectName}>
            <div className={Style.containertitle}>
            <h1 className={mainStyle.title}>{data[0].projectname}</h1>
            {
              user !== null ?
              <Tooltip title="Editar Proyecto">
                <a onClick={handleOpen}><EditIcon className={Style.iconformulario} /></a>
              </Tooltip> : null
            }
            {
              files !== null && files != [] ?
              <Tooltip title="Descargar Formulario">
              <a href={encodeURI(files.files[0])} download><ContentPasteIcon className={Style.iconformulario} /></a>
              </Tooltip> : null
            }
            </div>
            <p >{data[0].projectdetail}</p>
          </div>
          <hr className={Style.horizontalLine} />
          <div className={Style.userStorieTitle}>
            <div className={Style.titleContainer}>
              <div className={Style.button}>
                <h5 >Nueva Tarea</h5>
                <hr />
                <AddCircleOutlineIcon cursor="pointer" sx={{ color:"#ffffff"}} onClick={(e) => handleOpenTask(e)} />
              </div>
            </div>
          </div>
          {task && task.length > 0  ?
            <div className={Style.containerUserstoriesCard}>
            <h2 className={Style.subTitle}>Tareas Solicitadas</h2>
            <div className={Style.containerUserstoriesCard}>
            {
              task.map((e) => (
                  <UserstoriesCard
                    id={e.id}
                    state={e.state}
                    taskdetail={e.taskdetail}
                    taskfinishdate={e.taskfinishdate}
                    key={e.id}
                  />
                ))
             }
          </div>
          </div> : null}

          {taskFinish && taskFinish.length > 0 ?
          <div className={Style.containerUserstoriesCard}>
          <h2 className={Style.subTitle}>Tareas Terminadas</h2>
          <div className={Style.containerUserstoriesCard}>
              {
               taskFinish.map((e) => (
                  <UserstoriesCard
                    id={e.id}
                    state={e.state}
                    taskdetail={e.taskdetail}
                    taskfinishdate={e.taskfinishdate}
                    key={e.id}
                  />
                ))
              }
          </div>
          </div>: null}

          <Modal
            open={openTask}
            onClose={handleCloseTask}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={(e) => handleSubmitTask(e)}>
                <label className={mainStyle.labelModal}>Tarea</label>
                <input
                  name="taskdetail"
                  placeholder="Detalle"
                  onChange={(e) => handleChangeTask(e)}
                  value={inputTask.taskdetail}
                  type="text"
                  className={mainStyle.inputModal}
                />
                {
                  worker !== null && worker.length > 1 ?
                    <div>
                      <label className={mainStyle.labelModal}>Responsable</label>
                      <select value={inputTask.worker} name="worker" onChange={e => handleSelectTask(e)} className={mainStyle.selectModal}>
                        <option value = "" >Elige un desarrollador</option>
                        {
                          worker.map( e => <option value={e.id} key={e.id}>{e.firstname} {e.lastname}</option> )
                        }
                      </select>
                    </div> : null
                }

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

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={(e) => handleSubmit(e)} >
                <div className={Style.formcontainer}>
                <div className={Style.formhalfcontainer}>
                <label className={mainStyle.labelModal}>Proyecto</label>
                <input
                  name="projectname"
                  placeholder={modifyProject.projectname}
                  onChange={(e) => handleChange(e)}
                  value={modifyProject.projectname}
                  type="text"
                  className={mainStyle.inputModal}
                />
                <label className={mainStyle.labelModal}>Detalle:</label>
                <textarea
                  name="projectdetail"
                  placeholder={modifyProject.projectdetail}
                  onChange={(e) => handleChange(e)}
                  value={modifyProject.projectdetail}
                  type="text"
                  className={mainStyle.inputModal}
                />
                <div className={Style.labelContainer}>
                  <label >Fecha de Finalizacion</label>
                    <input
                      type="date"
                      id="finishdate"
                      name="finishdate"
                      onChange={(e) => handleChange(e)}
                      value={modifyProject.finishdate}
                    />
                </div>
                </div>
                <div className={Style.formhalfcontainer}>
                <label className={mainStyle.labelModal}>Solicitante:</label>
                <p>{modifyProject.requirer}</p>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={allUsers}
                  fullWidth
                  renderInput={(params) => <TextField {...params}/>}
                  onChange={(e) => handleSelectRequirer(e)}
                  sx={{margin:"8px 10px"}}
                />  

                <label className={mainStyle.labelModal}>Desarrolladores:</label>
                {
                  modifyProject.worker.length > 0 ? modifyProject.worker.map( e => <p onClick={handleDeleteWorker}>{e}</p>) : null
                }
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={allWorker}
                  fullWidth
                  renderInput={(params) => <TextField {...params}/>}
                  onChange={(e) => handleSelectWorker(e)}
                  sx={{margin:"8px 10px"}}
                />  

                <h3 className={mainStyle.subtitle}> ¿ Deseas agregar algun archivo ?</h3>
                  <input
                    type="file"
                    name="files"
                    multiple
                    className={mainStyle.inputFile}
                    onChange={(e) => handleChangeFile(e)}
                  />
                {/* {modifyProject.files && modifyProject.files.length > 0
                      ? modifyProject.files.map((file, index) => (
                          <div key={index} ><a href={encodeURI(file)} download> {getFilename(file)}</a></div>
                        ))
                      : null}  */}
                </div>
                </div>
                <div className={mainStyle.buttonContainer}>
                <button type="submit" className={mainStyle.buttonModal}>Modificar</button>
                <button className={mainStyle.buttonModalCancel} onClick={(e) => handleClose(e)}>Cancelar</button>
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
