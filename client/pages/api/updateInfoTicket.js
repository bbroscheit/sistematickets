export async function updateInfoTicket(id, info) {
  const formData = new FormData();

  // Agrega los campos del formulario al objeto FormData
  Object.keys(info).forEach((key) => {
    if (key === 'files') {
      // Si es el campo del archivo, agrégalo al FormData
      info[key].forEach((file) => {
        formData.append('files', file);  
      });
    } else {
      // Si es cualquier otro campo, agrégalo como una cadena
      formData.append(key, String(info[key]));
    }
  });

 const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateInfoTicket/${id}`, {
   // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateInfoTicket/${id}`, {
    method: 'POST',
    body: formData,
  });

   const data = await res.json();
      
   return data
}