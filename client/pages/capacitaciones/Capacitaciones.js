import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import mainStyle from "@/styles/Home.module.css";
import Style from "@/modules/id.module.css";
import styleCap from "@/modules/capacitaciones.module.css"
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { postCapacitation } from '@/pages/api/postCapacitation';
import { postPlatform } from '@/pages/api/postPlatform';
import CardCapacitation from '@/components/CardCapacitation';

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
  


function Capacitaciones() {
    const router = useRouter();
    const [open, setOpen] = useState(false)
    const [openPlatform, setOpenPlatform] = useState(false)
    const [user, setUser] = useState(null)
    const [subject, setSubject] = useState("Ingrese un Tema")
    const [createdCapacitation, setCreatedCapacitation] = useState(null)
    const [platform, setPlatform] = useState(null)
    const [capacitation, setCapacitation] = useState({
        state: "Generado",
        subject: [],
        teacher: "",
        students:[],
        startdate: "",
        starthour:"",
        platform:""
      });
    const [inputPlatform, setInputPlatform] = useState({
      name: "",
      detail: "",
      masters: [],
    });

    useEffect(() => {
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
        .then((res) => res.json())
        .then((data) => {
          
          const allNames = data.map( e => `${e.firstname} ${e.lastname}`)
          setUser(allNames);
        });
    }, []);

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/capacitation`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/capacitation`)
          .then((res) => res.json())
          .then((data) => {
            setCreatedCapacitation(data);
          });
      }, []);

      useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/platform`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/platform`)
          .then((res) => res.json())
          .then((data) => {
            setPlatform(data);
          });
      }, []);


    function handleOpen(e){
        e.stopPropagation();
        setOpen(true)        
      }
    
      function handleClose(e) {
        e.stopPropagation();
        setCapacitation({
            state: "generado",
            subject: [],
            teacher: "",
            students:[],
            platform:"",
            startdate: "",
        });
    
        setOpen(false);
      }

      
    function handleOpenPlatform(e){
      e.stopPropagation();
      setOpenPlatform(true)        
    }
  
    function handleClosePlatform(e) {
      e.stopPropagation();
      setInputPlatform({
        name: "",
        detail: "",
        masters: [],
      });
  
      setOpenPlatform(false);
    }
    
      function handleChange(e) {
        setCapacitation({
          ...capacitation,
          [e.target.name]: e.target.value,
        });
      }

      function handleChangePlatform(e) {
        setInputPlatform({
          ...inputPlatform,
          [e.target.name]: e.target.value,
        });
      }

      function handleChangeSubject(e) {
        setSubject(e.target.value)
      }

      function handleSubmitSubject(e){
        e.preventDefault()
        e.stopPropagation();
        setCapacitation({
            ...capacitation,
            subject: [...capacitation.subject, subject]
        })
        setSubject("")
      }

      function deleteSubject(e){
        e.preventDefault()
        e.stopPropagation();
        setCapacitation({
            ...capacitation,
            subject: capacitation.subject.filter( f => f !== e.target.innerText)
        })
        
      }
    
      const handleSelectTeacher = (e) => {
        e.stopPropagation();
        setCapacitation({
          ...capacitation,
          teacher: e.target.innerText,
        });
    
      };

      const handleSelectPlatform = (e) => {
        e.stopPropagation();
        setCapacitation({
          ...capacitation,
          platform: e.target.innerText,
        });
    
      };

      const handleSelectStudent = (e) => {
        e.stopPropagation();
        setCapacitation({
          ...capacitation,
          students: [...capacitation.students, e.target.innerText],
        });
    
      };

      const handleSelectMaster = (e) => {
        e.stopPropagation();  
        setInputPlatform({
          ...inputPlatform,
          masters: [...inputPlatform.masters, e.target.innerText],
        });
    
      };

      const deleteStudent = (e) => {
        e.stopPropagation();
        setCapacitation({
            ...capacitation,
            students: capacitation.students.filter( f => f !== e.target.innerText)
        })
    
      };

      const deleteMasters = (e) => {
        e.stopPropagation();
        setInputPlatform({
            ...inputPlatform,
            masters: inputPlatform.masters.filter( f => f !== e.target.innerText)
        })
    
      };
    
      function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        postCapacitation(capacitation)
        .then(res => {
            
          if (res.state === "success") {
            setOpen(false);
            setCapacitation({
                state: "generado",
                subject: [],
                teacher: "",
                students:[],
                startdate: "",
                starthour:""
            });
            Swal.fire(({
              icon: "success",
              title: "Tu capacitacion fue creada con éxito!",
              showConfirmButton: false,
              timer: 1500
            }));
          }
        })
        .catch(error => {
          console.error("Error al enviar el formulario:", error);
        });
      }

      function handleSubmitPlatform(e) {
        e.preventDefault();
        e.stopPropagation();
        postPlatform(inputPlatform)
        // .then(res => {
            
        //   if (res.state === "success") {
        //     setOpenPlatform(false);
        //     setInputPlatform({
        //       name: "",
        //       detail: "",
        //       masters: [],
        //     });
        //     Swal.fire(({
        //       icon: "success",
        //       title: "Tu Plataforma fue creada con éxito!",
        //       showConfirmButton: false,
        //       timer: 1500
        //     }));
        //   }
        // })
        // .catch(error => {
        //   console.error("Error al enviar el formulario:", error);
        // });
      }
    
      console.log("inputPlatform", inputPlatform)

  return (
    <div className={mainStyle.container}>
      
          <div className={Style.userStorieTitle}>
            <div className={Style.titleContainer}>
              <div className={Style.button}>
                <h5 >Nueva Capacitacion</h5>
                <hr />
                <AddCircleOutlineIcon cursor="pointer" sx={{ color:"#ffffff"}} onClick={(e) => handleOpen(e)} />
              </div>
            </div>
          </div>
          <hr></hr>
          {createdCapacitation && createdCapacitation.length > 0  ? 
            <div className={Style.containerUserstoriesCard}>
            <h2 className={Style.subTitle}>Capacitaciones</h2>
            <div className={Style.containerUserstoriesCard}>
            <div className={styleCap.cardContainer}>
            {
              createdCapacitation.map((e) => (
                <CardCapacitation 
                    key={e.id}
                    id={e.id}
                    teacher={e.teacher}
                    subject={e.subject}
                    student={e.student}
                    startdate={e.startdate}
                />
                ))
             }
            </div>
          </div>
          </div> : null}

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form >
                <div className={styleCap.form}>
                <div >
                    <label className={mainStyle.labelModal}>Tarea</label>
                    <input
                        
                        placeholder={subject}
                        onChange={(e) => handleChangeSubject(e)}
                        value={subject}
                        type="text"
                        className={mainStyle.inputModal}
                    />
                    <button className={mainStyle.buttonModal} onClick={(e) => handleSubmitSubject(e)}>Agregar</button>
                    {
                        capacitation.subject.length > 0 ? <div>{capacitation.subject.map( e => <p onClick={e => deleteSubject(e)}>{e}</p> )}</div> : null
                    }
                </div>
                <div>
                {
                  user !== null && user.length > 1 ?
                    <div>
                      <label className={mainStyle.labelModal}>Capacitador</label>
                      <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={user}
                            fullWidth
                            renderInput={(params) => <TextField {...params}/>}
                            onChange={(e) => handleSelectTeacher(e)}
                            sx={{margin:"8px 10px"}}
                        />
                        
                      
                    </div> : null
                }

                {
                  user !== null && user.length > 1 ?
                    <div>
                      <label className={mainStyle.labelModal}>Alumnos</label>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={user}
                            fullWidth
                            renderInput={(params) => <TextField {...params}/>}
                            onChange={(e) => handleSelectStudent(e)}
                            sx={{margin:"8px 10px"}}
                        />
                        {
                            capacitation.students.length > 0 ? <div>{capacitation.students.map( e => <p onClick={e => deleteStudent(e)}>{e}</p> )}</div> : null
                        }
                      
                    </div> : null
                }

                {
                  platform !== null && platform.length > 1 ?
                    <div>
                      <div>
                      <label className={mainStyle.labelModal}>Plataforma</label>
                      <AddCircleOutlineIcon />
                      </div>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={platform}
                            fullWidth
                            renderInput={(params) => <TextField {...params}/>}
                            onChange={(e) => handleSelectPlatform(e)}
                            sx={{margin:"8px 10px"}}
                        />                     
                    </div> : 
                    <div className={styleCap.platform}>
                      <label className={mainStyle.labelModal}>Plataforma</label>
                      <AddCircleOutlineIcon className={styleCap.icon} onClick={handleOpenPlatform}/>
                    </div>
                }
                 
              
            </div>
          
            <div className={styleCap.dateContainer}>
                
                    <div className={styleCap.labelContainer}>
                        <label >Fecha de Inicio</label>
                        <input
                            type="date"
                            id="stardate"
                            name="startdate"
                            onChange={(e) => handleChange(e)}
                            value={capacitation.startdate}
                        />
                    </div>
                    <div className={styleCap.labelContainer}>
                        <label >Hora de Inicio</label>
                        <input
                            type="time"
                            id="starthour"
                            name="starthour"
                            onChange={(e) => handleChange(e)}
                            value={capacitation.starthour}
                        />
                    </div>
                
            </div>
            <div className={mainStyle.buttonContainer}>
                <button className={mainStyle.buttonModal} onClick={(e) => handleSubmit(e)}>Agregar</button>
                <button className={mainStyle.buttonModalCancel} onClick={(e) => handleClose(e)}>Cancelar</button>
            </div>
            </div>
                
              </form>
            </Box>
          </Modal>
                
          <Modal
            open={openPlatform}
            onClose={handleClosePlatform}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form >
                <div className={styleCap.form}>
                <div >
                    <label className={mainStyle.labelModal}>Plataforma</label>
                    <input
                        name="name"
                        placeholder="Ingrese plataforma"
                        onChange={(e) => handleChangePlatform(e)}
                        value={inputPlatform.name}
                        type="text"
                        className={mainStyle.inputModal}
                    />
                </div>
                <div >
                    <label className={mainStyle.labelModal}>Detalle</label>
                    <input
                        name="detail"
                        placeholder="Ingrese detalle"
                        onChange={(e) => handleChangePlatform(e)}
                        value={inputPlatform.detail}
                        type="text"
                        className={mainStyle.inputModal}
                    />
                </div>
                <div>
                {
                  user !== null && user.length > 1 ?
                    <div>
                      <label className={mainStyle.labelModal}>Capacitador</label>
                      <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={user}
                            fullWidth
                            renderInput={(params) => <TextField {...params}/>}
                            onChange={(e) => handleSelectMaster(e)}
                            sx={{margin:"8px 10px"}}
                        />
                        
                      
                    </div> : null
                }
                {
                  inputPlatform.masters.length > 0 ? <div>{inputPlatform.masters.map( e => <p onClick={e => deleteMasters(e)}>{e}</p> )}</div> : null
                }
            </div>
            <div className={mainStyle.buttonContainer}>
                <button className={mainStyle.buttonModal} onClick={(e) => handleSubmitPlatform(e)}>Agregar</button>
                <button className={mainStyle.buttonModalCancel} onClick={(e) => handleClosePlatform(e)}>Cancelar</button>
            </div>
            </div>
                
              </form>
            </Box>
          </Modal>
                
    </div>
  )
}

export default Capacitaciones