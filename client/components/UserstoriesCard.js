import React, { useState, useEffect } from "react";
import Style from "@/modules/UserstoriesCard.module.css";
import StyleTask from "@/modules/Taskcontainer.module.css";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { updateCheckTask } from "@/pages/api/updateCheckTask";
import { updateCheckStorie } from "@/pages/api/updateCheckStorie";

function UserstoriesCard({ id, storiesname, storiesdetail }) {
  const [userstorie, setUserstorie] = useState(null);
  const [task, setTask] = useState(null);
  const [taskCumplidas, setTaskCumplidas] = useState(null)
  const storieId = id;

 
 
  function handleCheck( e , id){
    e.preventDefault();
    updateCheckTask(id)
    location.reload();
  }

  function handleCheckStorie( e , id){
    e.preventDefault();
    updateCheckStorie(id)
    location.reload();
    
  }

  useEffect(() => {
    fetch(`http://localhost:3001/userstories/${storieId}`)
    // fetch(`https://localhost:3001/userstories/${storieId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserstorie(data);
        setTask(data[0].tasks);
  });
}, []);

  useEffect(() => {
    if(task !== null){
      let cantidadTaskCumplidas = task.reduce((contador, objeto) => {
        if (objeto.state === "cumplido") {
          return contador + 1;
        }
        return contador;
      }, 0);
      if(task.length > 0 && task.length === cantidadTaskCumplidas){
        setTaskCumplidas(true);
      }else{
        setTaskCumplidas(false);
      }
    }
});

  return (
    <div className={Style.userstoriesCard}>
      <div className={Style.titleContainer}>
        <h3>{storiesname}</h3>
      {
        taskCumplidas === true ? < CheckCircleOutlinedIcon onClick={event => handleCheckStorie(event, userstorie[0].id)} sx={{cursor:"pointer" , color: "white"}}/> : null 
      }
      </div>
      <p className={Style.titleContainer}>{storiesdetail}</p>
      <hr />
      <div className={Style.task}>
        <div>
          <Accordion sx={{ flexDirection: "column", position:"relative", width:"90%", margin:"auto", borderRadius:"15px"}}>
            <AccordionSummary
              expandIcon={
                <ArrowCircleDownIcon className={Style.accordionStyle} sx={{cursor:"pointer", color:"#EA6558"}}/>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ backgroundColor:"#ffffff", width:"90%", margin:"auto"}}
            >
              <Typography sx={{fontWeight:600}}>Tareas</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor:"#ffffff", margin:"auto"}} className={Style.accordionContainer}>
              {task !== null && task !== undefined
                ? task.map((e) => 
                  <div className={Style.accordionDiv} key={e.id}>
                    <p className={Style.accordionParagraph}>{e.taskdetail}</p>
                    <p className={Style.accordionDate}>{e.taskfinishdate}</p>
                    < CheckCircleOutlinedIcon onClick={event => handleCheck(event, e.id)} sx={{cursor:e.state === "cumplido" ? false:"pointer", color: e.state === "cumplido" ? "green": "red"}}/>
                  </div>)
                : null}
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default UserstoriesCard;
