// hash simple de un string a un numero del 0 al 5, para asignarle siempre
// el mismo color (de una paleta de 6) a un mismo usuario/clave
export default function colorIndex(key) {
  const text = String(key);
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 6;
}
