import React from "react";
import { useEffect, useState } from "react";
import mainStyles from "@/styles/Home.module.css";
import styles from '@/modules/historicoSoportes.module.css';
import Card from "@/components/Card";

function historicoSoportes() {
  const [soportes, setSoportes] = useState(null);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faqFinish`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketFinish`)
      .then((res) => res.json())
      .then((data) => {
        setSoportes(data);
      });
  }, []);

  return (
    <>
      <div className={mainStyles.container}>
        <h1 className={mainStyles.title}>Soportes Terminados</h1>
        <div className={styles.gridContainer}>
        
          {soportes !== null && soportes.length > 0
            ? soportes.map((e) => (
                <React.Fragment key={e.id}>
                  <Card id={e.id} subject={e.subject} state={e.state} created={e.created}/>
                </React.Fragment>
              ))
            : null}
        </div>
      </div>
      <div></div>
    </>
  );
}

export default historicoSoportes;
