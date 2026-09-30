import React, { useEffect, useState } from "react";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/sectoresV2.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";

function SectoresV2() {
  const [sectors, setSectors] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");

  function fetchSectors() {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sector/all`)
      .then((res) => res.json())
      .then((data) => setSectors(data))
      .catch(() => setSectors([]));
  }

  useEffect(() => {
    fetchSectors();
  }, []);

  function toggleSector(sector) {
    const nextIsdelete = !sector.isdelete;

    // optimista: se actualiza en pantalla ya mismo, y si falla se revierte
    setSectors((prev) =>
      prev.map((s) => (s.id === sector.id ? { ...s, isdelete: nextIsdelete } : s))
    );

    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sector/${sector.id}/estado`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isdelete: nextIsdelete }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.state !== "success") throw new Error("failure");
      })
      .catch(() => {
        setSectors((prev) =>
          prev.map((s) => (s.id === sector.id ? { ...s, isdelete: sector.isdelete } : s))
        );
        Swal.fire({
          icon: "error",
          title: "No se pudo actualizar el sector",
          text: "Intentá de nuevo en unos segundos.",
        });
      });
  }

  const all = sectors || [];
  const countTodos = all.length;
  const countActivos = all.filter((s) => !s.isdelete).length;
  const countInactivos = all.filter((s) => s.isdelete).length;

  let visible = all;
  if (filter === "activos") visible = visible.filter((s) => !s.isdelete);
  if (filter === "inactivos") visible = visible.filter((s) => s.isdelete);
  if (search.trim() !== "") {
    const q = search.trim().toLowerCase();
    visible = visible.filter((s) => s.sectorname.toLowerCase().includes(q));
  }

  return (
    <div className={mainStyle.container}>
      <div className={style.pageWrap}>
        <div className={style.page}>
          <div className={style.pageHead}>
            <h1>Gestión de Sectores</h1>
            <p>
              Los sectores inactivos dejan de aparecer en los filtros y al asignar
              usuarios, pero no se borran ni se pierden los datos históricos.
            </p>
          </div>

          <div className={style.filterCard}>
            <div className={style.searchRow}>
              <div className={style.searchInput}>
                <SearchIcon fontSize="small" />
                <input
                  type="text"
                  placeholder="Buscar sector..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className={style.filterRow}>
              <button
                type="button"
                className={`${style.chip} ${filter === "todos" ? style.chipActive : ""}`}
                onClick={() => setFilter("todos")}
              >
                Todos<span>({countTodos})</span>
              </button>
              <button
                type="button"
                className={`${style.chip} ${filter === "activos" ? style.chipActive : ""}`}
                onClick={() => setFilter("activos")}
              >
                Activos<span>({countActivos})</span>
              </button>
              <button
                type="button"
                className={`${style.chip} ${filter === "inactivos" ? style.chipActive : ""}`}
                onClick={() => setFilter("inactivos")}
              >
                Inactivos<span>({countInactivos})</span>
              </button>
            </div>
          </div>

          <div className={style.listCard}>
            <div className={style.listHead}>
              <div className={style.colName}>Sector</div>
              <div className={style.colCount}>Usuarios</div>
              <div className={style.colState}>Estado</div>
            </div>

            {sectors === null ? (
              <div className={style.emptyState}>
                <span className={style.emptyTitle}>Cargando sectores...</span>
              </div>
            ) : visible.length === 0 ? (
              <div className={style.emptyState}>
                <span className={style.emptyTitle}>No se encontraron sectores</span>
                <span className={style.emptySub}>Probá con otra búsqueda o cambiá el filtro.</span>
              </div>
            ) : (
              visible.map((s) => (
                <div
                  key={s.id}
                  className={`${style.row} ${s.isdelete ? style.rowInactive : ""}`}
                >
                  <div className={style.rowName}>
                    <span
                      className={`${style.rowNameText} ${s.isdelete ? style.rowNameTextInactive : ""}`}
                    >
                      {s.sectorname}
                    </span>
                    <span className={style.rowId}>id {s.id}</span>
                  </div>
                  <div className={`${style.rowCount} ${s.isdelete ? style.rowCountInactive : ""}`}>
                    {s.userCount} usuarios
                  </div>
                  <div className={style.rowState}>
                    <button
                      type="button"
                      className={`${style.switch} ${s.isdelete ? style.switchOff : style.switchOn}`}
                      onClick={() => toggleSector(s)}
                      aria-label={(s.isdelete ? "Activar " : "Desactivar ") + s.sectorname}
                    >
                      <span className={`${style.knob} ${s.isdelete ? style.knobOff : style.knobOn}`} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectoresV2;
