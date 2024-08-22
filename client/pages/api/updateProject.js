export async function updateProject(modifyProject) {
    const formData = new FormData();
  
    // Agrega los campos del formulario al objeto FormData
    Object.keys(modifyProject).forEach((key) => {
      if (key === 'files') {
        // Si es el campo del archivo, agrégalo al FormData
        modifyProject[key].forEach((file) => {
          formData.append('files', file);  
        });
      } else {
        // Si es cualquier otro campo, agrégalo como una cadena
        formData.append(key, String(modifyProject[key]));
      }
    });
  
   const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateproject`, {
     // const res = await fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/updateproject`, {
      method: 'PUT',
      body: formData,
    });
  
     const data = await res.json();
        
     return data
  }