import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";
import { useCallback, useState } from "react";
import { Alert, Linking, Platform } from "react-native";

interface UploadedFile {
  uri: string;
  name: string;
}

export default function useDocumentUpload() {
  const docDir = `${FileSystem.documentDirectory}ptk_documents/`;
  const [uploads, setUploads] = useState<Record<string, UploadedFile | null>>({});

  const pickAndSave = useCallback(
    async (key: string, filename: string) => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: true,
        });
        if (result.canceled || !result.assets?.length) return;

        const asset = result.assets[0];
        await FileSystem.makeDirectoryAsync(docDir, { intermediates: true });
        const filePath = `${docDir}${filename}`;
        await FileSystem.copyAsync({ from: asset.uri, to: filePath });

        setUploads((prev) => ({
          ...prev,
          [key]: { uri: filePath, name: asset.name || "dokumen.pdf" },
        }));
      } catch (e) {
        Alert.alert(
          "Gagal",
          e instanceof Error ? e.message : "Terjadi kesalahan saat mengunggah"
        );
      }
    },
    [docDir]
  );

  const openFile = useCallback(
    async (key: string) => {
      const savedPath = uploads[key]?.uri;
      if (!savedPath) return;
      try {
        if (Platform.OS === "android") {
          const contentUri = await FileSystem.getContentUriAsync(savedPath);
          await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data: contentUri,
            type: "application/pdf",
            flags: 1 | 0x10000000,
          });
        } else {
          await Linking.openURL(savedPath);
        }
      } catch {
        Alert.alert("Error", "Tidak dapat membuka file.");
      }
    },
    [uploads]
  );

  const confirmDelete = useCallback(
    (key: string, filename: string) => {
      return new Promise<boolean>((resolve) => {
        Alert.alert(
          "Hapus Dokumen",
          "Apakah Anda yakin ingin menghapus dokumen ini?",
          [
            { text: "Batal", style: "cancel", onPress: () => resolve(false) },
            {
              text: "Ya, Hapus",
              style: "destructive",
              onPress: async () => {
                try {
                  await FileSystem.deleteAsync(`${docDir}${filename}`, {
                    idempotent: true,
                  });
                  setUploads((prev) => ({ ...prev, [key]: null }));
                  resolve(true);
                } catch {
                  resolve(false);
                }
              },
            },
          ]
        );
      });
    },
    [docDir]
  );

  const checkSavedFile = useCallback(
    async (key: string, filename: string) => {
      const path = `${docDir}${filename}`;
      try {
        const info = await FileSystem.getInfoAsync(path);
        if (info.exists) {
          setUploads((prev) => ({
            ...prev,
            [key]: { uri: path, name: "Dokumen tersimpan" },
          }));
        }
      } catch {}
    },
    [docDir]
  );

  return { uploads, pickAndSave, openFile, confirmDelete, checkSavedFile };
}
