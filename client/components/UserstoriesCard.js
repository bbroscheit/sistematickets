import React, { useState, useEffect } from "react";
import Style from "@/modules/UserstoriesCard.module.css";
import Taskcontainer from "@/components/Taskcontainer";
import StyleTask from "@/modules/Taskcontainer.module.css";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

function UserstoriesCard({ id, storiesname, storiesdetail }) {
  const [userstorie, setUserstorie] = useState(null);
  const [task, setTask] = useState(null);
  const storieId = id;

  useEffect(() => {
    fetch(`http://localhost:3001/userstories/${storieId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserstorie(data);
        setTask(data[0].tasks);
      });
  }, []);

  console.log("userstorie", userstorie);

  return (
    <div className={Style.userstoriesCard}>
      <h3>{storiesname}</h3>
      <p>{storiesdetail}</p>
      <hr />
      <div className={StyleTask.task}>
        <div>
          <Accordion sx={{ display: "flex", flexDirection: "column" }}>
            <AccordionSummary
              expandIcon={
                <ArrowCircleDownIcon className={Style.accordionStyle} />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ bgcolor: "#0f0e17", width: "100%" }}
            >
              <Typography>Tareas</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#0f0e17" }}>
              {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
              {task !== null && task !== undefined
                ? task.map((e) => <Typography className={Style.accordionContainer}>{e.taskdetail}</Typography>)
                : null}
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default UserstoriesCard;
