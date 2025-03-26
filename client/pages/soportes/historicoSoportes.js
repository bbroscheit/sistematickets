import React, { useEffect, useState } from "react";
import mainStyles from "@/styles/Home.module.css";
import styles from '@/modules/historicoSoportes.module.css';
import Card from "@/components/Card";

function HistoricoSoportes() {
  const [soportes, setSoportes] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLogin = localStorage.getItem("user");
    const loginParse = JSON.parse(userLogin);
    setUser(loginParse);

    const fetchSoportes = async () => {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faqFinish`);
      const data = await res.json();

      if (loginParse.sector === "Sistemas" || loginParse.sector === "Supervisor" || loginParse.sector === "Administrador") {
        setSoportes(data);
      } else {
        setSoportes(data.filter(e => e.user.username === loginParse.name));
      }
    };

    fetchSoportes();
  }, []);

  return (
    <div className={mainStyles.container}>
      <h1 className={mainStyles.title}>Soportes Terminados</h1>
      <div className={styles.gridContainer}>
        {soportes && soportes.length > 0 ? (
          soportes.map((e) => (
            <React.Fragment key={e.id}>
              <Card id={e.id} subject={e.subject} state={e.state} created={e.created} />
            </React.Fragment>
          ))
        ) : null}
      </div>
    </div>
  );
}

export default HistoricoSoportes;
