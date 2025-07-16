import { useEffect } from "react";

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
