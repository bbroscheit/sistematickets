import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// igual que devuelveHoraDesdeTimestamp pero restando 3hs (UTC a hora
// argentina), para mostrar la hora real de un soporte/desarrollo
function ajustaDevuelveHoraDesdeTimestamp(date) {
    const fecha = dayjs.utc(date).subtract(3, 'hour');
    const hora = fecha.format('HH:mm');
    
    return hora;
}

export default ajustaDevuelveHoraDesdeTimestamp;