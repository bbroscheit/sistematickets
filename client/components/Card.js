import React from 'react';
import styles from '../modules/card.module.css'


function Card({id,subject}) {
  return (
    <div className={styles.ticketContainer}>
        <h3 className={styles.gridElement}>Nº Ticket</h3>
        <h3 className={styles.gridElement}>Titulo</h3>
        <h3 className={styles.gridElement}></h3>
        <h3 className={styles.gridElement}>{id}</h3>
        <h3 className={styles.gridElement}>{subject}</h3>
        <h3 className={styles.gridElement}></h3>
        
    </div>
  )
}

export default Card