import api from "@/api/http";
import { useMutation } from "@tanstack/react-query";

export default function useCreateAttendance() {
  const {
    mutate: saveAttendance,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: { lat: number; long: number }) => {
      const response = await api.post(`/redagsi-mobile/attendance`, data);
      if (response.status === 200) {
        return response.data;
      }
      return undefined;
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSave = (data: { lat: number; long: number }) => {
    saveAttendance(data);
  };
  return {
    saveAttendance,
    isError,
    isPending,
    isSuccess,
    handleSave,
  };
}
