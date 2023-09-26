import React , { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Style from "@/modules/Taskcontainer.module.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


function Taskcontainer(id) {
 


  return (
    <div className={Style.task}>
      <div>
      <Accordion sx={{display:"flex", flexDirection:"column"}} > 
         
         <AccordionSummary
          expandIcon={<ArrowCircleDownIcon className={Style.accordionStyle}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{bgcolor:"#0f0e17", width:"100%"}}
          
        >
         
        <Typography>Tareas</Typography>
        </AccordionSummary >
        <AccordionDetails sx={{bgcolor:"#0f0e17"}} >
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      
    </div>
    </div>
  );
}

export default Taskcontainer;
