import React from 'react'
import Style from '@/modules/projectCard.module.css';
import Link from 'next/link';


function projectCard({id , state, projectName, projectDetail, requirer, worker, finishdate}) {
  
  
  return (
    <Link href={`/proyectos/${id}`}>
    <div className={Style.cardContainer}>
        <div className={Style.projectCardTitle}>
          <h2>{projectName}</h2>
          <p>{finishdate}</p>
        </div>
        <div className={Style.projectCardDetail}>
          <p>{projectDetail}</p>
        </div>
        <div className={Style.projectCardPeople}>
          <h6>Solicitado por : {requirer}</h6>
          <h6>Desarrollado por : {worker}</h6>
        </div>
        <div>
          <h6>Progreso</h6>
          {/* para cambiar por barra de progreso */}
          <hr />
        </div>
    </div>
    </Link>
  )
}

export default projectCard