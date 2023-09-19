import React, { useState, useEffect } from "react";
import mainStyle from "@/styles/Home.module.css";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { postProject } from "../api/postProject";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#A0AAB4",
    color: "#A0AAB4",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#A0AAB4",
      color: "#A0AAB4",
    },
    "&:hover fieldset": {
      borderColor: "#A0AAB4",
      color: "#A0AAB4",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#A0AAB4",
      color: "#A0AAB4",
    },
  },
});

function nuevoProyecto() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  const [input, setInput] = useState({
    state: "creado",
    projectname: "",
    projectdetail: "",
    requirer: "",
    worker: [],
  });

  useEffect(() => {
    fetch("http://localhost:3001/user")
      .then((res) => res.json())
      .then((data) => {
        let userFiltered = data.filter((e) => e.isprojectworker === true);
        setUser(userFiltered);
        console.log(userFiltered);
      });
  }, []);

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin)
    console.log(loginParse);
    setLogin(loginParse);
    setInput({
        ...input,
        requirer: loginParse.name
    })
  }, []);

  function handlechange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

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

  function handleSubmit(e){
    e.preventDefault();
    postProject(input)
    alert("proyecto creado exitosamente")
    setInput({
        state: "",
        projectname: "",
        projectdetail: "",
        requirer: "",
        worker: [],
      })
    console.log(input)
  }

  console.log("input", input);

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Nuevo Proyecto</h1>

      <form className={mainStyle.form} onSubmit={e => handleSubmit(e)}>
        <CssTextField
          label="Nombre del Proyecto"
          fullWidth
          required
          id="custom-css-outlined-input"
          name="projectname"
          value={input.projectname}
          onChange={(e) => handlechange(e)}
          sx={{ color: "white", marginBottom: "2rem" }}
        />

        <CssTextField
          label="Detalle del Proyecto"
          fullWidth
          required
          multiline
          id="outlined-multiline-flexible"
          name="projectdetail"
          value={input.projectdetail}
          onChange={(e) => handlechange(e)}
          sx={{ color: "white", marginBottom: "2rem" }}
        />

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Selecciona un Desarrollador</FormLabel>
          <FormGroup>
            {user !== null &&
              user.map((e) => (
                <FormControlLabel
                  onChange={(e) => handleCheck(e)}
                  control={<Checkbox name={e.username} />}
                  label={e.username}
                />
              ))}
          </FormGroup>
        </FormControl>

        
        <Stack direction="row" spacing={2} >
          <Button variant="outlined" type="submit">Crear</Button>
          <Button variant="outlined" >
            Borrar
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default nuevoProyecto;
