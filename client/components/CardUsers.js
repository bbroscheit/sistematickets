import React from 'react'
import Link from 'next/link'
import styles from '@/modules/carUser.module.css'


function CardUsers({username, firstname, lastname, phonenumber, sector, salepoint}) {
  
  return (
    <Link href="/usuarios/detalleUsuario">
    <div className={styles.cardContainer}>
      <div className={styles.Container}>
          
          <h3>{username}</h3>
      </div>
      <div className={styles.Container}>
          
          <h4>{firstname ? firstname : "no hay datos"}</h4>
      </div> 
      <div className={styles.Container}>
          
          <h4>{lastname ? lastname : "no hay datos"}</h4>
      </div> 
      <div className={styles.Container}>
          
          <h4>{phonenumber ? phonenumber   : "no hay datos"}</h4>
      </div> 
      <div className={styles.Container}>
          
          <h4>{ sector ? sector.sectorname : "no hay datos"}</h4>
      </div> 
      <div className={styles.Container}>  
        
        <h4>{salepoint ? salepoint.salepoint : "no hay datos"}</h4>
      </div>
    </div>
    </Link>
  )
}

export default CardUsers