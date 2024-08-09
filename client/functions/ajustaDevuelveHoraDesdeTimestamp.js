import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function ajustaDevuelveHoraDesdeTimestamp(date) {
    const fecha = dayjs.utc(date).subtract(3, 'hour');
    const hora = fecha.format('HH:mm');
    
    return hora;
}

export default ajustaDevuelveHoraDesdeTimestamp;