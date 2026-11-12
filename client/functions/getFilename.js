// saca el nombre de archivo de un path tipo windows (con backslash) para
// mostrarlo como link de descarga
export default function getFileName(filePath) {
    const pathArray = filePath.split('\\');
    const fileNameWithExtension = pathArray[pathArray.length - 1];
    return fileNameWithExtension;
}