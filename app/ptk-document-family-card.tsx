import { useTheme } from "@/context/ThemeContext";
import useDeleteDocument from "@/hooks/delete/use-delete-document";
import useGetEmployeeFamilyCard from "@/hooks/get/use-get-employee-family-card";
import useUploadFamilyCard from "@/hooks/post/use-upload-family-card";
import { documentUploadSchema } from "@/schema/document-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ASSET_BASE_URL = "http://192.168.1.13:8080/asset";

export default function PtkDocumentFamilyCardScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();
  const { data, isLoading } = useGetEmployeeFamilyCard();

  const { mutate: uploadDocument, isPending } = useUploadFamilyCard();

  const { mutate: deleteDocument } = useDeleteDocument({
    endpoint: "/redagsi-mobile/employee-document-family-card",
    queryKey: ["employee-family-card"],
    successMessage: "Dokumen keluarga berhasil dihapus",
  });

  const {
    setValue,
    trigger,
    formState: { errors },
  } = useForm<{ fileUri: string; fileName?: string }>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: { fileUri: "" },
    mode: "onSubmit",
  });

  const [uploadError, setUploadError] = useState<string | null>(null);

  const current = Array.isArray(data) && data.length > 0 ? data[0] : null;
  const hasUploaded = current !== null;

  const handlePick = useCallback(async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: false,
    });
    if (result.canceled || !result.assets?.length) return;

    const asset = result.assets[0];
    const fileUri = asset.uri;
    setUploadError(null);
    setValue("fileUri", fileUri, { shouldValidate: true });
    setValue("fileName", asset.name || "dokumen.pdf");

    const valid = await trigger("fileUri");
    if (!valid) {
      setUploadError(errors.fileUri?.message || "File tidak valid");
      return;
    }

    uploadDocument(
      { fileUri, id: current?.id },
      {
        onSettled: () => setUploadError(null),
        onError: () => undefined,
      },
    );
  }, [setValue, trigger, uploadDocument, current?.id, errors.fileUri?.message]);

  const handleView = useCallback(() => {
    if (!current) return;
    router.push(
      `/ptk-document-viewer?url=${encodeURIComponent(`${ASSET_BASE_URL}/${current.url}`)}`,
    );
  }, [router, current]);

  const confirmDelete = () => {
    if (!current) return;
    Alert.alert("Hapus Dokumen", "Apakah Anda yakin ingin menghapus?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Ya, Hapus",
        style: "destructive",
        onPress: () => deleteDocument(current.id),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.card,
              borderBottomColor: colors.border || "#f0f0f0",
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.background }]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              { color: colors.text, fontFamily: fonts.heading },
            ]}
          >
            Kartu Keluarga
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {isLoading ? (
          <View style={styles.emptyContainer}>
            <Text style={[{ color: colors.secondary, fontFamily: fonts.body }]}>
              Memuat data...
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          >
            <View style={styles.headerSection}>
              <Text
                style={[
                  styles.headerTitle2,
                  { color: colors.text, fontFamily: fonts.heading },
                ]}
              >
                Dokumen Kartu Keluarga
              </Text>
              <Text
                style={[
                  styles.headerSubtitle,
                  { color: colors.secondary || "#888", fontFamily: fonts.body },
                ]}
              >
                Unggah dokumen kartu keluarga Anda
              </Text>
            </View>

            <View
              style={[
                styles.menuContainer,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border || "#f0f0f0",
                },
              ]}
            >
              <View style={styles.itemHeader}>
                <View style={[styles.itemIcon, { backgroundColor: "#E0F2FE" }]}>
                  <Ionicons name="people-outline" size={20} color="#0284C7" />
                </View>
                <View style={styles.itemInfo}>
                  <Text
                    style={[
                      styles.itemTitle,
                      { color: colors.text, fontFamily: fonts.body },
                    ]}
                  >
                    Kartu Keluarga
                  </Text>
                  <Text
                    style={[
                      styles.itemSubtitle,
                      { color: colors.secondary || "#888", fontFamily: fonts.body },
                    ]}
                  >
                    {hasUploaded
                      ? "Dokumen sudah diunggah"
                      : "Belum ada dokumen"}
                  </Text>
                </View>
                {hasUploaded && (
                  <Ionicons name="checkmark-circle" size={22} color="#16A34A" />
                )}
              </View>

              {uploadError && (
                <Text
                  style={[
                    styles.errorText,
                    { color: "#DC2626", fontFamily: fonts.body },
                  ]}
                >
                  {uploadError}
                </Text>
              )}

              {hasUploaded ? (
                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.actionButton} onPress={handleView}>
                    <Ionicons name="eye-outline" size={18} color="#0284C7" />
                    <Text
                      style={[
                        styles.actionText,
                        { color: "#0284C7", fontFamily: fonts.body },
                      ]}
                    >
                      Lihat
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handlePick}
                    disabled={isPending}
                  >
                    <Ionicons name="refresh-outline" size={18} color="#D97706" />
                    <Text
                      style={[
                        styles.actionText,
                        { color: "#D97706", fontFamily: fonts.body },
                      ]}
                    >
                      Ganti
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={confirmDelete}
                  >
                    <Ionicons name="trash-outline" size={18} color="#DC2626" />
                    <Text
                      style={[
                        styles.actionText,
                        { color: "#DC2626", fontFamily: fonts.body },
                      ]}
                    >
                      Hapus
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.uploadButton, { borderColor: "#0284C7" }]}
                  onPress={handlePick}
                  disabled={isPending}
                >
                  <Ionicons
                    name={isPending ? "hourglass-outline" : "cloud-upload-outline"}
                    size={18}
                    color={isPending ? "#888" : "#0284C7"}
                  />
                  <Text
                    style={[
                      styles.uploadText,
                      {
                        color: isPending ? "#888" : "#0284C7",
                        fontFamily: fonts.body,
                      },
                    ]}
                  >
                    {isPending ? "Mengunggah..." : "Unggah Dokumen Kartu Keluarga"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: { padding: 20, paddingBottom: 40 },
  headerSection: { marginTop: 8, marginBottom: 24 },
  headerTitle2: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  headerSubtitle: { fontSize: 14, opacity: 0.8 },
  menuContainer: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  itemHeader: { flexDirection: "row", alignItems: "center" },
  itemIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 2 },
  itemSubtitle: { fontSize: 12, opacity: 0.7 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionText: { fontSize: 13, fontWeight: "600" },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  uploadText: { fontSize: 13, fontWeight: "600" },
  errorText: { fontSize: 12, marginTop: 4, textAlign: "right" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
});
