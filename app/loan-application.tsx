import Dropdownv2 from "@/components/Dropdownv2";
import InputCurrency from "@/components/InputCurrency";
import useGetLoanType from "@/hooks/get/use-get-loan-type";
import useCreateLoan from "@/hooks/post/use-create-loan";
import { LoanFormData, loanSchema } from "@/schema/loan";
import Format from "@/utils/Format";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/button";
import TextInput from "../components/TextInput";
import { useLoading } from "../context/LoadingContext";
import { useTheme } from "../context/ThemeContext";

export default function LoanForm() {
  const { colors, fonts } = useTheme();
  const { showLoading, hideLoading } = useLoading();
  const router = useRouter();
  const styles = createStyles(colors, fonts);

  const { loanType } = useGetLoanType();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      description: "",
      amount: "0",
      duration_month: 0,
      deducation_amount: "0",
      type: 1,
    },
  });

  const { handleSave, isPending } = useCreateLoan(
    () => {
      hideLoading();
      reset();
      router.back();
    },
    () => {
      hideLoading();
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

  const middleware = (data: LoanFormData) => {
    const amount = Format.parseRupiah(data.amount);
    const deducation_amount = Format.parseRupiah(data.deducation_amount);
    return {
      ...data,
      amount,
      deducation_amount,
    };
  };

  const onSubmit = async (data: LoanFormData) => {
    const middlewareData = middleware(data);
    console.log(middlewareData);
    handleSave(middlewareData);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pengajuan Pinjaman</Text>
          <View style={{ width: 40 }} />
        </View>

        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.pageHeader}>
              <Text style={styles.title}>Buat Pinjaman</Text>
              <Text style={styles.subtitle}>
                Isi formulir di bawah ini untuk mengajukan pinjaman baru
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formCard}>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      label="Keterangan"
                      placeholder="Contoh: Pinjaman mendesak"
                      value={value}
                      onChangeText={onChange}
                      style={styles.textInput}
                    />
                  )}
                />
                {errors.description && (
                  <Text style={styles.errorText}>
                    {errors.description.message}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="amount"
                  render={({ field: { onChange, value } }) => (
                    <InputCurrency
                      label="Jumlah Pinjaman (Rp)"
                      placeholder="Masukkan jumlah pinjaman"
                      value={value ? value.toString() : ""}
                      onChangeText={(text) => onChange(text)}
                      keyboardType="numeric"
                      style={styles.textInput}
                    />
                  )}
                />
                {errors.amount && (
                  <Text style={styles.errorText}>{errors.amount.message}</Text>
                )}

                <Controller
                  control={control}
                  name="duration_month"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      label="Durasi Dalam Bulan"
                      placeholder="Masukkan durasi"
                      value={value ? value.toString() : ""}
                      onChangeText={(text) => onChange(Number(text))}
                      keyboardType="numeric"
                      style={styles.textInput}
                    />
                  )}
                />
                {errors.duration_month && (
                  <Text style={styles.errorText}>
                    {errors.duration_month.message}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="deducation_amount"
                  render={({ field: { onChange, value } }) => (
                    <InputCurrency
                      label="Jumlah Potongan (Rp)"
                      placeholder="Masukkan jumlah potongan"
                      value={value ? value.toString() : ""}
                      onChangeText={(text) => onChange(text)}
                      keyboardType="numeric"
                      style={styles.textInput}
                    />
                  )}
                />
                {errors.deducation_amount && (
                  <Text style={styles.errorText}>
                    {errors.deducation_amount.message}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="type"
                  render={({ field: { onChange, value } }) => (
                    <Dropdownv2
                      label="Tipe"
                      options={loanType}
                      selectedValue={value}
                      onValueChange={(val) => onChange(val)}
                      placeholder="Pilih tipe"
                    />
                  )}
                />
                {errors.type && (
                  <Text style={styles.errorText}>{errors.type.message}</Text>
                )}

                <View style={styles.buttonContainer}>
                  <Button
                    title="Ajukan Pinjaman"
                    onPress={handleSubmit(onSubmit)}
                    backgroundColor={colors.mainButton}
                    textColor="#FFFFFF"
                    style={{ width: "100%" }}
                    disabled={isPending}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const createStyles = (colors: any, fonts: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "transparent",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || "#f0f0f0",
      backgroundColor: colors.background,
    },
    headerTitle: {
      fontFamily: fonts.heading,
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
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
    content: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    pageHeader: {
      marginTop: 20,
      marginBottom: 24,
    },
    title: {
      fontSize: 28,
      fontFamily: fonts.heading,
      color: colors.text,
      fontWeight: "bold",
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      fontFamily: fonts.body,
      color: colors.text || "#666",
      opacity: 0.8,
    },
    formContainer: {
      marginBottom: 24,
    },
    formCard: {
      backgroundColor: colors.card || "#FFFFFF",
      padding: 20,
      borderRadius: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.08,
      shadowRadius: 20,
      elevation: 5,
      borderWidth: 1,
      borderColor: colors.border || "#f0f0f0",
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
