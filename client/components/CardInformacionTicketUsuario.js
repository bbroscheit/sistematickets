import React, {useState, useEffect} from 'react'
import style from '../modules/cardInformacionTicketWorker.module.css'
import CardTicketWorker from '@/components/CardTicketWorker'

function CardInformacionTicketUsuario({user}) {
    const [ soportes, setSoportes ] = useState(null);
    const [ soportesAlt, setSoportesAlt ] = useState(null);

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsByUsuarioId?usuarioId=${user}`)
        .then(res => res.json())    
        .then(data => {
            setSoportes(data);
            setSoportesAlt(data);
        })
    }, [user]);

    function handleResetFilter(){
        setSoportesAlt(soportes)
    }

    function handleSelectFilter(e){
        //console.log(e.target.getAttribute("value"))
        e.preventDefault()
        setSoportesAlt(soportes.filter(s => s.state === e.target.getAttribute("value"))) 
    }

    
  return (
    <div className={style.infoContainer}>
        <div className={style.infoContainerGroupSelection}>
            <h3>Tickets</h3>
            <div className={style.infoContainerButton}>
                <p onClick={e => handleResetFilter(e)}>Todos</p>
                <p onClick={e => handleSelectFilter(e)} value="sin asignar">Sin Asignar</p>
                <p onClick={e => handleSelectFilter(e)} value="Asignado">Asignados</p>
                <p onClick={e => handleSelectFilter(e)} value="Desarrollo">Desarrollo</p>
                <p onClick={e => handleSelectFilter(e)} value="Informacion">Información</p>
                <p onClick={e => handleSelectFilter(e)} value="Completo">Completo</p>
            </div>
        </div>
        <div >
            {
                soportesAlt !== null && soportesAlt.length > 0 ?
                    
                        <CardTicketWorker soportes={soportesAlt}/>
                   
                    : <div className={style.noResults}>
                        <p>No hay resultados</p>
                    </div>
            }
        </div> 
    </div>
  )
}

export default CardInformacionTicketUsuario