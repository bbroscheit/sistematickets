export function horasPasadas(array , time) {
    const unaHoraEnMs = 3600000; // 1 hora en milisegundos
    const tiempoTotal = unaHoraEnMs*time

    let ahora = new Date(); // Obtener la fecha y hora actual

    let conUnaHoraOMas = array.filter(e => {
        // Convertir la fecha almacenada en startdate a objeto Date
        let startdate = new Date(e.startdate);

        // Calcular la diferencia de tiempo entre la fecha actual y startdate en milisegundos
        let diferenciaDeTiempo = ahora.getTime() - startdate.getTime();

        // Verificar si la diferencia de tiempo es mayor o igual a una hora
        return diferenciaDeTiempo >= tiempoTotal;
    });

    return conUnaHoraOMas;
}