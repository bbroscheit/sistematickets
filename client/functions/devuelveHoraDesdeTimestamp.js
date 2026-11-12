import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// hora HH:mm de un timestamp, en UTC (sin restar el huso horario - ver
// ajustaDevuelveHoraDesdeTimestamp.js si hace falta la hora local)
export default function devuelveHoraDesdeTimestamp(date) {
    const fecha = dayjs.utc(date);
    const hora = fecha.format('HH:mm');
    
    return hora;
}