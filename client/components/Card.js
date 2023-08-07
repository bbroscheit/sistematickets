import React from 'react';
import styles from '../modules/card.module.css'
import Link from 'next/link';


function Card({id,subject}) {
  return (
    <div className={styles.ticketContainer}>
        <h3 className={styles.gridElement}>Nº Ticket</h3>
        <h3 className={styles.gridElement}>Titulo</h3>
        <h3 className={styles.gridElement}></h3>
      <Link href={{ pathname: '/soportes/[id]', query: { id: id }, }} >
        <h3 className={styles.gridElement}>{id}</h3>
      </Link> 
      <Link href={{ pathname: '/soportes/[id]', query: { id: id }, }} >
        <h3 className={styles.gridElement}>{subject}</h3>
      </Link> 
      <Link href={{ pathname: '/soportes/[id]', query: { id: id }, }} >
        <h3 className={styles.gridElement}></h3>
      </Link> 
    </div>
  )
}

export default Card