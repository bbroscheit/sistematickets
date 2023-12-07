export default function getFileName(filePath) {
    const pathArray = filePath.split('\\');
    const fileNameWithExtension = pathArray[pathArray.length - 1];
    return fileNameWithExtension;
}