import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default function devuelveHoraDesdeTimestamp(date) {
    const fecha = dayjs.utc(date);
    const hora = fecha.format('HH:mm');
    
    return hora;
}