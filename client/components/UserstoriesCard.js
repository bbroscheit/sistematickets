import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Style from "@/modules/UserstoriesCard.module.css";
import mainStyle from '../styles/Home.module.css'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { updateCheckTask } from "@/pages/api/updateCheckTask";
import { updateNewtask } from "@/pages/api/updateNewtask";
import  girafechas  from '@/functions/girafechas'

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

function UserstoriesCard({ id, state, taskdetail, taskfinishdate }) {
  const router = useRouter();
  const [idTask, setIdTask] = useState(id) 
  const [worker , setWorker ] = useState({})
  let workerName = ""
  const [openTask, setOpenTask] = useState(false);
  const [inputTask, setInputTask] = useState({
    id: id,
    taskfinishdate : ""
  });

  
  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/userByTask/${id}`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/userByTask/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorker(data)
        workerName = data.username || ""
      });
  }, [id]);

  

  function handleClick( e , idTask){
    e.preventDefault();
    updateCheckTask(idTask)
  }

  function handleOpenTask(e){
    setOpenTask(true)
  }

  function handleCloseTask(e) {
    setOpenTask(false);
  }

  function handleChangeTask(e) {
    setInputTask({
      ...inputTask,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmitTask(e) {
    e.preventDefault();
    updateNewtask(inputTask)
    .then(res => {
        
      if (res.state === "success") {
        setOpenTask(false);
        setInputTask({
          id: id,
          taskfinishdate : ""
        });
        Swal.fire(({
          icon: "success",
          title: "Tu tarea fue modificada con éxito!",
          showConfirmButton: false,
          timer: 1500
        }));
      }
    })
    .catch(error => {
      console.error("Error al enviar el formulario:", error);
    });
  }

  // console.log("taskfinishdate",taskfinishdate , "taskdetail" , taskdetail )

  return (
    <div className={Style.userstoriesCard}>
      <div className={Style.titleContainer}>
          
          <h3 onClick={(e) => { router.push(`/tareas/[id]`, `/tareas/${id}`) }}>{taskdetail}</h3>
        
          {worker.length > 0 ? 
            <h4>{worker[0].firstname}</h4> : <h4></h4>
          }

          {
            state !== "cumplido" ?
              <h4 className={Style.cursorPointer} onClick={e => handleOpenTask(e)} >{girafechas(taskfinishdate)}</h4> : 
              <h4>{girafechas(taskfinishdate)}</h4>
          }

          
          {
            state !== "cumplido" ?
            < CheckCircleOutlinedIcon sx={{cursor:"pointer"}} className={ state !== "cumplido" ? Style.colorIconRed : Style.colorIconGreen } onClick={e => handleClick(e , idTask)}/> : 
            < CheckCircleOutlinedIcon sx={{cursor:"pointer"}} className={ state !== "cumplido" ? Style.colorIconRed : Style.colorIconGreen } onClick={e => handleOpenTask(e)}/> 
          }
          
      </div>

      <Modal
            open={openTask}
            onClose={handleCloseTask}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={(e) => handleSubmitTask(e)} className={Style.formModal}>
                <label className={Style.labelModal}>Asigna una nueva fecha de finalizacíon</label>        
                <div className={Style.labelContainer}>
                  <label>Fecha de Finalizacion</label>
                    <input
                      type="date"
                      id="finishdate"
                      name="taskfinishdate"
                      onChange={(e) => handleChangeTask(e)}
                      value={inputTask.taskfinishdate}
                    />
                </div>
                <div className={mainStyle.buttonContainer}>
                  <button type="submit" className={mainStyle.buttonModal}>Aceptar</button>
                  <button className={mainStyle.buttonModalCancel} onClick={(e) => handleCloseTask(e)}>Cancelar</button>
                </div>
              </form>
            </Box>
          </Modal>
    </div>


  );
}

export default UserstoriesCard;
