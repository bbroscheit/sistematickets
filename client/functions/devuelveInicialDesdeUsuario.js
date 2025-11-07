export function devuelveInicialDesdeUsuario(state) {
    const inicialState = state.charAt(0);
    const secondState = state.charAt(1);

    const finalState = inicialState + secondState;
    
  return finalState.toUpperCase();
  }