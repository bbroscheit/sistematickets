import React, { useEffect } from 'react'
import { getTicketDetail } from '../api/getTicketDetail'
import { useRouter } from 'next/router'
import style from '../../modules/detail.module.css'

function Soporte() {
    // const router = useRouter()
    // const { id } = router.query

    // async function ticketDetail(id){
    //     return await getTicketDetail(id)
    // } 
    // useEffect( () => {
    //     const soporte = ticketDetail(id)
    //     console.log(soporte)
    // },[])

    const soporteHardcore = [{
        id : 1,
        state: "generado",
        worker: "sin definir",
        subject: "titulo de prueba",
        detail: "descripcion de prueba",
        userresolved: false,
        user:"usuario creador"
    }]

    const workerHardcore = [{
        id : 1,
        username:"bbroscheit"
    },{
        id:2,
        username:"lllamanzarez"
    },{
        id:3,
        username:"asuarez"
    }]

    return (
    <div className={style.detailContainer}>
        <h1>Soporte Nº {soporteHardcore[0].id}</h1>
        <h2>Título</h2>
        <h2>{soporteHardcore[0].subject}</h2>
        <div> 
            <div>
                {/* bloquedo, se habilita solo si el usuario que consulta es worker*/}
                <h3>Estado : </h3>
                <select>
                    <option>Generado</option>
                    <option>Asignado</option>
                    <option>En Desarrollo</option>
                    <option>Solicita mas información</option>
                    <option>Completada</option>
                    <option>Terminada</option>
                </select>
            </div>
            <div>
                {/* bloquedo, se habilita solo si el usuario que consulta es worker*/}
                <h3>Asignado a : </h3> 
                <select>
                    {workerHardcore.map( e => <option key={e.id}>{e.username}</option>)}
                </select>
            </div>
        </div>
        {/* aparece solo spara el worker*/}
        <div>
            <div>
                <h3>Usuario : {soporteHardcore[0].user}</h3>
            </div>
            <div>
                <h3>Resuelve usuario?</h3>
                <input type="radio" value="yes" name="resolve" />
                <input type="radio" value="no" name="resolve" />
            </div>
        </div>
        <div>
            {/* bloqueado para todos*/}
            <h3>Detalle : </h3>
            <textarea placeholder={soporteHardcore[0].detail} cols="100" rows="17"/>
        </div>
        <div>
            {/* bloqueado para el usuario y el worker una vez enviado*/}
            <h3>Solicitud de datos : </h3>
            <textarea placeholder="Motivo para solicitar mas datos..." cols="100" rows="17"/>
        </div>
        <div>
            {/* aparece solo si el estado es "solicita mas datos" ,bloqueado para el usuario y el worker una vez enviado*/}
            <h3>Datos adicionales : </h3>
            <textarea  placeholder="Datos agregados por el usuario" cols="100" rows="17"/>
        </div>
        <div>
            {/* bloqueado para el usuario*/}
            <h3>Resolución : </h3>
            <textarea placeholder="Solucion dada por el Worker" cols="100" rows="17"/>
        </div>
        <div>
            <button type="button">Aceptar</button>
            <button type="button">Cerrar Ticket</button>
        </div>
    </div>
  )}
export default Soporte