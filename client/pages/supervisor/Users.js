import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import styleCard from "@/modules/ticketsSupervisor.module.css";
import arrayUser from '@/functions/arrayUser';
import CardSupervisorUsers from '@/components/CardSupervisorUsers';
import CardSupervisorOwnUser from '@/components/CardSupervisorOwnUser';
import useUser from '@/hooks/useUser';


function Users() {
  const router = useRouter();
  const [soporte, setSoporte] = useState(null)
  const [user, setUser] = useUser();
  const [ownSoporte, setOwnSoporte] = useState(null)
  const [ownUser, setOwnUser] = useState(null)
  const [usuarios, setUsuarios] = useState(null);


  // Recibe todos los tickets generados por el sector que corresponda y hace un array con los usuarios generadores
  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
    if (loginParse) {
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketSupervisorData?sector=${loginParse.sector}`)
       // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketSupervisorView?sector=${sector}`)
       .then((res) => res.json())
       .then((data) => {
          setSoporte(data);
          setUsuarios(arrayUser(data))
       });
      }else{
        router.push("/");
      }
  },[]);

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    if (loginParse) {
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsByUser?username=${loginParse.name}`)
       // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsByUser?username=${loginParse.name}`)
       .then((res) => res.json())
       .then((data) => {
          setOwnSoporte(data);
          setOwnUser(arrayUser(data))
       })
      } else {
        router.push("/");
      }
  },[]);

  //console.log("soporte", soporte)
  //console.log("ownsoporte", ownSoporte)

  return (
    <div className={styleCard.cardContainer}>
      {
        ownUser !== null && ownUser.length > 0 ? ownUser.map( e => <CardSupervisorUsers soportes={ownSoporte} usuario={e} />) : null
      }
      {
        usuarios !== null && usuarios.length > 0 ? usuarios.map( e => <CardSupervisorUsers soportes={soporte} usuario = { e } key={e}/> ): <h3>No hay usuarios con tickets activos</h3>
      }
      
    </div>
  )
}

export default Users