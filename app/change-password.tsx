import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import Button from "../components/button";
import TextInput from "../components/TextInput";
import { useLoading } from "../context/LoadingContext";
import { useTheme } from "../context/ThemeContext";
import useUpdatePassword from "../hooks/update/use-update-password";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(7, "Password saat ini minimal 7 karakter"),
    newPassword: z
      .string()
      .min(1, "Password baru wajib diisi")
      .min(7, "Password baru minimal 7 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const { colors, fonts } = useTheme();
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();
  const styles = createStyles(colors, fonts);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { updatePassword, isPending } = useUpdatePassword(
    () => {
      hideLoading();
      Alert.alert("Sukses", "Password berhasil diubah.");
      router.back();
    },
    () => {
      hideLoading();
      Alert.alert("Gagal", "Gagal mengubah password. Silakan coba lagi.");
    },
  );

  useEffect(() => {
    if (isPending) {
      showLoading();
    } else {
      hideLoading();
    }
    return () => hideLoading();
  }, [hideLoading, isPending, showLoading]);

  const handleSave = (data: FormData) => {
    updatePassword({
      old_password: data.currentPassword,
      new_password: data.newPassword,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ubah Password</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <Controller
              control={control}
              name="currentPassword"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Password Saat Ini"
                  placeholder="Masukkan password saat ini"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  style={styles.textInput}
                />
              )}
            />
            {errors.currentPassword && (
              <Text style={styles.errorText}>
                {errors.currentPassword.message}
              </Text>
            )}

            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Password Baru"
                  placeholder="Masukkan password baru"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  style={styles.textInput}
                />
              )}
            />
            {errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword.message}</Text>
            )}

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Konfirmasi Password Baru"
                  placeholder="Ulangi password baru"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  style={styles.textInput}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}

            <View style={styles.buttonContainer}>
              <Button
                title="Simpan Perubahan"
                onPress={handleSubmit(handleSave)}
                backgroundColor={colors.mainButton}
                textColor="#FFFFFF"
                style={{ width: "100%" }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any, fonts: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.card,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    },
    headerTitle: {
      fontFamily: fonts.heading,
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      padding: 20,
    },
    form: {
      gap: 16,
    },
    textInput: {
      width: "100%",
    },
    errorText: {
      color: "red",
      fontSize: 12,
      marginTop: -12,
      marginBottom: 4,
    },
    buttonContainer: {
      marginTop: 24,
    },
  });
