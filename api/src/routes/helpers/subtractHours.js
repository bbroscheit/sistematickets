// le resta horas a un horario "hh:mm", dando la vuelta al dia anterior si
// hace falta (ej. 02:00 menos 3 horas = 23:00)
const subtractHours =(time, hours) => {
    
    const [hour, minute] = time.split(':').map(Number);
    let newHour = hour - hours;
    if (newHour < 0) {
        newHour = 24 + newHour; // Manejar el cambio de día si se resta más allá de la medianoche
    }
    return `${newHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

module.exports = subtractHours