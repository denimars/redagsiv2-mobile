import api from "@/api/http";
import { secureStorage } from "@/utils/secureStorage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export default function useLogout() {
  // success: (res: unknown) => void,
  // failed: (err: unknown) => void,
  const {
    mutate: Logout,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async () => {
      const respone = await api.get(`/redagsi-mobile/auth/logout`);
      if (respone.status === 200) {
        return respone.data;
      }
      return undefined;
    },
    onSuccess: (res) => {
      secureStorage.removeToken();
      secureStorage.removeUserData();
      router.replace("/login");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { Logout, isError, isPending, isSuccess };
}
