export async function postTicketFormDataAndDesarrollo(input, desarrolloInput) {
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

  // 👉 Agregamos el nuevo campo desarrolloInput al FormData
  if (desarrolloInput) {
    formData.append('desarrolloInput', JSON.stringify(desarrolloInput.option));
  }

  const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketanddesarrollo`, {
    // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticketanddesarrollo`, {
    method: 'POST',
    body: formData,
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  });

   const data = await res.json();

  
  return data;
}