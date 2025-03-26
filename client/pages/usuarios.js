import React from "react";
import { useState, useEffect } from "react";
import mainStyles from "../styles/Home.module.css";
import styles from "@/modules/usuarios.module.css";
import CardUsers from "@/components/CardUsers";

function Usuarios() {
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
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`).then(
          (res) => res.json()
        ),
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sector`).then(
          (res) => res.json()
        ),
        fetch(
          `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`
        ).then((res) => res.json()),
      ]);

      // Ordenar los usuarios por nombre de usuario
      usersRes.sort((a, b) => a.username.localeCompare(b.username));

      setData({
        users: usersRes,
        sectors: sectorsRes,
        salepoints: salepointsRes,
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
        user.sector ? user.sector.sectorname === selectedSector : false
      );
    }

    if (selectedSalepoint !== "todos") {
      filtered = filtered.filter((user) =>
        user.salepoint ? user.salepoint.salepoint === selectedSalepoint : false
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, selectedSector, selectedSalepoint, data.users]);

  const renderFilters = () => (
    <div className={styles.filterContainer}>
      <div className={styles.searchContainer}>
        <h3>Busqueda por usuario</h3>
        <input
          type="search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.searchContainer}>
        <h3>Filtro por Sector</h3>
        <select onChange={(e) => setSelectedSector(e.target.value)}>
          <option value="todos">Todos</option>
          {data.sectors.map((e) => (
            <option key={e.id} value={e.sectorname}>
              {e.sectorname}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.searchContainer}>
        <h3>Filtro por Unidad de Negocio</h3>
        <select onChange={(e) => setSelectedSalepoint(e.target.value)}>
          <option value="todos">Todos</option>
          {data.salepoints.map((e) => (
            <option key={e.id} value={e.salepoint}>
              {e.salepoint}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className={styles.cardContainer}>
      {filteredUsers.map((e) => (
        <CardUsers
          key={e.id}
          id={e.id}
          username={e.username}
          firstname={e.firstname}
          lastname={e.lastname}
          phonenumber={e.phonenumber}
          email={e.email}
          sector={e.sector}
          salepoint={e.salepoint}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className={mainStyles.container}>
        <h1 className={mainStyles.title}>Usuarios</h1>
        <div className={styles.mainContainer}>
          {renderFilters()}
          {renderUsers()}
        </div>
      </div>

      <div className={mainStyles.containerMobile}>
        <h1 className={mainStyles.title}>Usuarios</h1>
        <div className={styles.mainContainer}>
          {renderFilters()}
          {renderUsers()}
        </div>
      </div>
    </>
  );
}

export default Usuarios;
