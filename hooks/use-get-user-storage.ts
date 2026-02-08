import { secureStorage } from "@/utils/secureStorage";
import { useEffect, useState } from "react";

export const useGetUserStorage = () => {
  const [userData, setUserData] = useState<any>(null);
  const getUserData = async () => {
    const userData = await secureStorage.getUserData();
    setUserData(userData);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return { userData };
};
