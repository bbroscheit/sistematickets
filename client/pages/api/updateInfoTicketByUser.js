export async function updateInfoTicketByUser(id, answer) {
  console.log("id", id)
  
  const formData = new FormData();

  // Agrega los campos del formulario al objeto FormData
  Object.keys(answer).forEach((key) => {
    if (key === 'files') {
      // Si es el campo del archivo, agrégalo al FormData
      answer[key].forEach((file) => {
        formData.append('files', file);  
      });
    } else {
      // Si es cualquier otro campo, agrégalo como una cadena
      formData.append(key, String(answer[key]));
    }
  });

  const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateInfoTicketByUser/${id}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateInfoTicketByUser/${id}`, {
        method: 'POST',
        body: formData,
    });

    const data = await res.json()
    
    return data
    
    
  }