export async function postProject(input) {
  const formData = new FormData();

 // Agrega los campos del formulario al objeto FormData
 Object.keys(input).forEach((key) => {
   if (key === 'files') {
     // Si es el campo del archivo, agrégalo al FormData
     input[key].forEach((file) => {
       formData.append('files', file);  // Asegúrate de que el campo de archivos se llame 'files' en el servidor
     });
   } else {
     // Si es cualquier otro campo, agrégalo como una cadena
     formData.append(key, String(input[key]));
   }
 });

 const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject`, {
   // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject`, {
   method: 'POST',
   body: formData,
 
 });

  const data = await res.json();

 
 return data;
}