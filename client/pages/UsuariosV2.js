import React, { useState, useEffect } from "react";
import mainStyles from "@/styles/Home.module.css";
import style from "@/modules/usuariosV2.module.css";
import CardUsersV2 from "@/components/CardUsersV2";

function UsuariosV2() {
  const [data, setData] = useState({
    users: [],
    sectors: [],
    salepoints: [],
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("todos");
  const [selectedSalepoint, setSelectedSalepoint] = useState("todos");

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, sectorsRes, salepointsRes] = await Promise.all([
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`).then((res) => res.json()),
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sector`).then((res) => res.json()),
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`).then((res) => res.json()),
      ]);

      usersRes.sort((a, b) => a.username.localeCompare(b.username));

      // sectores/puntos de venta unicos por nombre (mismo criterio que usan el resto de las pantallas)
      const uniqueSectors = Object.values(
        sectorsRes.reduce((acc, s) => { acc[s.sectorname] = s; return acc; }, {})
      );
      const uniqueSalepoints = Object.values(
        salepointsRes.reduce((acc, sp) => { acc[sp.salepoint] = sp; return acc; }, {})
      );

      setData({
        users: usersRes,
        sectors: uniqueSectors,
        salepoints: uniqueSalepoints,
      });
      setFilteredUsers(usersRes);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data.users;

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSector !== "todos") {
      filtered = filtered.filter((user) =>
        (user.sectors || []).some((s) => s.sectorname === selectedSector)
      );
    }

    if (selectedSalepoint !== "todos") {
      filtered = filtered.filter((user) =>
        (user.salepoints || []).some((sp) => sp.salepoint === selectedSalepoint)
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, selectedSector, selectedSalepoint, data.users]);

  return (
    <div className={mainStyles.container}>
      <div className={style.pageWrap}>
        <div className={style.page}>
          <div className={style.pageHead}>
            <div className={style.pageHeadLeft}>
              <h1>Usuarios</h1>
              <p>{filteredUsers.length} usuarios</p>
            </div>
            <a href="/usuarios/nuevoUsuario" className={`${style.btn} ${style.btnPrimary}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Nuevo usuario
            </a>
          </div>

          <div className={style.filterCard}>
            <div className={style.searchRow}>
              <div className={style.searchInput}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8a8f98" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input
                  type="search"
                  placeholder="Buscar por usuario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className={style.filterRow}>
              <span className={style.filterLabel}>Sector</span>
              <div className={style.chipRow}>
                <button
                  type="button"
                  className={`${style.chip} ${selectedSector === "todos" ? style.chipActive : ""}`}
                  onClick={() => setSelectedSector("todos")}
                >
                  Todos
                </button>
                {data.sectors.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    className={`${style.chip} ${selectedSector === s.sectorname ? style.chipActive : ""}`}
                    onClick={() => setSelectedSector(s.sectorname)}
                  >
                    {s.sectorname}
                  </button>
                ))}
              </div>
            </div>
            <div className={style.filterRow}>
              <span className={style.filterLabel}>Punto de venta</span>
              <div className={style.chipRow}>
                <button
                  type="button"
                  className={`${style.chip} ${selectedSalepoint === "todos" ? style.chipActive : ""}`}
                  onClick={() => setSelectedSalepoint("todos")}
                >
                  Todos
                </button>
                {data.salepoints.map((sp) => (
                  <button
                    type="button"
                    key={sp.id}
                    className={`${style.chip} ${selectedSalepoint === sp.salepoint ? style.chipActive : ""}`}
                    onClick={() => setSelectedSalepoint(sp.salepoint)}
                  >
                    {sp.salepoint}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredUsers.length > 0 ? (
            <div className={style.userGrid}>
              {filteredUsers.map((u) => (
                <CardUsersV2
                  key={u.id}
                  id={u.id}
                  username={u.username}
                  firstname={u.firstname}
                  lastname={u.lastname}
                  phonenumber={u.phonenumber}
                  email={u.email}
                  sectors={u.sectors}
                  salepoints={u.salepoints}
                />
              ))}
            </div>
          ) : (
            <div className={style.emptyState}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c3c7cd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <span className={style.emptyTitle}>No se encontraron usuarios</span>
              <span className={style.emptySub}>Probá con otro nombre de usuario o cambiá los filtros</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsuariosV2;
