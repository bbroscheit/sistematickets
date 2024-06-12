export async function updateSolutionTicket(id, solution) {
  const formData = new FormData();

  // Agrega los campos del formulario al objeto FormData
  Object.keys(solution).forEach((key) => {
    if (key === 'files') {
      // Si es el campo del archivo, agrégalo al FormData
      solution[key].forEach((file) => {
        formData.append('files', file);  
      });
    } else {
      // Si es cualquier otro campo, agrégalo como una cadena
      formData.append(key, String(solution[key]));
    }
  });
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateSolutionTicket/${id}`, {
      // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateSolutionTicket/${id}`, {
        method: 'POST',
        body: formData,     
    })
    const data = await res.json()
    
    return data
    
    
  }