import React from "react";
import { useEffect, useState } from "react";
import mainStyles from "@/styles/Home.module.css";
import styles from '@/modules/historicoSoportes.module.css';
import Card from "@/components/Card";

function historicoSoportes() {
  const [soportes, setSoportes] = useState(null);
  const [ soportesFiltered, setSoportesFiltered ] = useState(null)
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
    
    if(loginParse.sector === "Sistemas" || loginParse.sector === "Supervisor" || loginParse.sector === "Administrador"){
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faqFinish`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faqFinish`)
      .then((res) => res.json())
      .then((data) => {
        setSoportes(data);
      });
    }else{
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faqFinish`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faqFinish`)
      .then((res) => res.json())
      .then((data) => {
        setSoportes(data.filter( e => e.user.username === loginParse.name));
      });
    }
    
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
