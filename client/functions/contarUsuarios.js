// cuenta cuantas veces aparece cada usuario en el array (se usa para saber
// quien pregunto mas veces sobre una faq)
export function contarUsuarios(usuarios) {
  const frecuenciaUsuarios = {};

  // Cuenta la frecuencia de cada usuario
  usuarios.forEach((usuario) => {
    frecuenciaUsuarios[usuario] = (frecuenciaUsuarios[usuario] || 0) + 1;
  });

  return frecuenciaUsuarios;
}
