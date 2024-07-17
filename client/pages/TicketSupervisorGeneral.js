import React, { useState, useEffect} from "react";
import mainStyle from "@/styles/Home.module.css";
import style from "@/modules/ticketSupervisorSector.module.css";
import UsersGeneral from "./supervisor/UsersGeneral";

function TicketsSupervisorGeneral() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
  }, []);

  return (
    <div className={mainStyle.container}>
      {
        user !== null ? 
          <>
            <h1 className={mainStyle.title}>{user.sector}</h1>
            <div className={style.container}>
              <UsersGeneral />
            </div>
          </> : <h3>Loading...</h3>
      }
      
    </div>
  );
}

export default TicketsSupervisorGeneral;