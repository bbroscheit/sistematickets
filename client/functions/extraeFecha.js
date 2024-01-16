export  function extraeFecha(date) {
    
    console.log(date)
    const fecha = new Date(date);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; 
    const año = fecha.getFullYear();

    const formatoDeseado = `${dia < 10 ? '0' : ''}${dia}-${mes < 10 ? '0' : ''}${mes}-${año}`;

    return formatoDeseado
}