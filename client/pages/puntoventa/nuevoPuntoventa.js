import React from 'react'
import mainStyle from '../../styles/Home.module.css'
import style from '@/modules/newSalepoint.module.css'

function nuevoSector() {
  return (
    <div className={mainStyle.container}>
        <h1 className={mainStyle.title}>Creación de Unidad de Negocio</h1>
    <div className={mainStyle.minimalGrid}>
        <h3 className={mainStyle.subtitle}>Unidad de Negocio</h3>
        <input type="text" name ="salepoint" value="salepoint" className={mainStyle.input}/>
    </div>
    <div className={style.buttonContainer}>
        <button className={mainStyle.button}>Crear</button>
        <button className={mainStyle.button}>Limpiar</button>
    </div>
</div>
  )
}

export default nuevoSector