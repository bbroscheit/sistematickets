import React, { useState, useEffect, Fragment } from "react";
import style from "@/modules/ticketsSupervisor.module.css";
import Card from "@/components/Card";


function Users() {
  const [soportes, setSoportes] = useState(null);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketGenerados`)
      .then((res) => res.json())
      .then((data) => {
        setSoportes(data);
      });
  },[]);

  return (
     <div className={style.gridContainer}>
        {soportes !== null && soportes.length > 0 ? (
          <>
            
            {soportes.map((e) => (
                  <Fragment key={e.id}>
                    <Card
                      key={e.id}
                      id={e.id}
                      subject={e.subject}
                      state={e.state}
                      created={e.created}
                    />
                  </Fragment>
                ))}
          </>
        ) : <h2>Esperando...</h2>}
      </div>
  )
}

export default Users