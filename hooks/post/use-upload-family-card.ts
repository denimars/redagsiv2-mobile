import api from "@/api/http";
import { fileToBase64 } from "@/utils/fileToBase64";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

interface UploadFamilyCardPayload {
  file_data: string;
  id?: string;
}

interface UploadFamilyCardParams {
  fileUri: string;
  id?: string;
}

interface UseUploadFamilyCardOptions {
  successMessage?: string;
}

export default function useUploadFamilyCard({
  successMessage = "Dokumen keluarga berhasil diunggah",
}: UseUploadFamilyCardOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ fileUri, id }: UploadFamilyCardParams) => {
      const file_data = await fileToBase64(fileUri);

      const payload: UploadFamilyCardPayload = {
        file_data,
        ...(id ? { id } : {}),
      };

      const response = await api.post(
        "/redagsi-mobile/employee-document-family-card",
        payload,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-family-card"] });
      Alert.alert("Berhasil", successMessage);
    },
    onError: (error: Error) => {
      Alert.alert(
        "Gagal",
        error.message || "Terjadi kesalahan saat mengunggah",
      );
    },
  });
}
