import React from "react";
import { useState, useEffect } from "react";
import mainStyles from "../styles/Home.module.css";
import styles from "@/modules/usuarios.module.css";
import CardUsers from "@/components/CardUsers";

function usuarios() {
  const [user, setUser] = useState(null);
  const [userAlt , setUserAlt] = useState(null);
  const [sector, setSector] = useState(null);
  const [salepoint, setSalepoint] = useState(null)

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setUserAlt(data)
      });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sector`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/sector`)
      .then((res) => res.json())
      .then((data) => {
        setSector(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/salepoint`)
      .then((res) => res.json())
      .then((data) => {
        setSalepoint(data);
      });
  }, []);


  function handleSector(e){
    e.preventDefault()
    e.target.value === "todos" ? setUserAlt( user) : setUserAlt( user.filter( user => user.sector ? user.sector.sectorname === e.target.value : null ))
    
  }

  function handleSalepoint(e){
    e.preventDefault()
    e.target.value === "todos" ? setUserAlt( user) : setUserAlt( user.filter( user =>  user.salepoint ? user.salepoint.salepoint === e.target.value : null ))
    
  }

  function handleSearch(e){
    e.preventDefault()
    setUserAlt( user.filter( user => user.username.includes(e.target.value)))
  }
 
  // console.log("user", user)

  return (
    <>
    <div className={mainStyles.container}>
      <h1 className={mainStyles.title}>Usuarios</h1>
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div className={styles.searchContainer}>
            <h3>Busqueda por usuario</h3>
            <input type="search" onChange={e => handleSearch(e)}/>
          </div>
          <div className={styles.searchContainer}>
            <h3>Filtro por Sector</h3>
            <select onChange={ e => handleSector(e)}>
              <option value="todos">Todos</option>
              { sector && sector.map( e => <option key={e.id} value={e.sectorname}>{e.sectorname}</option> )}
            </select>
          </div>
          <div className={styles.searchContainer}>
            <h3>Filtro por Unidad de Negocio</h3>
            <select onChange={ e => handleSalepoint(e)}>
              <option value="todos">Todos</option>
              { salepoint && salepoint.map( e => <option key={e.id} value={e.salepoint}>{e.salepoint}</option> )}
            </select>
          </div>
        </div>
        <div className={styles.cardContainer}>
          {userAlt &&
            userAlt.map((e) => (
              <CardUsers
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
      </div>
    </div>

    <div className={mainStyles.containerMobile}>
      <h1 className={mainStyles.title}>Usuarios</h1>
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div className={styles.searchContainer}>
            <h3>Busqueda por usuario</h3>
            <input type="search" onChange={e => handleSearch(e)}/>
          </div>
          <div className={styles.searchContainer}>
            <h3>Filtro por Sector</h3>
            <select onChange={ e => handleSector(e)}>
              <option value="todos">Todos</option>
              { sector && sector.map( e => <option key={e.id} value={e.sectorname}>{e.sectorname}</option> )}
            </select>
          </div>
          <div className={styles.searchContainer}>
            <h3>Filtro por Unidad de Negocio</h3>
            <select onChange={ e => handleSalepoint(e)}>
              <option value="todos">Todos</option>
              { salepoint && salepoint.map( e => <option key={e.id} value={e.salepoint}>{e.salepoint}</option> )}
            </select>
          </div>
        </div>
        <div className={styles.cardContainer}>
          {userAlt &&
            userAlt.map((e) => (
              <CardUsers
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
      </div>
    </div>

  </>
  );
}

export default usuarios;
