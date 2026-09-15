import React, { useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import style from "@/modules/proyectoDetalleV2.module.css";
import girafechas from "@/functions/girafechas";
import colorIndex from "@/functions/colorIndex";
import { devuelveIniciales } from "@/functions/devuelveIniciales";
import { updateCheckTask } from "@/pages/api/updateCheckTask";
import { updateNewtask } from "@/pages/api/updateNewtask";

const modalPosition = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  maxWidth: "calc(100vw - 40px)",
};

function esVencida(fecha) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return new Date(fecha) < hoy;
}

function TaskRowV2({ task, onChanged }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState(task.taskfinishdate || "");
  const [error, setError] = useState("");

  const done = task.state === "cumplido";
  const worker = task.users && task.users[0] ? task.users[0] : null;
  const vencida = !done && esVencida(task.taskfinishdate);

  function handleCheckClick() {
    if (done) {
      setNewDate(task.taskfinishdate || "");
      setError("");
      setOpen(true);
      return;
    }
    updateCheckTask(task.id).then(() => {
      if (onChanged) onChanged();
    });
  }

  function handleDateClick() {
    if (done) return;
    setNewDate(task.taskfinishdate || "");
    setError("");
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (!newDate) {
      setError("El campo no puede estar vacío");
      return;
    }
    updateNewtask({ id: task.id, taskfinishdate: newDate })
      .then((res) => {
        if (res.state === "success") {
          setOpen(false);
          Swal.fire({
            icon: "success",
            title: "Tarea actualizada",
            showConfirmButton: false,
            timer: 1200,
          });
          if (onChanged) onChanged();
        } else {
          Swal.fire({ icon: "error", title: "No se pudo actualizar la tarea" });
        }
      })
      .catch(() => {
        Swal.fire({ icon: "error", title: "No se pudo actualizar la tarea" });
      });
  }

  return (
    <>
      <div className={style.taskRow}>
        <button
          type="button"
          className={`${style.checkDot} ${done ? style.checkDotDone : style.checkDotPending}`}
          title={done ? "Reabrir tarea" : "Marcar como cumplida"}
          onClick={handleCheckClick}
        >
          {done ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : null}
        </button>

        <button
          type="button"
          className={`${style.taskTitle} ${done ? style.taskTitleDone : ""}`}
          onClick={() => router.push("/tareas/[id]", `/tareas/${task.id}`)}
        >
          {task.taskdetail}
        </button>

        <div className={style.taskWorker}>
          {worker ? (
            <>
              <span className={`${style.avatar} ${style.avatarSm} ${style[`c${colorIndex(worker.username || worker.id)}`]}`}>
                {devuelveIniciales(worker.firstname, worker.lastname)}
              </span>
              <span className={style.taskWorkerName}>{worker.firstname}</span>
            </>
          ) : (
            <span className={style.peopleNameMuted}>Sin asignar</span>
          )}
        </div>

        <span
          className={`${style.taskDate} ${done ? style.pillGreen : vencida ? style.pillRed : style.pillGray} ${!done ? style.taskDateClickable : ""}`}
          onClick={handleDateClick}
          title={!done ? "Reprogramar fecha" : ""}
        >
          {vencida ? "Venció " : ""}{girafechas(task.taskfinishdate)}
        </span>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalPosition} className={style.modalBox}>
          <h2>{done ? "Reabrir tarea" : "Reprogramar tarea"}</h2>
          <form onSubmit={handleConfirm}>
            <div className={style.field}>
              <label>Nueva fecha de finalización</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
              {error ? <p className={style.fieldError}>{error}</p> : null}
            </div>
            <div className={style.modalActions} style={{ marginTop: 18 }}>
              <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={handleClose}>
                Cancelar
              </button>
              <button type="submit" className={`${style.btn} ${style.btnPrimary}`}>
                Aceptar
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default TaskRowV2;
