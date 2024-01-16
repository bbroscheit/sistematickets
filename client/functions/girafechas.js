export default function giraFechas(date) {
    
        let partes = date.split("-");
        let fechaGirada = partes[2] + "-" + partes[1] + "-" + partes[0];
        return fechaGirada
}