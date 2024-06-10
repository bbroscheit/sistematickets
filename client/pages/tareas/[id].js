import React from 'react'
import { useRouter } from "next/router";
import { useState, useEffect,  } from 'react'
import mainStyle from "@/styles/Home.module.css"
import style from "@/modules/tareasid.module.css"
import giraFechas from '@/functions/girafechas';



function TaskId() {
    const router = useRouter();
    const id = router.query.id;
    const [ data , setData ] = useState(null)

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/task/${id}`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/task/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            
          });
       
      }, [router.query.id]);

      console.log(data)
    return (
        <div className={mainStyle.container}>
            <h1 className={style.title}> Detalle </h1>
            <div className={style.detailContainer}> 
                { data !== null ? <h3>{data.taskdetail}</h3> : <h3> No existe la tarea seleccionada</h3>}
                { data !== null ? <h4> Finaliza el : {giraFechas(data.taskfinishdate)}</h4> : <h3> No existe la tarea seleccionada</h3>}
            </div>

        </div>
    )
}

export default TaskId