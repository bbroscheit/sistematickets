// da vuelta una fecha "DD-MM-YYYY" a "YYYY-MM-DD" (o al reves, es simetrica)
export default function giraFechas(date) {
    
        let partes = date.split("-");
        let fechaGirada = partes[2] + "-" + partes[1] + "-" + partes[0];
        return fechaGirada
}