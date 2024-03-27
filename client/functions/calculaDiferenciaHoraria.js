export function calcularDiferenciaHoraria(horaInicio, horaCierre) {
    // se convierten las horas de cadena a minutos desde la medianoche
    var horaInicioMinutos = parseInt(horaInicio.split(':')[0]) * 60 + parseInt(horaInicio.split(':')[1]);
    var horaCierreMinutos = parseInt(horaCierre.split(':')[0]) * 60 + parseInt(horaCierre.split(':')[1]);
    
    // calculamos la diferencia en minutos
    var diferenciaMinutos = horaCierreMinutos - horaInicioMinutos;
    
    // convertimos la diferencia a formato de hora (HH:MM)
    var horas = Math.floor(diferenciaMinutos / 60);
    var minutos = diferenciaMinutos % 60;
    
    // devuelve la diferencia en formato de cadena de texto
    return horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0');
  
   
    
  }
  