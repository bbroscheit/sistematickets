import React from 'react'
import { useRouter } from "next/router";
import { useState, useEffect,  } from 'react'
import { Tooltip } from "@mui/material";
import mainStyle from "@/Styles/Home.module.css"
import Style from "@/modules/tareasid.module.css"
import giraFechas from '@/functions/girafechas';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { updateTask } from '../api/updateTask';

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



function TaskId() {
    const router = useRouter();
    const id = router.query.id;
    const [ data , setData ] = useState(null)
    const [ user, setUser ] = useState(null)
    const [ open, setOpen ] = useState(false);
    const [ input, setInput ] = useState({
        id: id,
        description: ""
    })

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/task/${id}`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/task/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setInput({
                id : data.id,
                description : data.taskdetail
            })
          });
       
      }, [router.query.id]);
    
    useEffect(() => {
        let userLogin = localStorage.getItem("user");
        let loginParse = JSON.parse(userLogin);
        setUser(loginParse);
      }, []);

    function handleOpen(e){
        setOpen(true)
    }

    function handleClose(e) {
        setInput({
            id: data.id,
            description: data.taskdetail
        })
        setOpen(false);
    }

    function handleChange(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSubmit(e ,input){
        e.preventDefault()
        updateTask(input)
        .then(res => {
            if (res.state === "success") {
                setData({
                    ...data,
                    taskdetail : input.description
                })
                handleClose();
                Swal.fire(({
                    icon: "success",
                    title: "Tu tarea fue modificado con éxito!",
                    showConfirmButton: false,
                    timer: 1500
                }));
              
            }
          })
          .catch(error => {
            console.error("Error al enviar el formulario:", error);
          });
    }

    //console.log(data)
    //console.log(input)
    return (
        <div className={mainStyle.container}>
            <div className={Style.titleContainer}>
            <h1 className={Style.title}> Detalle </h1>
            {
                user !== null && user.isprojectmanager === true ?
                <Tooltip title="Editar Tarea">
                    <a onClick={handleOpen}><EditIcon className={Style.iconformulario} /></a>
                </Tooltip> : null 
            }
            
            </div>
            <div className={Style.detailContainer}> 
                { data !== null ? <h3>{data.taskdetail}</h3> : <h3> No existe la tarea seleccionada</h3>}
                { data !== null ? <h4> Finaliza el : {giraFechas(data.taskfinishdate)}</h4> : <h3> No existe la tarea seleccionada</h3>}
            </div>

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={(e) => handleSubmit(e , input)} >
                <div className={Style.formcontainer}>
                
                <label className={mainStyle.labelModal}>Detalle:</label>
                <input
                  name="description"
                  placeholder={input.description}
                  onChange={(e) => handleChange(e)}
                  value={input.description}
                  type="text"
                  className={mainStyle.inputModal}
                />
                
                </div>
                
                <div className={mainStyle.buttonContainer}>
                <button type="submit" className={mainStyle.buttonModal}>Modificar</button>
                <button className={mainStyle.buttonModalCancel} onClick={(e) => handleClose(e)}>Cancelar</button>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
    )
}

export default TaskId