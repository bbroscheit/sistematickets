import React from 'react'

function detalleUsuario() {
  return (
    <div className={mainStyles.container}>
    <h1>Creación de Usuario</h1>
    <div>
        <label>Nombre de usuario</label>
        <input type="text" name ="username" value="username"/>
        <label>Password </label>
        <input type="password" name ="password" value="password"/>
        <label>Nombre</label>
        <input type="text" name ="name" value="name"/>
        <label>Apellido</label>
        <input type="text" name ="surname" value="surname"/>
        <label>E-mail</label>
        <input type="email" name ="email" value="email"/>
    </div>
    <div>
        <div>
            <label>Interno</label>
            <input type="number" name ="int" value="int"/>
        </div>
        <div>
            <label>Da Soporte ?</label>
            <select>
                <option>Si</option>
                <option>No</option>
            </select>
        </div>
    </div>
    <div>
        <label>Sector</label>
        <select>
            <option>sector 1</option>
            <option>sector 2</option>
            <option>sector 3</option>
        </select>
    </div>
    <div>
        <label>Unidad de Negocio</label>
        <select>
            <option>unidad de negocio 1</option>
            <option>unidad de negocio 2</option>
            <option>unidad de negocio 3</option>
        </select>
    </div>
    <div>
        <button>Modificar</button>
        <button>Limpiar</button>
    </div>
</div>
  )
}

export default detalleUsuario