// import React, { useState, useEffect} from "react";
// import mainStyle from "@/styles/Home.module.css";
// import style from "@/modules/ticketSupervisorSector.module.css";
// import Users from "./supervisor/Users";

// function TicketsSupervisorSector() {
//   const [user, setUser] = useState(null);
  
//   useEffect(() => {
//     let userLogin = localStorage.getItem("user");
//     let loginParse = JSON.parse(userLogin);
//     setUser(loginParse);
//   }, []);

//   return (
//     <div className={mainStyle.container}>
//       {
//         user !== null ? 
//           <>
//             <h1 className={mainStyle.title}>{user.sector}</h1>
//             <div className={style.container}>
//               <Users />
//             </div>
//           </> : <h3>Loading...</h3>
//       }
      
//     </div>
//   );
// }

// export default TicketsSupervisorSector;

import React, { useState, useEffect} from "react";
import mainStyle from "@/styles/Home.module.css";
import useAutoFetchDesarrollos from "@/hooks/useAutoFetchDesarrollos";
import style from "@/modules/ticketSupervisorSector.module.css";
import Users from "./supervisor/Users";
import TicketVistaDesarrollo from "./desarrollos/TicketVistaDesarrollo";

function TicketsSupervisorSector() {
  const [user, setUser] = useState(null);
  const [desarrollos, setDesarrollos] = useState(null);
  const [flag, setFlag] = useState(false);

  const baseUrl = `http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001`;
  
  useAutoFetchDesarrollos(`${baseUrl}/desarrollo`, setDesarrollos);
  
  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
  }, []);

  console.log("desarrollo", desarrollos)

  return (
    <div className={mainStyle.container}>
      { user !== null ? <h1 className={mainStyle.title}>{user.sector}</h1> : <h1 className={mainStyle.title}>Jefatura</h1> }
        { desarrollos && desarrollos.length === 0 ?
          <div className={style.container}>
            <Users />
          </div> : 
          <>
            <div className={style.buttonContainer}>
              <button className={flag === false ? style.buttonActive : style.buttonInactive }onClick={() => setFlag(false)}> Soportes </button>
              <button className={flag === false ? style.buttonInactive : style.buttonActive}onClick={() => setFlag(true)}> Desarrollos </button>
            </div>
            {flag === false ? (
              <div className={flag === false ? style.ticketVistaContainerActive : style.ticketVistaContainerInactive}>
                <div className={style.container}>
                  <Users />
                </div>
              </div>
            ) : (
              <div className={flag === false ? style.ticketVistaContainerInactive : style.ticketVistaContainerActive}>
                <TicketVistaDesarrollo
                desarrollos={desarrollos}
                user={user}
              />
              </div>
            )}
          </>
        }
    </div>
  );
}

export default TicketsSupervisorSector;