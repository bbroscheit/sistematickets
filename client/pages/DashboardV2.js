import React, { useEffect, useState } from "react";
import Link from "next/link";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/dashboardV2.module.css";
import ProjectCardV2 from "@/components/ProjectCardV2";

function DashboardV2() {
  const [projects, setProjects] = useState(null);
  const [user, setUser] = useState(null);
  const [finder, setFinder] = useState("");
  const [showFinished, setShowFinished] = useState(false);

  function fetchProjects() {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
      });
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("user"));
    if (userLogin) setUser(userLogin);
  }, []);

  const visibleProjects =
    projects !== null
      ? projects
          .filter((p) => showFinished || p.state !== "Finalizado")
          .filter((p) => p.projectname.toLowerCase().includes(finder.toLowerCase()))
      : null;

  return (
    <div className={mainStyle.container}>
      <div className={style.pageWrap}>
        <div className={style.page}>
          <div className={style.pageHead}>
            <div className={style.pageHeadLeft}>
              <h1>Proyectos</h1>
              <p>Seguimiento de los desarrollos internos en curso.</p>
            </div>
            {user !== null && user.isprojectmanager === true ? (
              <Link href="/proyectos/nuevoProyectoV2" className={`${style.btn} ${style.btnPrimary}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Nuevo Proyecto
              </Link>
            ) : null}
          </div>

          <div className={style.toolbar}>
            <div className={style.searchInput}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Buscar proyecto..."
                value={finder}
                onChange={(e) => setFinder(e.target.value)}
              />
            </div>
            <button
              type="button"
              className={`${style.chip} ${showFinished ? style.chipActive : ""}`}
              onClick={() => setShowFinished((v) => !v)}
            >
              Mostrar finalizados
            </button>
          </div>

          {visibleProjects !== null && visibleProjects.length > 0 ? (
            <div className={style.projectGrid}>
              {visibleProjects.map((p) => (
                <ProjectCardV2 key={p.id} project={p} user={user} onProjectFinished={fetchProjects} />
              ))}
            </div>
          ) : (
            <div className={style.emptyState}>
              <span className={style.emptyTitle}>
                {projects !== null && projects.length > 0
                  ? "Ningún proyecto coincide con la búsqueda"
                  : "Aún no has creado ningún proyecto"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardV2;
