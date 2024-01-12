import React from 'react'
import { useState, useEffect } from 'react'
import DashboardCardTicket from '@/components/DashboardCardTicket'
import mainStyles from '../styles/Home.module.css'
import style from '../modules/tablero.module.css'


function tablero() {
  return (
    <>
        <div className={mainStyles.container}>
            <h1 className={mainStyles.title}>Indicadores</h1>
            <div className={style.dashboardCardContainer}>
                <DashboardCardTicket id={1} />
                <DashboardCardTicket id={2} />
                <DashboardCardTicket id={3} />
            </div>
        </div>

    </>
  )
}

export default tablero