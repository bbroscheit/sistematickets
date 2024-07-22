import React, { useEffect, useState } from "react";
import mainStyle from "@/styles/Home.module.css";
import Style from "@/modules/id.module.css";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { postTask} from '@/pages/api/postTask';
import UserstoriesCard from "@/components/UserstoriesCard";

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
  const id = router.query.id;
  const [data, setData] = useState(null);
  const [idProyecto, setIdProyecto] = useState(0)
  const [task , setTask] = useState(null)
  const [taskFinish , setTaskFinish] = useState(null)
  const [openTask, setOpenTask] = useState(false);
  const [worker, setWorker] = useState(null)
  const [inputTask, setInputTask] = useState({
    idProject: idProyecto,
    state: "generado",
    taskdetail: "",
    taskfinishdate: "",
    worker:""
  });

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject/${id}`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setTask(data[0].newtasks.filter( e => e.state === "generado"))
        setTaskFinish(data[0].newtasks.filter( e => e.state !== "generado"))
        setIdProyecto(data[0].id)
        setWorker(data[0].users)
        setInputTask({
          ...inputTask,
          idProject: data[0].id
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
    console.log(e.target.value)
    setInputTask({
      ...inputTask,
      worker: e.target.value,
    });

  };

  function handleSubmitTask(e) {
    e.preventDefault();
    postTask(inputTask)
    .then(res => {
        
      if (res.state === "success") {
        setOpenTask(false);
        setInputTask({
          idProject: idProyecto,
          state: "generado",
          taskdetail: "",
          taskfinishdate: "",
          worker:""
        });
        Swal.fire(({
          icon: "success",
          title: "Tu tarea fue generado con éxito!",
          showConfirmButton: false,
          timer: 1500
        }));
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
  }

  return (
    <div className={mainStyle.container}>
      {data !== null && data.length > 0 ? (
        <>
          <div className={Style.proyectName}>
            <h1 className={mainStyle.title}>{data[0].projectname}</h1>
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
        </>
      ) : null}
    </div>
  );
}

export default projectDetail;
