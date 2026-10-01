import { secureStorage } from "@/utils/secureStorage";
import { useEffect, useState } from "react";

export const useGetUserStorage = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const data = await secureStorage.getUserData();
      if (isMounted) {
        setUserData(data);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { userData };
};
