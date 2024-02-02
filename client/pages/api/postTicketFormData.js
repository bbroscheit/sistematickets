export async function postTicketFormData(input) {
   console.log("entre");

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

  // console.log("formData", formData);

  const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticket`, {
    // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticket`, {
    method: 'POST',
    body: formData,
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  });

   const data = await res.json();

  console.log("data", data)
  return data;
}