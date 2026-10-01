import useGetEmployeeSalary from "@/hooks/get/use-get-employee-salary";
import { formatCurrency } from "@/utils/general";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "../context/ThemeContext";

export default function Salary() {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { salaryData, isLoading, error, refetch } = useGetEmployeeSalary();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    refetch();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, [refetch]);

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
          <Text style={styles.headerTitle}>Informasi Gaji</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.pageHeader}>
            <Text style={styles.title}>Data Gaji</Text>
            <Text style={styles.subtitle}>
              Lihat detail pendapatan dan potongan Anda
            </Text>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.mainButton} />
            </View>
          ) : error || !salaryData ? (
            <View style={styles.errorCard}>
              <View style={styles.errorIconContainer}>
                <Ionicons
                  name="cloud-offline-outline"
                  size={32}
                  color="#EF4444"
                />
              </View>
              <Text style={styles.errorTitle}>Gagal Memuat Data Gaji</Text>
              <Text style={styles.errorMessage}>
                Terjadi kesalahan saat mengambil data gaji. Silakan periksa
                koneksi internet Anda atau coba lagi.
              </Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => refetch()}
              >
                <Ionicons name="refresh-outline" size={20} color="#fff" />
                <Text style={styles.retryButtonText}>Coba Lagi</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.dataContainer}>
              {/* Card 1: GAJI (Earnings) */}
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderIcon}>
                    <Ionicons name="wallet-outline" size={24} color="#4A90E2" />
                  </View>
                  <Text style={styles.cardTitle}>GAJI</Text>
                </View>

                {(salaryData.earnings?.jobs?.length || 0) > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionLabel}>A. Gaji Dasar</Text>
                    {salaryData.earnings?.jobs?.map((job, index) => (
                      <View key={index}>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>- {job.name}</Text>
                          <Text style={styles.rowValue}>
                            : {formatCurrency(job.base_salary)}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>
                            - TUNJ. {job.name}
                          </Text>
                          <Text style={styles.rowValue}>
                            : {formatCurrency(job.job_amount)}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                {/* {salaryData.earnings.attendance_allowance > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionLabel}>
                      B. Tunjangan Lainnya
                    </Text>
                    <View style={styles.row}>
                      <Text style={styles.rowLabel}>- TUNJ. KEHADIRAN</Text>
                      <Text style={styles.rowValue}>
                        :{" "}
                        {formatCurrency(
                          salaryData.earnings.attendance_allowance
                        )}
                      </Text>
                    </View>
                  </View>
                )} */}

                {(salaryData.earnings?.additional_allowances?.length || 0) >
                  0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionLabel}>C. Tugas Tambahan</Text>
                    {salaryData.earnings?.additional_allowances?.map(
                      (item, index) => (
                        <View key={index} style={styles.row}>
                          <Text style={styles.rowLabel}>- {item.name}</Text>
                          <Text style={styles.rowValue}>
                            : {formatCurrency(item.amount)}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                )}

                <View style={styles.divider} />

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>TOTAL GAJI</Text>
                  <Text style={styles.summaryValue}>
                    : {formatCurrency(salaryData.summary?.total_salary)}
                  </Text>
                </View>
              </View>

              {/* Card 2: PINJAMAN (Deductions) */}
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.cardHeaderIcon,
                      { backgroundColor: "#FFF9C4" },
                    ]}
                  >
                    <Ionicons name="mail-outline" size={24} color="#FBC02D" />
                  </View>
                  <Text style={styles.cardTitle}>PINJAMAN</Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>D. Potongan</Text>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>- SPP ANAK GTK</Text>
                    <Text style={styles.rowValue}>
                      :{" "}
                      {formatCurrency(
                        salaryData.deductions?.children_school_fee
                      )}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>- PINJ. BELI KENDARAAN</Text>
                    <Text style={styles.rowValue}>
                      : {formatCurrency(salaryData.deductions?.vehicle_loan)}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>- POT TABUNGAN</Text>
                    <Text style={styles.rowValue}>
                      : {formatCurrency(salaryData.deductions?.savings)}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>- BTN PERSA</Text>
                    <Text style={styles.rowValue}>
                      : {formatCurrency(salaryData.deductions?.btn_persa_loan)}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.summaryRow}>
                  <View>
                    <Text style={styles.summaryLabel}>TAKE HOME PAY</Text>
                    <Text
                      style={[
                        styles.summaryLabel,
                        { fontSize: 10, fontWeight: "normal" },
                      ]}
                    >
                      (THP)
                    </Text>
                  </View>
                  <Text
                    style={[styles.summaryValue, { color: colors.mainButton }]}
                  >
                    : {formatCurrency(salaryData.summary?.take_home_pay)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
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
    },
    formHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || "#f0f0f0",
    },
    formIconContainer: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: `${colors.mainButton}15`,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    formTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      fontFamily: fonts.heading,
    },
    formSubtitle: {
      fontSize: 12,
      color: colors.textSecondary || "#666",
      fontFamily: fonts.body,
      opacity: 0.7,
    },
    datePickerRow: {
      flexDirection: "column",
      gap: 12,
      marginBottom: 16,
    },
    datePickerWrapper: {
      flex: 1,
    },
    filterButton: {
      borderRadius: 16,
      height: 56,
      shadowColor: colors.mainButton,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 6,
    },
    dataContainer: {
      gap: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 80,
    },
    errorCard: {
      backgroundColor: colors.card || "#FFFFFF",
      borderRadius: 28,
      padding: 30,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#FEE2E2",
      shadowColor: "#EF4444",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 5,
      marginBottom: 30,
    },
    errorIconContainer: {
      width: 60,
      height: 60,
      borderRadius: 18,
      backgroundColor: "#FEF2F2",
      justifyContent: "center",
      alignItems: "center",
    },
    errorTitle: {
      fontFamily: fonts.heading,
      fontSize: 18,
      fontWeight: "bold",
      color: "#EF4444",
      marginTop: 16,
      marginBottom: 8,
    },
    errorMessage: {
      fontFamily: fonts.body,
      fontSize: 14,
      color: colors.textSecondary || "#6b7280",
      textAlign: "center",
      marginBottom: 24,
      lineHeight: 20,
      opacity: 0.8,
    },
    retryButton: {
      backgroundColor: colors.mainButton,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 14,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: colors.mainButton,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    retryButtonText: {
      fontFamily: fonts.heading,
      fontSize: 14,
      fontWeight: "bold",
      color: "#fff",
      marginLeft: 8,
    },
    dataCard: {
      backgroundColor: colors.card || "#FFFFFF",
      borderRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border || "#f0f0f0",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    cardHeaderIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: "#E3F2FD",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      fontFamily: fonts.heading,
      letterSpacing: 1,
    },
    section: {
      marginBottom: 16,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 8,
      fontFamily: fonts.heading,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 12,
      marginBottom: 4,
    },
    rowLabel: {
      fontSize: 12,
      color: colors.text,
      fontFamily: fonts.body,
      flex: 1,
    },
    rowValue: {
      fontSize: 12,
      color: colors.text,
      fontFamily: fonts.body,
      fontWeight: "500",
      flex: 1,
      textAlign: "right",
    },
    divider: {
      height: 2,
      backgroundColor: colors.border || "#f0f0f0",
      marginVertical: 16,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    summaryLabel: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.text,
      fontFamily: fonts.heading,
    },
    summaryValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      fontFamily: fonts.body,
    },
  });
