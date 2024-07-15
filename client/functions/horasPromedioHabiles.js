// export function horasPromedioHabiles(data) {
    
//     const horasLaborablesPorDia = 8; // Asumiendo jornada laboral de 8 horas
//     const horaInicioLaboral = 11; // Hora de inicio laboral (9 AM)
//     const horaFinLaboral = 20; // Hora de fin laboral (5 PM)

//     let terminados = data.filter(e => e.state === "Terminado");
//     console.log("data promedio" , terminados)
//     // Calcular las horas hábiles transcurridas para cada objeto en el array
//     const horasHabilesPorObjeto = terminados.map(registro => {
//         const tiempoInicio = new Date(registro.createdAt);
//         const tiempoFin = new Date(registro.finishdate);

//         if (!isNaN(tiempoInicio.getTime()) && !isNaN(tiempoFin.getTime())) {
//             let horasHabiles = 0;
//             let current = new Date(tiempoInicio);

//             while (current < tiempoFin) {
//                 const diaActual = current.getDay();
//                 const esLaborable = diaActual >= 1 && diaActual <= 5; // De lunes a viernes

//                 if (esLaborable) {
//                     // Calcular las horas trabajadas en el primer y último día
//                     let inicioHoraDia = current.getHours();
//                     let finHoraDia = horaFinLaboral;

//                     if (current.toDateString() === tiempoInicio.toDateString()) {
//                         // Si es el primer día, ajustar la hora de inicio
//                         inicioHoraDia = Math.max(horaInicioLaboral, tiempoInicio.getHours());
//                     } else {
//                         inicioHoraDia = horaInicioLaboral;
//                     }

//                     if (current.toDateString() === tiempoFin.toDateString()) {
//                         // Si es el último día, ajustar la hora de fin
//                         finHoraDia = Math.min(horaFinLaboral, tiempoFin.getHours());
//                     }

//                     if (inicioHoraDia < finHoraDia) {
//                         horasHabiles += finHoraDia - inicioHoraDia;
//                     }
//                 }

//                 // Avanzar al siguiente día
//                 current.setDate(current.getDate() + 1);
//                 current.setHours(horaInicioLaboral); // Reiniciar las horas a la hora de inicio laboral
//             }
//             console.log("data promedio" , horasHabiles)
//             return horasHabiles;
//         } else {
//             return 0; // Caso en el que las fechas no son válidas
//         }
//     });

//     // Filtrar las horas que no pudieron calcularse (donde al menos un registro tenía fechas no válidas)
//     const horasValidas = horasHabilesPorObjeto.filter(horas => horas > 0);

//     if (horasValidas.length === 0) {
//         console.log("No hay horas válidas"); // Caso en el que no hay horas válidas
//         return 0;
//     }

//     // Sumar todas las horas hábiles calculadas
//     const totalHoras = horasValidas.reduce((total, horas) => total + horas, 0);

//     // Calcular el promedio de horas
//     const promedioHoras = totalHoras / horasValidas.length;

//     return promedioHoras;
// }

export function horasPromedioHabiles(data) {
    const minutosLaborablesPorDia = 8 * 60; // Jornada laboral de 8 horas en minutos
    const horaInicioLaboral = 11; // Hora de inicio laboral (11 AM)
    const horaFinLaboral = 20; // Hora de fin laboral (8 PM)

    let terminados = data.filter(e => e.state === "Terminado");
    console.log("data promedio", terminados);

    const minutosHabilesPorObjeto = terminados.map(registro => {
        const tiempoInicio = new Date(registro.createdAt);
        const tiempoFin = new Date(registro.finishdate);

        if (!isNaN(tiempoInicio.getTime()) && !isNaN(tiempoFin.getTime())) {
            let minutosHabiles = 0;
            let current = new Date(tiempoInicio);

            while (current < tiempoFin) {
                const diaActual = current.getDay();
                const esLaborable = diaActual >= 1 && diaActual <= 5; // De lunes a viernes

                if (esLaborable) {
                    let inicioMinutoDia = current.getHours() * 60 + current.getMinutes();
                    let finMinutoDia = horaFinLaboral * 60; // Hora de fin en minutos

                    if (current.toDateString() === tiempoInicio.toDateString()) {
                        // Si es el primer día, ajustar la hora de inicio
                        inicioMinutoDia = Math.max(horaInicioLaboral * 60, inicioMinutoDia);
                    } else {
                        inicioMinutoDia = horaInicioLaboral * 60;
                    }

                    if (current.toDateString() === tiempoFin.toDateString()) {
                        // Si es el último día, ajustar la hora de fin
                        finMinutoDia = Math.min(horaFinLaboral * 60, tiempoFin.getHours() * 60 + tiempoFin.getMinutes());
                    }

                    if (inicioMinutoDia < finMinutoDia) {
                        minutosHabiles += finMinutoDia - inicioMinutoDia;
                    }
                }

                // Avanzar al siguiente día
                current.setDate(current.getDate() + 1);
                current.setHours(horaInicioLaboral, 0); // Reiniciar las horas a la hora de inicio laboral
            }
            console.log("minutos hábiles", minutosHabiles);
            return minutosHabiles;
        } else {
            return 0; // Caso en el que las fechas no son válidas
        }
    });

    // Filtrar los minutos que no pudieron calcularse (donde al menos un registro tenía fechas no válidas)
    const minutosValidos = minutosHabilesPorObjeto.filter(minutos => minutos > 0);

    if (minutosValidos.length === 0) {
        console.log("No hay minutos válidos"); // Caso en el que no hay minutos válidos
        return 0;
    }

    // Sumar todos los minutos hábiles calculados
    const totalMinutos = minutosValidos.reduce((total, minutos) => total + minutos, 0);

    // Calcular el promedio de horas
    const promedioHoras = (totalMinutos / minutosValidos.length) / 60;

    return promedioHoras;
}