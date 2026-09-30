import React, { useState, useEffect } from "react";
import mainStyle from "@/styles/Home.module.css";
import summaryStyle from "@/modules/ticketsSupervisorV2.module.css";
import style from "@/modules/tableroV2.module.css";
import DashboardCardTicketV2 from "@/components/DashboardCardTicketV2";
import { ticketCompletos } from "@/functions/ticketCompletos";
import { horasPromedioHabiles } from "@/functions/horasPromedioHabiles";
import { extraeFecha } from "@/functions/extraeFecha";

const ESTADO_PILL = {
  "sin asignar": { label: "Sin asignar", cls: "pillGray" },
  "Asignado": { label: "Asignado", cls: "pillBlue" },
  "Desarrollo": { label: "Desarrollo", cls: "pillAmber" },
  "Informacion": { label: "Información", cls: "pillPurple" },
  "Completado": { label: "Completado", cls: "pillGreen" },
  "Terminado": { label: "Terminado", cls: "pillGreen" },
};

function Tablero() {
  const [soportes, setSoportes] = useState(null);
  const [matrix, setMatrix] = useState(null);
  const [drill, setDrill] = useState(null); // { salepoint, state, tickets }

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticket`)
      .then((res) => res.json())
      .then((data) => {
        setSoportes(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/soportesPorSucursal`)
      .then((res) => res.json())
      .then((data) => {
        setMatrix(data);
      });
  }, []);

  function openDrill(salepoint, state) {
    const params = new URLSearchParams();
    if (salepoint) params.set("salepoint", salepoint);
    if (state) params.set("state", state);
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsPorSucursalEstado?${params.toString()}`)
      .then((res) => res.json())
      .then((tickets) => {
        setDrill({ salepoint, state, tickets });
      });
  }

  function closeDrill() {
    setDrill(null);
  }

  return (
    <div className={mainStyle.container}>
      <div className={style.page}>
        <div className={style.pageHead}>
          <h1>Indicadores</h1>
        </div>

        <div className={summaryStyle.summaryStrip}>
          <div className={summaryStyle.summaryTitle}>Información General</div>
          <div className={summaryStyle.summaryStat}>
            <span className={summaryStyle.n}>{soportes !== null ? soportes.length : 0}</span>
            <span className={summaryStyle.l}>Soportes Totales</span>
          </div>
          <div className={summaryStyle.summaryStat}>
            <span className={summaryStyle.n}>{soportes !== null ? ticketCompletos(soportes).length : 0}</span>
            <span className={summaryStyle.l}>Terminados</span>
          </div>
          <div className={summaryStyle.summaryStat}>
            <span className={summaryStyle.n}>{soportes !== null && soportes.length > 0 ? Math.floor(horasPromedioHabiles(soportes)) : 0}</span>
            <span className={summaryStyle.l}>Tiempo Promedio (hs)</span>
          </div>
        </div>

        <div className={style.kpiGrid}>
          <DashboardCardTicketV2 id={1} />
          <DashboardCardTicketV2 id={2} />
          <DashboardCardTicketV2 id={3} />
          <DashboardCardTicketV2 id={4} />
        </div>

        <div className={style.card}>
          {drill === null ? (
            <>
              <div className={style.cardHead}>
                <h3>Soportes por sucursal</h3>
                <p>Click en una sucursal, un estado o un número para ver el detalle</p>
              </div>
              {matrix !== null && matrix.sucursales.length > 0 ? (
                <div className={style.tableScroll}>
                  <table className={style.matrixTable}>
                    <thead>
                      <tr>
                        <th className={style.thLabel}>Sucursal</th>
                        {matrix.estados.map((estado) => (
                          <th
                            key={estado}
                            className={style.thState}
                            onClick={() => openDrill(null, estado)}
                          >
                            <span className={style.thStateLabel}>
                              {ESTADO_PILL[estado].label}
                            </span>
                          </th>
                        ))}
                        <th className={style.thTotal}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matrix.sucursales.map((s) => (
                        <tr className={style.matrixRow} key={s.salepoint}>
                          <td>
                            <button type="button" className={style.rowLabel} onClick={() => openDrill(s.salepoint, null)}>
                              {s.salepoint}
                            </button>
                          </td>
                          {matrix.estados.map((estado) => (
                            <td key={estado}>
                              <button
                                type="button"
                                className={style.cellNum}
                                onClick={() => openDrill(s.salepoint, estado)}
                              >
                                {s.counts[estado]}
                              </button>
                            </td>
                          ))}
                          <td className={style.totalCell}>{s.counts.total}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className={style.footRow}>
                        <td>Total</td>
                        {matrix.estados.map((estado) => (
                          <td key={estado}>{matrix.totales[estado]}</td>
                        ))}
                        <td>{matrix.totales.total}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className={style.emptyState}>Cargando...</div>
              )}
            </>
          ) : (
            <>
              <div className={style.drillHead}>
                <div className={style.drillHeadLeft}>
                  <button type="button" className={style.backBtn} onClick={closeDrill}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    Volver
                  </button>
                  <h3>{drill.salepoint || "Todas las sucursales"}</h3>
                  {drill.state ? (
                    <span className={`${style.pill} ${style[ESTADO_PILL[drill.state].cls]}`}>
                      {ESTADO_PILL[drill.state].label}
                    </span>
                  ) : null}
                </div>
                <span className={style.drillCount}>{drill.tickets.length} soportes</span>
              </div>

              {drill.tickets.length > 0 ? (
                <table className={style.drillTable}>
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>Título</th>
                      <th>Creador</th>
                      <th>Desarrollador</th>
                      <th>Creado</th>
                      <th>Última modificación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drill.tickets.map((t) => (
                      <tr key={t.id}>
                        <td>N° {t.id}</td>
                        <td>{t.subject}</td>
                        <td className={style.muted}>{t.creador}</td>
                        <td className={style.muted}>{t.worker}</td>
                        <td className={style.muted}>{extraeFecha(t.createdAt)}</td>
                        <td className={style.muted}>{extraeFecha(t.updatedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className={style.emptyState}>No hay soportes para este filtro</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tablero;
