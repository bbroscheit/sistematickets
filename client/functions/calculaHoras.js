export function calculaHoras(array) {
    const ahora = new Date(); // Fecha y hora actuales
  
    // Función para calcular la diferencia en horas entre dos fechas
    const diferenciaEnHoras = (fecha1, fecha2) => {
      const tiempo1 = fecha1.getTime();
      const tiempo2 = fecha2.getTime();
      const diferenciaEnMilisegundos = Math.abs(tiempo2 - tiempo1);
      return diferenciaEnMilisegundos / (1000 * 60 * 60); // Convertir a horas
    };
  
    // Contadores para cada rango
    let contador1 = 0;
    let contador2 = 0;
    let contador3 = 0;
  
    array.forEach(item => {
      const horas = diferenciaEnHoras(new Date(item.createdAt), ahora);
      if (horas >= 24 && horas < 48) {
        contador1 += 1;
      } else if (horas >= 48 && horas < 72) {
        contador2 += 1;
      } else if (horas >= 72) {
        contador3 += 1;
      }
    });
  
    // Devolver un objeto con las cantidades
    return {
      hora1: contador1,
      hora2: contador2,
      hora3: contador3,
    };
  }
  