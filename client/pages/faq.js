import React from "react";
import { useState, useEffect } from "react";
import styles from '@/modules/faq.module.css'
import mainStyles from '@/styles/Home.module.css';
import CardFaq from "@/components/CardFaq";


function faq() {
    const [faq, setFaq] = useState(null);

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`)
          .then((res) => res.json())
          .then((data) => {
            setFaq(data);
          });
      }, []);

    console.log(faq)

  return (
    <>
    <div className={mainStyles.container}>
      <h1 className={mainStyles.title}>Preguntas Frecuentes</h1>
      { faq !== null && faq.length > 0 ? 
              <div className={styles.cardContainer}>
              {
                faq.map((e) => ( <CardFaq id= {e.id} title= {e.title} /> ))}
              </div> : <h1> aún no se ha cargado ningún soporte </h1>
          }
    </div>

    <div className={mainStyles.containerMobile}>
      <h1 className={mainStyles.title}>Preguntas Frecuentes</h1>
      { faq !== null && faq.length > 0 ? 
              <div className={styles.cardContainerMobile}>
              {
                faq.map((e) => ( <CardFaq id= {e.id} title= {e.title} /> ))}
              </div> : <h1> aún no se ha cargado ningún soporte </h1>
          }
    </div>
    </>
    )
}

export default faq;