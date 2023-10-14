import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../../modules/detail.module.css";
import mainStyle from "@/styles/Home.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Soporte() {
  const router = useRouter();
  const { id } = router.query;

  const [soporte, setSoporte] = useState(null);
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketDetail/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSoporte(data);
      });
  }, [router.query.id]);

  console.log("soporte", soporte);
  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/worker`)
      .then((res) => res.json())
      .then((data) => {
        setWorker(data);
      });
  }, [router.query.id]);

  const soporteHardcore = [
    {
      id: 1,
      state: "generado",
      worker: "sin definir",
      subject: "titulo de prueba",
      detail: "descripcion de prueba",
      userresolved: false,
      user: "usuario creador",
    },
  ];

  const workerHardcore = [
    {
      id: 1,
      username: "bbroscheit",
    },
    {
      id: 2,
      username: "lllamanzarez",
    },
    {
      id: 3,
      username: "asuarez",
    },
  ];

  return (
    <div className={mainStyle.container}>
      {soporte !== null ? (
        <div>
          <h1>Soporte Nº {soporte.id}</h1>
          <h2>{soporte.subject}</h2>
          <div>
            <div>
              {/* bloquedo, se habilita solo si el usuario que consulta es worker*/}
              <h3>Estado : </h3>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value="sin asignar"
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={"sin asignar"}>Sin Asignar</MenuItem>
                <MenuItem value={"asignado"}>Asignado</MenuItem>
                <MenuItem value={"en desarrollo"}>En Desarrollo</MenuItem>
                <MenuItem value={"mas informacion"}>Solicita mas información</MenuItem>
                <MenuItem value={"completado"}>Completada</MenuItem>
                <MenuItem value={"terminado"}>Terminada</MenuItem>
              </Select>
              <FormHelperText>Cambia el estado</FormHelperText>
              
            </div>
            <div>
              {/* bloquedo, se habilita solo si el usuario que consulta es worker*/}
              <h3>Asignado a : </h3>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value="sin asignar"
                // value={age}
                // onChange={handleChange}
              >
                {worker !== null
                  ? worker.map((e) => <MenuItem key={e.id} value="sin asignar">{e.username}</MenuItem>)
                  : null}
                
              </Select>
              <FormHelperText>Elije tu desarrollador</FormHelperText>
              <select>
                
              </select>
            </div>
          </div>
          {/* aparece solo spara el worker*/}
          <div>
            <div>
              <h3>Usuario : {soporte.user.username}</h3>
            </div>
            <div>
              <h3>Resuelve usuario?</h3>
              <input type="radio" value="yes" name="resolve" />
              <input type="radio" value="no" name="resolve" />
            </div>
          </div>
          <div>
            {/* bloqueado para todos*/}
            <h3>Detalle : </h3>
            <textarea
              placeholder={soporte.detail}
              cols="100"
              rows="17"
            />
          </div>
          <div>
            {/* bloqueado para el usuario y el worker una vez enviado*/}
            <h3>Solicitud de datos : </h3>
            <textarea
              placeholder="Motivo para solicitar mas datos..."
              cols="100"
              rows="17"
            />
          </div>
          <div>
            {/* aparece solo si el estado es "solicita mas datos" ,bloqueado para el usuario y el worker una vez enviado*/}
            <h3>Datos adicionales : </h3>
            <textarea
              placeholder="Datos agregados por el usuario"
              cols="100"
              rows="17"
            />
          </div>
          <div>
            {/* bloqueado para el usuario*/}
            <h3>Resolución : </h3>
            <textarea
              placeholder="Solucion dada por el Worker"
              cols="100"
              rows="17"
            />
          </div>
          <div>
            <button type="button">Aceptar</button>
            <button type="button">Cerrar Ticket</button>
          </div>
        </div>
      ) : (
        <h3>Cargando...</h3>
      )}
    </div>
  );
}
export default Soporte;
