const moment = require('moment-timezone');

const cambiaFechaATimeZoneWithHour =(date, hour) => {
    
    try{
        
        const startdate = date;
        const starthour = hour;
        const formatoFechaEntrada = 'DD-MM-YYYY';
        const formatoHoraEntrada = 'HH:mm';
        const formatoSalida = 'YYYY-MM-DD HH:mm:ss';

        const fechaHora = moment(`${startdate} ${starthour}`, `${formatoFechaEntrada} ${formatoHoraEntrada}`).tz('UTC');

        fechaHora.subtract(360, 'minutes'); // restamos 6 horas porque esta tomando cualquier zona horaria
        
        const fechaHoraFormateada = fechaHora.format(formatoSalida);

        return fechaHoraFormateada;

    }catch(e){
        console.log( "error en helper cambiaFechaATimeZoneWithHour " , e.message)
    }
}

module.exports = cambiaFechaATimeZoneWithHour