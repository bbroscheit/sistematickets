import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import mainStyle from "@/styles/Home.module.css";
import styleCap from "@/modules/capacitaciones.module.css"
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { postPlatform } from '@/pages/api/postPlatform';


function NewPlatform() {
    const router = useRouter();
    const [user, setUser] = useState(null)
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
          

    function handleChangePlatform(e) {
        setInputPlatform({
          ...inputPlatform,
          [e.target.name]: e.target.value,
        });
      }

    const handleSelectMaster = (e) => { 
        setInputPlatform({
          ...inputPlatform,
          masters: [...inputPlatform.masters, e.target.innerText],
        });
    
      };
    
    const deleteMasters = (e) => {
        setInputPlatform({
            ...inputPlatform,
            masters: inputPlatform.masters.filter( f => f !== e.target.innerText)
        })
    
      };

     function handleSubmitPlatform(e) {
        e.preventDefault();
        postPlatform(inputPlatform)
        .then(res => {
            
          if (res.state === "success") {
            setInputPlatform({
              name: "",
              detail: "",
              masters: [],
            });
            Swal.fire(({
              icon: "success",
              title: "Tu Plataforma fue creada con éxito!",
              showConfirmButton: false,
              timer: 1500
            }));
            setTimeout(() => {
                router.push("/capacitaciones/Capacitaciones");    
              }, 1500);
          }
        })
        .catch(error => {
          console.error("Error al enviar el formulario:", error);
        });
      }

  return (
    <div className={mainStyle.container}>
       <h3>Nueva Plataforma</h3>

        
              <form className={mainStyle.form}>
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
            </div>
            </div>
                
              </form>
           
    </div>
    
  )
}

export default NewPlatform