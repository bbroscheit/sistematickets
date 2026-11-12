import React from 'react';
import styles from '@/modules/cardFaq.module.css';
import Link from 'next/link';



// card de una faq en el listado (Faq.js), linkea al detalle. el segundo
// div (faqContainerMobile) es la misma card con otro css para mobile
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