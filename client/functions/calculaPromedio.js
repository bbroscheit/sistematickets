export function calculaPromedio(task) {
    let promedioTotal = 0
    
    if(task !== null){
      let cantidadCumplidas = task.reduce((contador, objeto) => {
        if (objeto.state === "cumplido") {
          return contador + 1;
        }
        return contador;
      }, 0);
      if(task.length > 0 ){
        promedioTotal = Math.round((cantidadCumplidas * 100 ) / task.length);
        return promedioTotal;
      }else{
        return promedioTotal;
      }
      
    }
  }
  