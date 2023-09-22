import React from 'react'
import Style from '@/modules/UserstoriesCard.module.css'
import Taskcontainer from '@/components/Taskcontainer'

function UserstoriesCard({id, storiesname, storiesdetail}) {
  return (
    <div className={Style.userstoriesCard}>
        <h3>{storiesname}</h3>
        <p>{storiesdetail}</p>
        <hr />
        <Taskcontainer id={id}/>
    </div>
  )
}

export default UserstoriesCard