import dayjs from "dayjs";

export default function devuelveHoraDesdeTimestamp(date) {
    const fecha = dayjs(date);
    const hora = fecha.format('HH:mm');

        return hora;
}