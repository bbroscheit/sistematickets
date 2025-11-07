import React, {useState, useEffect} from 'react'
import style from '../modules/cardInformacionTicketWorker.module.css'
import CardTicketWorker from '@/components/CardTicketWorker'

function CardInformacionTicketsWorker({id}) {
    const [ soportes, setSoportes ] = useState(null);
    const [ soportesAlt, setSoportesAlt ] = useState(null);

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketsByWorkerId?workerId=${id}`)
        .then(res => res.json())    
        .then(data => {
            setSoportes(data);
            setSoportesAlt(data);
        })
    }, [id]);

    function handleResetFilter(){
        setSoportesAlt(soportes)
    }

    function handleSelectFilter(e){
        //console.log(e.target.getAttribute("value"))
        e.preventDefault()
        setSoportesAlt(soportes.filter(s => s.state === e.target.getAttribute("value"))) 
    }

    //console.log("soportes en CardInformacionTicketsWorker:", soportesAlt);

  return (
    <div className={style.infoContainer}>
        <div className={style.infoContainerGroupSelection}>
            <h3>Tickets</h3>
            <div className={style.infoContainerButton}>
                <p onClick={e => handleResetFilter(e)}>Todos</p>
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
                   
                    : <p>No hay Tickets para mostrar</p>
            }
        </div> 
    </div>
  )
}

export default CardInformacionTicketsWorker