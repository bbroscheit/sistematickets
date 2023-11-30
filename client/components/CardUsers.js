import React from "react";
import Link from "next/link";
import styles from "@/modules/carUser.module.css";

function CardUsers({
  
  id,
  username,
  firstname,
  lastname,
  phonenumber,
  email,
  sector,
  salepoint,
}) {

  // console.log("id user", id )
  
  return (
    
    <Link href={`/usuarios/${id}`} >
      <div className={styles.cardContainer}>
        <div className={styles.Container}>
          <h3>{username}</h3>
        </div>
        <div className={styles.Container}>
          <h4>Nombre: {firstname ? firstname : "no hay datos"} {lastname ? lastname : "no hay datos"}</h4>
        </div>
        <div className={styles.Container}>
          <h4>Int : {phonenumber ? phonenumber : "no hay datos"}</h4>
        </div>
        <div className={styles.Container}>
          <h4>{ email ? email : "no hay datos"}</h4>
        </div>
        <div className={styles.Container}>
          <h4>{sector ? sector.sectorname : "no hay datos"}</h4>
        </div>
        <div className={styles.Container}>
          <h4>{salepoint ? salepoint.salepoint : "no hay datos"}</h4>
        </div>
      </div>
    </Link>
    
  );
}

export default CardUsers;
