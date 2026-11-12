// primeras dos letras de un string (se usa para la inicial del estado del
// soporte en el avatar chico de las cards)
export function devuelveInicialDesdeUsuario(state) {
    const inicialState = state.charAt(0);
    const secondState = state.charAt(1);

    const finalState = inicialState + secondState;
    
  return finalState.toUpperCase();
  }