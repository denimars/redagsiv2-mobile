import api from "@/api/http";
import { useMutation } from "@tanstack/react-query";

type UpdatePasswordData = {
  old_password: string;
  new_password: string;
};

export default function useUpdatePassword(
  onSuccess: () => void,
  onError: () => void,
) {
  const {
    mutate: updatePassword,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: UpdatePasswordData) => {
      const response = await api.put(`/redagsi-mobile/user/profile`, data);
      if (response.status === 200) {
        return response.data;
      }
      return undefined;
    },
    onSuccess: (res) => {
      console.log("Change password success:", res);
      onSuccess();
    },
    onError: (err) => {
      console.error("Change password error:", err);
      onError();
    },
  });

  return {
    updatePassword,
    isError,
    isPending,
    isSuccess,
  };
}