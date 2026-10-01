import { useTheme } from "@/context/ThemeContext";
import useDeleteDocument from "@/hooks/delete/use-delete-document";
import useGetEmployeeTrainingHistory, {
  EmployeeTrainingHistory,
} from "@/hooks/get/use-get-employee-training-history";
import useDocumentUploadForm from "@/hooks/post/use-document-upload-form";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ASSET_BASE_URL = "http://192.168.1.13:8080/asset";

export default function PtkDocumentTrainingScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();
  const { data: trainings, isLoading } = useGetEmployeeTrainingHistory();

  const { handleSubmit, submitWithContext, setValue } = useDocumentUploadForm({
    endpoint: "/redagsi-mobile/employee-document-training-history",
    queryKey: ["employee-training-history"],
    successMessage: "Dokumen pelatihan berhasil diunggah",
  });

  const { mutate: deleteDocument } = useDeleteDocument({
    endpoint: "/redagsi-mobile/employee-document-training-history",
    queryKey: ["employee-training-history"],
    successMessage: "Dokumen pelatihan berhasil dihapus",
  });

  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [itemErrors, setItemErrors] = useState<Record<string, string>>({});

  const handlePick = useCallback(
    async (item: EmployeeTrainingHistory) => {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
      });
      if (result.canceled || !result.assets?.length) return;

      const asset = result.assets[0];
      const fileUri = asset.uri;

      setUploadingId(item.id);
      setItemErrors((prev) => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });

      setValue("fileUri", fileUri);
      setValue("fileName", asset.name || "dokumen.pdf");

      handleSubmit(
        (data) => {
          submitWithContext(
            data,
            item.id,
            item.employee_document_training_history?.id,
            () => setUploadingId(null),
          );
        },
        (errors) => {
          setItemErrors((prev) => ({
            ...prev,
            [item.id]: errors.fileUri?.message || "",
          }));
          setUploadingId(null);
        },
      )();
    },
    [setValue, handleSubmit, submitWithContext],
  );

  const handleView = useCallback(
    (url: string) => {
      router.push(`/ptk-document-viewer?url=${encodeURIComponent(`${ASSET_BASE_URL}/${url}`)}`);
    },
    [router],
  );

  const confirmDelete = (id: string) => {
    Alert.alert("Hapus Dokumen", "Apakah Anda yakin ingin menghapus?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Ya, Hapus",
        style: "destructive",
        onPress: () => deleteDocument(id),
      },
    ]);
  };

  const isItemPending = (id: string) => uploadingId === id;

  const renderItem = ({
    item,
    index,
  }: {
    item: EmployeeTrainingHistory;
    index: number;
  }) => {
    const doc = item.employee_document_training_history;
    const hasUploaded = doc !== null && doc !== undefined;
    const pending = isItemPending(item.id);

    return (
      <View
        style={[
          styles.itemCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border || "#f0f0f0",
          },
        ]}
      >
        <View style={styles.itemHeader}>
          <View style={[styles.itemIcon, { backgroundColor: "#FFFBEB" }]}>
            <Ionicons name="medal-outline" size={20} color="#D97706" />
          </View>
          <View style={styles.itemInfo}>
            <Text
              style={[
                styles.itemTitle,
                { color: colors.text, fontFamily: fonts.body },
              ]}
            >
              {item.name || `Pelatihan ${index + 1}`}
            </Text>
            <Text
              style={[
                styles.itemSubtitle,
                { color: colors.secondary || "#888", fontFamily: fonts.body },
              ]}
              numberOfLines={2}
            >
              {item.organizer}
              {item.field ? ` - ${item.field}` : ""}
            </Text>
            {item.year > 0 && (
              <Text
                style={[
                  styles.itemYear,
                  { color: colors.secondary || "#888", fontFamily: fonts.body },
                ]}
              >
                {item.year}
              </Text>
            )}
          </View>
          {hasUploaded && (
            <Ionicons name="checkmark-circle" size={22} color="#16A34A" />
          )}
        </View>

        {itemErrors[item.id] && (
          <Text
            style={[
              styles.errorText,
              { color: "#DC2626", fontFamily: fonts.body },
            ]}
          >
            {itemErrors[item.id]}
          </Text>
        )}

        {hasUploaded ? (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleView(doc!.url)}
            >
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
              onPress={() => handlePick(item)}
              disabled={pending}
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
              onPress={() => confirmDelete(doc!.id)}
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
            style={[styles.uploadButton, { borderColor: "#D97706" }]}
            onPress={() => handlePick(item)}
            disabled={pending}
          >
            <Ionicons
              name={pending ? "hourglass-outline" : "cloud-upload-outline"}
              size={18}
              color={pending ? "#888" : "#D97706"}
            />
            <Text
              style={[
                styles.uploadText,
                {
                  color: pending ? "#888" : "#D97706",
                  fontFamily: fonts.body,
                },
              ]}
            >
              {pending ? "Mengunggah..." : "Unggah Dokumen Pelatihan"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
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
            Sertifikat Pelatihan
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {isLoading ? (
          <View style={styles.emptyContainer}>
            <Text style={[{ color: colors.secondary, fontFamily: fonts.body }]}>
              Memuat data...
            </Text>
          </View>
        ) : trainings?.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="document-outline"
              size={48}
              color={colors.secondary || "#888"}
            />
            <Text
              style={[
                styles.emptyText,
                { color: colors.secondary || "#888", fontFamily: fonts.body },
              ]}
            >
              Belum ada data pelatihan
            </Text>
            <Text
              style={[
                styles.emptySubtext,
                { color: colors.secondary || "#888", fontFamily: fonts.body },
              ]}
            >
              Isi data pelatihan terlebih dahulu sebelum mengunggah dokumen
            </Text>
          </View>
        ) : (
          <FlatList
            data={trainings}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
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
  itemCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
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
  itemSubtitle: { fontSize: 12, opacity: 0.7, marginBottom: 1 },
  itemYear: { fontSize: 11, opacity: 0.5 },
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
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 13,
    textAlign: "center",
    opacity: 0.6,
    lineHeight: 18,
  },
});
