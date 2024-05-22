import React, { useState, useEffect } from 'react'
import style from '@/modules/developers.module.css'
import arrayDesarrollador from '@/functions/arrayDesarrollador'
import CardSupervisorUsers from '@/components/CardSupervisorUsers';
import CardDeveloper from '@/components/CardDeveloper';


function Users() {
  
  const [ supervisorSector, setSupervisorSector ] = useState(null)

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setSupervisorSector(loginParse.sector);
  }, []);

  return (
    <div className={style.container}>
      <CardSupervisorUsers sector={supervisorSector} />
    </div>
  )
}

export default Users