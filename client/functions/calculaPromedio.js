export function calculaPromedio(project) {
    let promedioTotal = 0
    let storielength = project.userstories.length

    if(project.userstories !== null){
        let cantidadCumplidas = project.userstories.reduce((contador, objeto) => {
          if (objeto.state === "cumplido") {
            return contador + 1;
          }
          return contador;
        }, 0);
        
        if(storielength > 0 ){
          promedioTotal = Math.round((cantidadCumplidas * 100 ) / storielength);
          return promedioTotal
        }else{
          return 0
        }
        
      }
  }
  