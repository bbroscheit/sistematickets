export function horasPromedioHabiles(data) {
    const horasLaborablesPorDia = 18; // Horas laborables por día
    const diasLaborablesPorSemana = 5; // Días laborables por semana

    // Calcular las horas hábiles transcurridas para cada objeto en el array
    const horasHabilesPorObjeto = data.map(registro => {
        const tiempoInicio = new Date(registro.createdAt).getTime();
        const tiempoFin = new Date(registro.finishdate).getTime();

        if (!isNaN(tiempoInicio) && !isNaN(tiempoFin)) {
            const inicio = new Date(tiempoInicio);
            const fin = new Date(tiempoFin);

            // Inicializar la cantidad de horas hábiles en 0
            let horasHabiles = 0;

            // Iterar desde la fecha de inicio hasta la fecha de fin
            while (inicio < fin) {
                // Verificar si el día actual es laborable (lunes a viernes)
                const diaActual = inicio.getDay();
                const esLaborable = diaActual >= 1 && diaActual <= 5;

                if (esLaborable) {
                    // Calcular las horas laborables restantes en el día actual
                    const horaActual = inicio.getHours();
                    const horasRestantes = horasLaborablesPorDia - horaActual;

                    // Si las horas restantes son positivas, las sumamos a las horas hábiles totales
                    if (horasRestantes > 0) {
                        horasHabiles += horasRestantes;
                    }
                }

                // Avanzar al siguiente día
                inicio.setDate(inicio.getDate() + 1);
                inicio.setHours(0); // Reiniciar las horas a 0 para el siguiente día
            }

            return horasHabiles;
        } else {
            return 0; // Caso en el que las fechas no son válidas
        }
    });

    // Filtrar las horas que no pudieron calcularse (donde al menos un registro tenía fechas no válidas)
    const horasValidas = horasHabilesPorObjeto.filter(horas => horas > 0);

    if (horasValidas.length === 0) {
        console.log("No hay horas válidas"); // Caso en el que no hay horas válidas
        return 0;
    }

    // Sumar todas las horas hábiles calculadas
    const totalHoras = horasValidas.reduce((total, horas) => total + horas, 0);

    // Calcular el promedio de horas
    const promedioHoras = totalHoras / horasValidas.length;

    return promedioHoras;
}