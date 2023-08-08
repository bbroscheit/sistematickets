import React from 'react'
import mainStyles from '../../styles/Home.module.css'

function nuevoSector() {
  return (
    <div className={mainStyles.container}>
        <h1>Creación de Unidad de Negocio</h1>
    <div>
        <label>Nombre de Unidad de Negocio</label>
        <input type="text" name ="salepoint" value="salepoint"/>
    </div>
    <div>
        <button>Crear</button>
        <button>Limpiar</button>
    </div>
</div>
  )
}

export default nuevoSector