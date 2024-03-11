export function contarSoportesPorMesYPuntoDeVentas(soportes) {
    // Objeto para almacenar los conteos por punto de venta y mes
    try {
        if(soportes !== null && soportes.length > 0){
            const conteos = {};

    // Iterar sobre cada soporte
    soportes.forEach(soporte => {
        // Obtener el punto de venta del soporte
        const puntoDeVenta = soporte.user.salepoint.salepoint;

        // Obtener la fecha de creación del soporte
        const fecha = new Date(soporte.createdAt);
        const mes = fecha.getMonth(); // Obtener el mes (de 0 a 11)

        // Construir la clave para el objeto de conteos
        const clave = `${puntoDeVenta}_${mes}`;

        // Incrementar el contador correspondiente
        if (!conteos[clave]) {
            conteos[clave] = 1; // Si la clave no existe, inicializar el contador en 1
        } else {
            conteos[clave]++; // Si la clave ya existe, incrementar el contador
        }
    });

    // Objeto para almacenar los resultados finales
    const resultados = [];

    // Obtener un array con los nombres de los puntos de venta únicos
    const puntosDeVentaUnicos = [...new Set(soportes.map(soporte => soporte.user.salepoint.salepoint))];

    // Colores de fondo para los gráficos
    const backgroundColors = ['rgba(0, 220 , 195 , 0.5)', 'rgba(0, 220 , 100 , 0.5)', 'rgba(0, 110 , 195 , 0.5)'];

    // Iterar sobre cada punto de venta único
    puntosDeVentaUnicos.forEach((puntoDeVenta, index) => {
        // Array para almacenar las cantidades de soportes por mes
        const cantSoportes = [];

        // Iterar sobre los meses (de 0 a 11)
        for (let mes = 0; mes < 12; mes++) {
            // Construir la clave para buscar en el objeto de conteos
            const clave = `${puntoDeVenta}_${mes}`;
            // Obtener la cantidad de soportes para este punto de venta y mes
            const cantidad = conteos[clave] || 0;
            // Agregar la cantidad al array
            cantSoportes.push(cantidad);
        }

        // Agregar un objeto con la información del punto de venta al array de resultados
        resultados.push({
            label: puntoDeVenta,
            data: cantSoportes,
            backgroundColor: backgroundColors[index % backgroundColors.length] // Ciclar por los colores de fondo
        });
    });

    return resultados;
    }
         

    } catch (error) {
        return 0
    }
    
}