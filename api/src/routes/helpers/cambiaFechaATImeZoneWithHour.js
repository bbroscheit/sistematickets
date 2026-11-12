const moment = require('moment-timezone');

// toma una fecha (dd-mm-aaaa) y una hora (hh:mm) sueltas y las junta en un
// solo datetime en UTC, para guardar en la base. ver el comentario del
// subtract de abajo, es un ajuste a mano
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