import api from "@/api/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

interface UseDeleteDocumentOptions {
  endpoint: string;
  queryKey: string[];
  successMessage?: string;
}

export default function useDeleteDocument({
  endpoint,
  queryKey,
  successMessage = "Dokumen berhasil dihapus",
}: UseDeleteDocumentOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      const response = await api.delete(`${endpoint}/${documentId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      Alert.alert("Berhasil", successMessage);
    },
    onError: (error: Error) => {
      Alert.alert(
        "Gagal",
        error.message || "Terjadi kesalahan saat menghapus",
      );
    },
  });
}
