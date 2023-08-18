import React from 'react'
import Link from 'next/link'
import styles from '@/modules/carUser.module.css'


function CardUsers({username, sector, salepoint}) {
  
  return (
    <Link href="/usuarios/detalleUsuario">
    <div className={styles.cardContainer}>
      <div className={styles.Container}>
          <h2>Nombre de usuario</h2>
          <h3>{username}</h3>
      </div>
      <div className={styles.Container}>
          <h3>Sector</h3>
          <h4>{sector ? sector.sectorname : "no hay datos"}</h4>
      </div>  
      <div className={styles.Container}>  
        <h3>Punto de Venta</h3>
        <h4>{salepoint ? salepoint.salepoint : "no hay datos"}</h4>
      </div>
    </div>
    </Link>
  )
}

export default CardUsers