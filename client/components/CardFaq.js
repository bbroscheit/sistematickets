import React from 'react';
import styles from '@/modules/cardFaq.module.css';
import Link from 'next/link';



function CardFaq({ id, title }) {
  return (
    <>
    <div className={styles.faqContainer}>
                     
      <Link href={`/faq/${id}`} >
        <h3 >{title}</h3>
      </Link> 
        
    </div>

    <div className={styles.faqContainerMobile}>
                     
      <Link href={`/faq/${id}`} >
        <h3 >{title}</h3>
      </Link> 
        
    </div>
</>
  )
}

export default CardFaq