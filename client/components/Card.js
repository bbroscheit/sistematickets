import React from 'react';
import styles from '../modules/card.module.css'
import Link from 'next/link';


function Card({ id, subject}) {
  return (
    <div className={styles.ticketContainer}>
        <h3 className={styles.gridElement}>Nº Ticket</h3>
        <h3 className={styles.gridElement}>Titulo</h3>
        <h3 className={styles.gridElement}></h3>
      <Link href={`/soportes/${id}`} >
        <h3 className={styles.gridElement}>{id}</h3>
      </Link> 
      <Link href={`/soportes/${id}`} >
        <h3 className={styles.gridElement}>{subject}</h3>
      </Link> 
<<<<<<< HEAD
      <Link href={`/soportes/${id}`}>
=======
      <Link href={`/soportes/${id}`} >
>>>>>>> 6ca68fe5e624c8acd0b13a6e750ec3822d9404da
        <h3 className={styles.gridElement}></h3>
      </Link> 
    </div>
  )
}

export default Card