export async function postPlatform(inputPlatform) {
  console.log("entre al post", inputPlatform)
  try {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/postPlatform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',   
      },
      body: JSON.stringify(inputPlatform)
    });

    // Intentar convertir la respuesta a JSON
    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    throw error; // O maneja el error de otra manera según lo necesites
  }
}