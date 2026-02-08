import api from "@/api/http";
import { secureStorage } from "@/utils/secureStorage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";

export const useLogin = () => {
  const [message, setMessage] = useState<string | null>(null);
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (data: {
      username: string;
      password: string;
      system: string;
    }) => {
      const response = await api.post(`/redagsi-mobile/auth`, data);
      if (response.status === 200) {
        return response.data;
      }
      return undefined;
    },
    onSuccess: (res) => {
      console.log("Login Berhasil");
      secureStorage.setToken(res.token);
      secureStorage.setUserData({ name: res.name, user: res.user });
      router.replace("/(tabs)");
    },
    onError: (err) => {
      setMessage("Username atau password salah");
      console.log("Login Gagal", err);
    },
  });

  const login = (data: { username: string; password: string }) => {
    mutate({
      username: data.username,
      password: data.password,
      system: "redagsi",
    });
  };

  return {
    login,
    isPending,
    isError,
    message,
    isSuccess,
  };
};
