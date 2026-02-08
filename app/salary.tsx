import useGetSalary from "@/hooks/get/use-get-salary";
import { formatCurrency } from "@/utils/general";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MOCK_SALARY_DATA } from "@/constants/salary-mock";
import { useTheme } from "../context/ThemeContext";

export default function Salary() {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);
  const router = useRouter();
  const [showData, setShowData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { handleGet, data, setData } = useGetSalary();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setData(undefined);
    setShowData(false);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, [setData, setShowData]);

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

          {MOCK_SALARY_DATA && (
            <View style={styles.dataContainer}>
              {/* Card 1: GAJI (Earnings) */}
              <View style={styles.dataCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderIcon}>
                    <Ionicons name="wallet-outline" size={24} color="#4A90E2" />
                  </View>
                  <Text style={styles.cardTitle}>GAJI</Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>A. Gaji Dasar</Text>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>- GAJI POKOK</Text>
                    <Text style={styles.rowValue}>
                      : {formatCurrency(MOCK_SALARY_DATA.earnings.gajiPokok)}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>- TUNJ. PROFESI</Text>
                    <Text style={styles.rowValue}>
                      : {formatCurrency(MOCK_SALARY_DATA.earnings.tunjProfesi)}
                    </Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>B. Tunjangan Lainnya</Text>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>- TUNJ. KEHADIRAN</Text>
                    <Text style={styles.rowValue}>
                      :{" "}
                      {formatCurrency(MOCK_SALARY_DATA.earnings.tunjKehadiran)}
                    </Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionLabel}>C. Tugas Tambahan</Text>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>- TIM PENDAMPING MUTU</Text>
                    <Text style={styles.rowValue}>
                      :{" "}
                      {formatCurrency(
                        MOCK_SALARY_DATA.earnings.timPendampingMutu,
                      )}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>TOTAL GAJI</Text>
                  <Text style={styles.summaryValue}>
                    : {formatCurrency(MOCK_SALARY_DATA.summary.totalGaji)}
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
                      : {formatCurrency(MOCK_SALARY_DATA.deductions.sppAnakGtk)}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>- PINJ. BELI KENDARAAN</Text>
                    <Text style={styles.rowValue}>
                      :{" "}
                      {formatCurrency(
                        MOCK_SALARY_DATA.deductions.pinjBeliKendaraan,
                      )}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>- POT TABUNGAN</Text>
                    <Text style={styles.rowValue}>
                      :{" "}
                      {formatCurrency(MOCK_SALARY_DATA.deductions.potTabungan)}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>- BTN PERSA</Text>
                    <Text style={styles.rowValue}>
                      : {formatCurrency(MOCK_SALARY_DATA.deductions.btnPersa)}
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
                    : {formatCurrency(MOCK_SALARY_DATA.summary.takeHomePay)}
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
