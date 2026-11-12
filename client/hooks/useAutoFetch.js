import { useEffect } from "react";

// pollea una url cada intervalTime ms y pisa el estado con la respuesta -
// asi las listas de soportes se van actualizando solas sin que el usuario
// tenga que refrescar la pagina
export default function useAutoFetch(url, setState, intervalTime = 15000) {
  useEffect(() => {
    let isMounted = true;

    const fetchData = () => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) setState(data);
        })
        .catch((err) => console.error("Error al obtener datos de", url, err));
    };

    fetchData();
    const interval = setInterval(fetchData, intervalTime);
    

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [url, setState, intervalTime]);
}
