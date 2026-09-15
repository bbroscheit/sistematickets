export function devuelveIniciales(firstname, lastname) {
    const inicialNombre = firstname ? firstname.charAt(0) : "";
    const inicialApellido = lastname ? lastname.charAt(0) : "";

    const iniciales = `${inicialNombre}${inicialApellido}`;

  return iniciales.toUpperCase();
  }
  