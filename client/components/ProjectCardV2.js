import React, { useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import style from "@/modules/dashboardV2.module.css";
import { calculaPromedio } from "@/functions/calculaPromedio";
import girafechas from "@/functions/girafechas";
import colorIndex from "@/functions/colorIndex";
import { devuelveIniciales } from "@/functions/devuelveIniciales";
import { projectChangeState } from "@/pages/api/updateCheckProject";

const modalPosition = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  maxWidth: "calc(100vw - 40px)",
};

function ProjectCardV2({ project, user, onProjectFinished }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const requirer = project.users && project.users[0] ? project.users[0] : null;
  const workers = project.users ? project.users.slice(1) : [];
  const progreso = calculaPromedio(project.newtasks) || 0;
  const finalizado = project.state === "Finalizado";

  function handleOpen(e) {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  }

  function handleClose(e) {
    if (e) e.preventDefault();
    setOpen(false);
  }

  function handleConfirm(e) {
    e.preventDefault();
    projectChangeState(project.id).then((res) => {
      if (res.state === "success") {
        setOpen(false);
        Swal.fire({
          icon: "success",
          title: "Diste por terminado el proyecto",
          showConfirmButton: false,
          timer: 1500,
        });
        if (onProjectFinished) onProjectFinished();
      }
    });
  }

  return (
    <>
      <div
        className={style.projectCard}
        onClick={() => router.push("/proyectos/v2/[id]", `/proyectos/v2/${project.id}`)}
      >
        <div className={style.cardTop}>
          <h3>{project.projectname}</h3>
          <div className={style.pillRow}>
            <span className={`${style.pill} ${finalizado ? style.pillGreen : style.pillBlue}`}>
              {finalizado ? "Finalizado" : "Activo"}
            </span>
            {user && user.isprojectmanager === true && !finalizado ? (
              <button
                type="button"
                className={`${style.checkBtn} ${progreso === 100 ? style.checkBtnReady : ""}`}
                title="Marcar como finalizado"
                onClick={handleOpen}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M8.5 12.5l2.3 2.3 4.7-4.8"></path>
                </svg>
              </button>
            ) : null}
          </div>
        </div>

        <p className={style.cardDetail}>{project.projectdetail}</p>

        <div className={style.metaRow}>
          <div className={style.metaBlock}>
            <span className={style.metaLabel}>Solicitante</span>
            {requirer ? (
              <>
                <div className={style.peopleStack}>
                  <span className={`${style.avatar} ${style[`c${colorIndex(requirer.username || requirer.id)}`]}`}>
                    {devuelveIniciales(requirer.firstname, requirer.lastname)}
                  </span>
                </div>
                <span className={style.peopleName}>{requirer.firstname} {requirer.lastname}</span>
              </>
            ) : (
              <span className={style.peopleNameMuted}>Sin asignar</span>
            )}
          </div>
          <div className={style.metaBlock}>
            <span className={style.metaLabel}>Desarrolladores</span>
            {workers.length > 0 ? (
              <>
                <div className={style.peopleStack}>
                  {workers.map((w) => (
                    <span key={w.id} className={`${style.avatar} ${style[`c${colorIndex(w.username || w.id)}`]}`}>
                      {devuelveIniciales(w.firstname, w.lastname)}
                    </span>
                  ))}
                </div>
                <span className={style.peopleName}>
                  {workers.map((w) => `${w.firstname} ${w.lastname}`).join(", ")}
                </span>
              </>
            ) : (
              <span className={style.peopleNameMuted}>Sin asignar</span>
            )}
          </div>
        </div>

        <div className={style.cardFoot}>
          <div className={style.progressWrap}>
            <div className={style.progressTrack}>
              <div
                className={`${style.progressFill} ${progreso === 100 ? style.progressFillDone : ""}`}
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
            <span className={style.progressPct}>{progreso}%</span>
          </div>
          <div className={style.dueDate}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {girafechas(project.finishdate)}
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalPosition} className={style.modalBox}>
          <h2>¿Deseás dar por terminado este proyecto?</h2>
          <div className={style.modalActions}>
            <button type="button" className={`${style.btn} ${style.btnSecondary}`} onClick={handleClose}>
              Cancelar
            </button>
            <button type="button" className={`${style.btn} ${style.btnPrimary}`} onClick={handleConfirm}>
              Aceptar
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default ProjectCardV2;
