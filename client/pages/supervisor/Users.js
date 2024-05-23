import React, { useState, useEffect } from 'react'
import style from '@/modules/users.module.css'
import arrayUser from '@/functions/arrayUser';
import CardSupervisorUsers from '@/components/CardSupervisorUsers';


function Users() {
  const [soporte, setSoporte] = useState(null)
  const [user, setUser] = useState(null)
  const [usuarios, setUsuarios] = useState(null);

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketSupervisorData?sector=${loginParse.sector}`)
       // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketSupervisorView?sector=${sector}`)
       .then((res) => res.json())
       .then((data) => {
          setSoporte(data);
          setUsuarios(arrayUser(data))
       });
  },[]);

  return (
    <div className={style.container}>
      {
        usuarios !== null && usuarios.length > 0 ? usuarios.map( e => <CardSupervisorUsers soportes={soporte} usuario = { e }/> ): <h3>No hay usuarios con tickets activos</h3>
      }
      
    </div>
  )
}

export default Users