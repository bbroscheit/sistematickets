// da vuelta el orden de una fecha con guiones, de dd-mm-aaaa a aaaa-mm-dd
// (o al reves, es simetrica)
const giraFechas = (date) => {
    
        let partes = date.split("-");
        let fechaGirada = partes[2] + "-" + partes[1] + "-" + partes[0];
        return fechaGirada
}

module.exports = giraFechas;