import api from "@/api/http";
import { fileToBase64 } from "@/utils/fileToBase64";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

interface UploadDocumentPayload {
  reference_id: string;
  file_data: string;
  id?: string;
}

interface UploadDocumentParams {
  referenceId: string;
  fileUri: string;
  id?: string;
}

interface UseUploadDocumentOptions {
  endpoint: string;
  queryKey: string[];
  successMessage?: string;
}

export default function useUploadDocument({
  endpoint,
  queryKey,
  successMessage = "Dokumen berhasil diunggah",
}: UseUploadDocumentOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      referenceId,
      fileUri,
      id,
    }: UploadDocumentParams) => {
      const file_data = await fileToBase64(fileUri);

      const payload: UploadDocumentPayload = {
        reference_id: referenceId,
        file_data,
        ...(id ? { id } : {}),
      };

      const response = await api.post(endpoint, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
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
