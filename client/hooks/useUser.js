import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// trae el usuario logueado desde localStorage. si no hay nada guardado (o
// esta corrupto) manda a la pantalla de login
function useUser() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userLogin = localStorage.getItem("user");
    if (userLogin) {
      try {
        setUser(JSON.parse(userLogin));
        console.log("User data set from localStorage:", JSON.parse(userLogin));
      } catch (error) {
        setUser(null);
        router.push("/");
      }
    } else {
      router.replace("/");
    }
  }, [router]);

  return [user, setUser];
}

export default useUser;