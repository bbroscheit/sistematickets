import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function useUser() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userLogin = localStorage.getItem("user");
    if (userLogin) {
      try {
        setUser(JSON.parse(userLogin));
      } catch (error) {
        setUser(null);
        router.push("/");
      }
    } else {
    }
  }, [router]);

  return [user, setUser];
}

export default useUser;
