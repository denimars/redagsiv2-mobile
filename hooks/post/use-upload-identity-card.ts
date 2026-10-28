import api from "@/api/http";
import { fileToBase64 } from "@/utils/fileToBase64";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

interface UploadIdentityCardPayload {
  file_data: string;
  id?: string;
}

interface UploadIdentityCardParams {
  fileUri: string;
  id?: string;
}

interface UseUploadIdentityCardOptions {
  successMessage?: string;
}

export default function useUploadIdentityCard({
  successMessage = "Dokumen KTP berhasil diunggah",
}: UseUploadIdentityCardOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ fileUri, id }: UploadIdentityCardParams) => {
      const file_data = await fileToBase64(fileUri);

      const payload: UploadIdentityCardPayload = {
        file_data,
        ...(id ? { id } : {}),
      };

      const response = await api.post(
        "/redagsi-mobile/employee-document-identity-card",
        payload,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee-identity-card"] });
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
