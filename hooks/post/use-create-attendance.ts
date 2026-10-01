import api from "@/api/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export default function useCreateAttendance() {
  const queryClient = useQueryClient();
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
      Alert.alert("Sukses", "Absen berhasil dilakukan.");
      queryClient.invalidateQueries({ queryKey: ["attendance-schedule"] });
    },
    onError: (err: any) => {
      const status = err?.response?.status;
      const message: string = err?.response?.data?.message ?? "";
      if (status === 405) {
        if (message.includes("location out of range")) {
          Alert.alert(
            "Di Luar Area",
            "Anda berada di luar area absensi. Silakan masuk ke area terdekat lalu coba lagi."
          );
        } else if (message.includes("not in valid attendance window")) {
          Alert.alert(
            "Di Luar Jam Absensi",
            "Anda berada di luar jendela waktu absensi. Silakan coba lagi pada waktu yang telah ditentukan."
          );
        } else {
          Alert.alert("Gagal", "Absen gagal dilakukan.");
        }
      } else {
        Alert.alert("Gagal", "Absen gagal dilakukan.");
      }
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
