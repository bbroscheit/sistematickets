import React from 'react'
import style from '@/modules/cardTicketDeveloper.module.css'
import {devuelveIniciales} from '@/functions/devuelveIniciales'
import { devuelveInicial } from '@/functions/devuelveInicial'
import { Tooltip } from '@mui/material'

function CardTicketDeveloper({id , state , subject , user}) {
   

  return (
    <div className={style.container}>
        <div className={style.firstLine}>
            <h4 >T {id}</h4>
            <div className={style.divEstados}>
                <Tooltip title= {`${state}`}>
                  <h4 className={style.estado}>{devuelveInicial(state)}</h4>
                </Tooltip>
                <Tooltip title= {`${user.firstname} ${user.lastname}`}>
                  <h4 className={style.user}>{devuelveIniciales(user.firstname,user.lastname)}</h4>
                </Tooltip>
            </div>
            
            
        </div>
        
        
        
        <h4 className={style.subject}>{subject}</h4>
    </div>
  )
}

export default CardTicketDeveloper