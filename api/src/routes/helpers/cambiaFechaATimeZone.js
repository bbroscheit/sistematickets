const moment = require('moment-timezone');

const cambiaFechaATimeZone =(startdate) => {
    
    try{
        
        const fecha = startdate;
        const formatoEntrada = 'DD-MM-YYYY';
        const formatoSalida = 'YYYY-MM-DD HH:mm:ss';

        const fechaFormateada = moment.tz(fecha, formatoEntrada, 'UTC').tz('UTC').format(formatoSalida);

        return fechaFormateada;

    }catch(e){
        console.log( "error en helper cambiaFechaATimeZone " , e.message)
    }
}

module.exports = cambiaFechaATimeZone









