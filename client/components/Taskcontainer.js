import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Style } from '@mui/icons-material';

function Taskcontainer(id) {
  return (
    <div className={Style.taskcontainer}>
        <h4>Tareas</h4>
        <AddCircleOutlineIcon />
    </div>
  )
}

export default Taskcontainer