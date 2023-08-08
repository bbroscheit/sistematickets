import React from 'react'
import mainStyle from '../../styles/Home.module.css'
import style from '@/modules/newSector.module.css'

function nuevoSector() {
  return (
    <div className={mainStyle.container}>
        <h1 className={mainStyle.title}>Creación de Sector</h1>
    <div className={mainStyle.minimalGrid}>
        <h3 className={mainStyle.subtitle}>Nombre de Sector</h3>
        <input type="text" name ="sector" value="sector" className={mainStyle.input}/>
    </div>
    <div className={style.buttonContainer}>
        <button className={mainStyle.button}>Crear</button>
        <button className={mainStyle.button}>Limpiar</button>
    </div>
</div>
  )
}

export default nuevoSector