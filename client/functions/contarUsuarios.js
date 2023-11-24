export function contarUsuarios(usuarios) {
   
const frecuenciaUsuarios = {};

// Cuenta la frecuencia de cada usuario
usuarios.forEach((usuario) => {
  frecuenciaUsuarios[usuario] = (frecuenciaUsuarios[usuario] || 0) + 1;
});

return frecuenciaUsuarios;

  }