export async function fetchDesarrollos ()  {
  try {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/desarrollo`);
    const data = await res.json();
    
    return data;

  } catch (error) {
    console.error("Error al traer los desarrollos:", error);
  }
};