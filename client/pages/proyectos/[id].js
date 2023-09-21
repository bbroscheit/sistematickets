import React, { useEffect, useState } from "react";
import mainStyle from "@/styles/Home.module.css";
import Style from "@/modules/id.module.css";
import { useRouter } from "next/router";
import Router from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { postUserstorie } from "@/pages/api/postUserstories";
import UserstoriesCard from "@/components/UserstoriesCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid white",
  bgcolor: "#121213",
  boxShadow: 24,
  p: 4,
};

function projectDetail() {
  const router = useRouter();
  const id = router.query.id;
  const [data, setData] = useState(null);
  const [userstories, setUserstories] = useState(null)
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    id: router.query.id,
    state: "generado",
    storiesname: "",
    storiesdetail: "",
    priority: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3001/project/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setUserstories(data[0].userstories)
      });
  }, [router.query.id]);

  const handleOpen = () => setOpen(true);

  function handleClose(e) {
    setInput({
      id: router.query.id,
      state: "generado",
      storiesname: "",
      storiesdetail: "",
      priority: "",
    });

    setOpen(false);
  }

  function handleCheck(e) {
    console.log("entraste a check");
  }

  function handleDelete(e) {
    console.log("entraste a delete");
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const handleSelect = (e) => {
    setInput({
      ...input,
      priority: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    postUserstorie(input);
    alert("storie generada con exito");

    setTimeout(() => {
      setOpen(false);
    }, 400);
  }

  console.log("data", data)
  console.log("userstories", userstories);
  return (
    <div className={mainStyle.container}>
      { 
        data !== null && data.length > 0 ? 
        <>
        <h1 className={mainStyle.title}>{data[0].projectname}</h1>
        <p className={Style.detailContainer}>{data[0].projectdetail}</p>
        <hr className={Style.horizontalLine} />
        <div className={Style.userStorieTitle}>
          <div >
            <h4 className={Style.storiesSubtitle}>User Stories</h4>
          </div>
          <div>
            <AddCircleOutlineIcon onClick={(e) => handleOpen(e)} />
            {/* <CheckCircleOutlineIcon onClick={e => handleCheck(e)}/>
                <HighlightOffOutlinedIcon onClick={e => handleDelete(e)}/> */}
          </div>
          </div>
          <div>
          {
            userstories && userstories.length > 0 ? userstories.map( e => <UserstoriesCard storiesname={e.storiesname}/>   ): null 
          }
          </div>
        

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextField
                id="outlined-basic"
                label="Nombre"
                name="storiesname"
                onChange={(e) => handleChange(e)}
                value={input.storiesname}
                variant="outlined"
                fullWidth
                InputProps={{
                  style: {
                    color: "white", // Cambia el color del texto
                    // Puedes agregar más estilos CSS aquí si es necesario
                  },
                }}
                sx={{
                  marginBottom: "12px",
                  color: "white",
                  borderColor: "white",
                }}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Descripcion"
                fullWidth
                multiline
                maxRows={2}
                name="storiesdetail"
                value={input.storiesdetail}
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: "12px" }}
                InputProps={{
                  style: {
                    color: "white",
                    borderColor: "white", // Cambia el color del texto
                    // Puedes agregar más estilos CSS aquí si es necesario
                  },
                }}
              />
              <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
                Prioridad
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                value={input.priority}
                label="Priority"
                name="priority"
                onChange={(e) => handleSelect(e)}
                sx={{ marginBottom: "12px" }}
                InputProps={{
                  style: {
                    color: "white",
                    borderColor: "white", // Cambia el color del texto
                    // Puedes agregar más estilos CSS aquí si es necesario
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white", // Cambia el color del texto del placeholder
                  },
                }}
              >
                <MenuItem value={"Importante"}>Importante</MenuItem>
                <MenuItem value={"Deseado"}>Deseado</MenuItem>
              </Select>
              <div className={mainStyle.buttonContainer}>
                <Button
                  variant="contained"
                  sx={{ marginRight: "12px" }}
                  type="submit"
                >
                  Agregar
                </Button>
                <Button variant="contained" onClick={(e) => handleClose(e)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
        </> : null }
    </div>
  );
}

export default projectDetail;
