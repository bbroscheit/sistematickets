import { useEffect } from "react";

export default function useAutoFetchDesarrollos(url, setDesarrollos, intervalTime = 15000) {
  useEffect(() => {
    let isMounted = true;
    let interval;

    const fetchAndFilter = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        //if (!storedUser) return;

        const user = JSON.parse(storedUser);
        //console.log("User from localStorage:", user);
        // if (!user?.username) return;

        const res = await fetch(url);
        const data = await res.json();

        const filtrados = data.filter((des) =>
          des.users?.some((u) => u.username === user.name)
        );

        if (isMounted) setDesarrollos(filtrados);
      } catch (error) {
        console.error("Error en fetchAndFilter:", error);
      }
    };

    fetchAndFilter();
    interval = setInterval(fetchAndFilter, intervalTime);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [url, setDesarrollos, intervalTime]);
}

