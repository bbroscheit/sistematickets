import React, { useEffect } from 'react'
import { getTicketDetail } from '../api/getTicketDetail'
import { useRouter } from 'next/router'

function Soporte() {
    const router = useRouter()
    const { id } = router.query

    async function ticketDetail(id){
        return await getTicketDetail(id)
    } 
    useEffect( () => {
        const soporte = ticketDetail(id)
        console.log(soporte)
    },[])

    return (
    <div>
        <h1>Soporte</h1>
    </div>
  )}
export default Soporte