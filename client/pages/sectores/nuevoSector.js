import React from 'react'
import mainStyles from '../styles/Home.module.css'

function nuevoSector() {
  return (
    <div className={mainStyles.container}>
        <h1>Creación de Sector</h1>
    <div>
        <label>Nombre de usuario</label>
        <input type="text" name ="username" value="username"/>
    </div>
    <div>
        <button>Crear</button>
        <button>Limpiar</button>
    </div>
</div>
  )
}

export default nuevoSector