// import React, { useState, useEffect } from "react";
// import mainStyle from "@/styles/Home.module.css";
// import { styled } from "@mui/material/styles";
// import TextField from "@mui/material/TextField";
// import FormLabel from "@mui/material/FormLabel";
// import FormControl from "@mui/material/FormControl";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { postProject } from "../api/postProject";

// const CssTextField = styled(TextField)({
//   "& label.Mui-focused": {
//     color: "#A0AAB4",
//   },
//   "& .MuiInput-underline:after": {
//     borderBottomColor: "#A0AAB4",
//     color: "#A0AAB4",
//   },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#A0AAB4",
//       color: "#A0AAB4",
//     },
//     "&:hover fieldset": {
//       borderColor: "#A0AAB4",
//       color: "#A0AAB4",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#A0AAB4",
//       color: "#A0AAB4",
//     },
//   },
// });

// function nuevoProyecto() {
//   const [user, setUser] = useState(null);
//   const [login, setLogin] = useState(null);
//   const [input, setInput] = useState({
//     state: "creado",
//     projectname: "",
//     projectdetail: "",
//     requirer: "",
//     worker: [],
//     finishDate:""
//   });

//   useEffect(() => {
//     fetch("http://localhost:3001/user")
//       .then((res) => res.json())
//       .then((data) => {
//         let userFiltered = data.filter((e) => e.isprojectworker === true);
//         setUser(userFiltered);
//         console.log(userFiltered);
//       });
//   }, []);

//   useEffect(() => {
//     let userLogin = localStorage.getItem("user");
//     let loginParse = JSON.parse(userLogin)
//     console.log(loginParse);
//     setLogin(loginParse);
//     setInput({
//         ...input,
//         requirer: loginParse.name
//     })
//   }, []);

//   function handlechange(e) {
//     e.preventDefault();
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   }

//   function handleCheck(e) {
//     let nombre = e.target.name;
//     if (e.target.checked) {
//       setInput({
//         ...input,
//         worker: [...input.worker, nombre],
//       });
//     } else {
//       setInput({
//         ...input,
//         worker: input.worker.filter((e) => e !== nombre),
//       });
//     }
//   }

//   function handleSubmit(e){
//     e.preventDefault();
//     postProject(input)
//     alert("proyecto creado exitosamente")
//     setInput({
//         state: "",
//         projectname: "",
//         projectdetail: "",
//         requirer: "",
//         worker: [],
//       })
//     console.log(input)
//   }

//   console.log("input", input);

//   return (
//     <div className={mainStyle.container}>
//       <h1 className={mainStyle.title}>Nuevo Proyecto</h1>

//       <form className={mainStyle.form} onSubmit={e => handleSubmit(e)}>
//         <CssTextField
//           label="Nombre del Proyecto"
//           fullWidth
//           required
//           id="custom-css-outlined-input"
//           name="projectname"
//           value={input.projectname}
//           onChange={(e) => handlechange(e)}
//           sx={{ color: "white", marginBottom: "2rem" }}
//         />

//         <CssTextField
//           label="Detalle del Proyecto"
//           fullWidth
//           required
//           multiline
//           id="outlined-multiline-flexible"
//           name="projectdetail"
//           value={input.projectdetail}
//           onChange={(e) => handlechange(e)}
//           sx={{ color: "white", marginBottom: "2rem" }}
//         />
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker />
//         </LocalizationProvider>

//         <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
//           <FormLabel component="legend">Selecciona un Desarrollador</FormLabel>
//           <FormGroup>
//             {user !== null &&
//               user.map((e) => (
//                 <FormControlLabel
//                   onChange={(e) => handleCheck(e)}
//                   control={<Checkbox name={e.username} />}
//                   label={e.username}
//                 />
//               ))}
//           </FormGroup>
//         </FormControl>

//         <Stack direction="row" spacing={2} >
//           <Button variant="outlined" type="submit">Crear</Button>
//           <Button variant="outlined" >
//             Borrar
//           </Button>
//         </Stack>
//       </form>
//     </div>
//   );
// }

// export default nuevoProyecto;

import React, { useState, useEffect } from "react";
import mainStyle from "@/styles/Home.module.css";
import Style from "@/modules/nuevoProyecto.module.css";
import Router from "next/router";
import { postProject } from "../api/postProject";


function nuevoProyecto() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  const [input, setInput] = useState({
    state: "creado",
    projectname: "",
    projectdetail: "",
    requirer: "",
    worker: [],
    finishdate: "",
  });

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setLogin(loginParse);
    setInput({
      ...input,
      requirer: loginParse.name,
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/user")
      .then((res) => res.json())
      .then((data) => {
        let userFiltered = data.filter((e) => e.isprojectworker === true);
        setUser(userFiltered);
      });
  }, []);

  function handleCheck(e) {
    let nombre = e.target.name;
    if (e.target.checked) {
      setInput({
        ...input,
        worker: [...input.worker, nombre],
      });
    } else {
      setInput({
        ...input,
        worker: input.worker.filter((e) => e !== nombre),
      });
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleTextarea(e) {
    setInput({
      ...input,
      projectdetail: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    postProject(input);
    alert("proyecto creado exitosamente");
    setInput({
      state: "",
      projectname: "",
      projectdetail: "",
      requirer: "",
      worker: [],
      finishdate: "",
    });

    setTimeout(() => {
      Router.push("/dashboard");
    }, 400);
  }

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Nuevo Proyecto</h1>
      <form className={mainStyle.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={mainStyle.minimalGrid}>
          <label className={mainStyle.subtitle}>Nombre :</label>
          <input
            type="text"
            name="projectname"
            value={input.projectname}
            className={mainStyle.input}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={mainStyle.minimalGrid}>
          <label className={mainStyle.subtitle}>Detalles : </label>
          <textarea
            rows="10"
            value={input.projectdetail}
            onChange={(e) => handleTextarea(e)}
          />
        </div>
        <div className={Style.formContainer}>
          <div className={Style.labelContainer}>
            <label for="finishDate">Fecha de finalizacion:</label>
            <input
              type="date"
              id="finishdate"
              name="finishdate"
              onChange={(e) => handleChange(e)}
              value={input.finishdate}
            />
          </div>
          <div className={Style.labelContainer}>
            <label> Elije Desarrollador : </label>
            <div className={Style.checkContainer}>
            {user !== null &&
              user.map((e) => (
                <div >
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheck(e)}
                    value={input.worker}
                    name={e.username}
                  />
                  <label>{e.firstname}</label>
                </div>
              ))}</div>
          </div>
        </div>
        <div className={mainStyle.buttonContainer}>
          <button className={mainStyle.button} type="submit">
            Crear
          </button>
          <button className={mainStyle.button} onClick={(e) => handleOption(e)}>
            Borrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default nuevoProyecto;
