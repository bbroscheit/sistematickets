// funcion muerta, no la usa nadie del lado del cliente (ver tambien
// api/src/routes/controllers/saveInDropbox.js, que tampoco se usa). tenia
// un access token de Dropbox hardcodeado en texto plano directo en el
// codigo - lo saco de aca. si en algun momento se necesita subir archivos
// a Dropbox de nuevo, el token tiene que venir de una variable de entorno,
// nunca escrito en el archivo
const saveInDropbox = async (file) => {
    return false
}

module.exports = saveInDropbox;
