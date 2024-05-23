export function incialParaDesarrollador(worker) {
    const inicialNombre = worker.charAt(0);
    const inicialApellido = worker.charAt(1);
    let iniciales = ""

    worker === "sin asignar" ? iniciales = "s" : iniciales = `${inicialNombre}${inicialApellido}`;

  return iniciales.toUpperCase();
  }