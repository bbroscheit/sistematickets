export function horasPromedio(data) {
    
    const diferenciasEnHoras = data.map(registro => {
        const tiempoInicio = new Date(registro.createdAt).getTime();
        const tiempoFin = new Date(registro.finishdate).getTime();

        if (!isNaN(tiempoInicio) && !isNaN(tiempoFin)) {
            const diferenciaEnMilisegundos = tiempoFin - tiempoInicio;
            return diferenciaEnMilisegundos / (1000 * 60 * 60); // Pasamos a horas
        } else {
            return 0; // caso en el que las fechas no son validas
        }
    });

    // Filtra las horas que no pudieron calcularse (donde al menos un registro tenía fechas no válidas)
    const horasValidas = diferenciasEnHoras.filter(horas => horas > 0);

    if (horasValidas.length === 0) {
        console.log("no hay horas validas"); // caso en el que no hay horas validas
    }

    // Calculamos el promedio de horas
    const promedioHoras = horasValidas.reduce((total, horas) => total + horas, 0) / horasValidas.length;

    return promedioHoras;
    // console.log("promedio", promedioHoras)
}
