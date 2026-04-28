import Dropdown from "@/components/Dropdown";
import useGetLoan from "@/hooks/get/use-get-loan";
import useGetLoanType from "@/hooks/get/use-get-loan-type";
import { formatCurrency } from "@/utils/general";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function LoanList() {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);
  const router = useRouter();

  const { loanType } = useGetLoanType();

  const [selectedType, setSelectedType] = useState<number>(1);

  const { data, isLoading, refetch } = useGetLoan(selectedType);

  const renderStatus = (
    is_approved: boolean | null,
    is_paid_off: boolean | null,
    is_disbursement: boolean | null,
  ) => {
    if (is_paid_off) {
      return (
        <View style={[styles.statusBadge, { backgroundColor: "#E8F5E9" }]}>
          <Text style={[styles.statusText, { color: "#2E7D32" }]}>Lunas</Text>
        </View>
      );
    }

    if (is_approved === null) {
      return (
        <View style={[styles.statusBadge, { backgroundColor: "#FFF3E0" }]}>
          <Text style={[styles.statusText, { color: "#EF6C00" }]}>Pending</Text>
        </View>
      );
    }

    if (is_approved && !is_disbursement) {
      return (
        <View style={[styles.statusBadge, { backgroundColor: "#E3F2FD" }]}>
          <Text style={[styles.statusText, { color: "#1976D2" }]}>
            Disetujui
          </Text>
        </View>
      );
    }

    if (is_disbursement) {
      return (
        <View style={[styles.statusBadge, { backgroundColor: "#E3F2FD" }]}>
          <Text style={[styles.statusText, { color: "#1976D2" }]}>
            Dicairkan
          </Text>
        </View>
      );
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor: "#FFEBEE" }]}>
        <Text style={[styles.statusText, { color: "#C62828" }]}>Ditolak</Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.loanCard}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="cash-outline" size={24} color={colors.mainButton} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.loanDescription}>{item.description}</Text>
        </View>
        {renderStatus(item.is_approved, item.is_paid_off, item.is_disbursement)}
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Jumlah Pinjaman</Text>
            <Text style={styles.infoValue}>{formatCurrency(item.amount)}</Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Potongan/Bulan</Text>
            <Text style={styles.infoValue}>
              {formatCurrency(item.deducation_amount)}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Durasi</Text>
            <Text style={styles.infoValue}>{item.duration_months} Bulan</Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Tipe</Text>
            <Text style={styles.infoValue}>
              {loanType.find((t) => t.value === item.type)?.label}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

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
          <Text style={styles.headerTitle}>Pinjaman</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/loan-application")}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              tintColor={colors.mainButton}
            />
          }
          ListHeaderComponent={
            <View style={styles.pageHeader}>
              <Text style={styles.title}>Daftar Pinjaman</Text>
              <Text style={styles.subtitle}>
                Pantau status dan riwayat pinjaman Anda
              </Text>
              <View
                style={{ marginTop: 20, width: "40%", alignSelf: "flex-end" }}
              >
                <Dropdown
                  options={loanType}
                  selectedValue={selectedType}
                  onValueChange={(val) => setSelectedType(Number(val))}
                  placeholder="Pilih Tipe"
                />
              </View>
            </View>
          }
          ListEmptyComponent={
            !isLoading ? (
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="document-text-outline"
                  size={64}
                  color={colors.border}
                />
                <Text style={styles.emptyText}>Belum ada data pinjaman</Text>
              </View>
            ) : null
          }
        />
      </SafeAreaView>
    </View>
  );
}

const createStyles = (colors: any, fonts: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
    addButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.mainButton,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.mainButton,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 4,
    },
    pageHeader: {
      marginTop: 20,
      marginBottom: 10,
      paddingHorizontal: 20,
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
      color: colors.text,
      opacity: 0.8,
    },
    listContent: {
      paddingBottom: 30,
    },
    loanCard: {
      backgroundColor: colors.card || "#FFFFFF",
      marginHorizontal: 20,
      marginBottom: 16,
      borderRadius: 24,
      padding: 16,
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
      marginBottom: 16,
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: `${colors.mainButton}15`,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    headerInfo: {
      flex: 1,
    },
    loanDescription: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      fontFamily: fonts.heading,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
    },
    statusText: {
      fontSize: 10,
      fontWeight: "bold",
      fontFamily: fonts.heading,
    },
    cardBody: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border || "#f0f0f0",
      paddingVertical: 12,
      gap: 12,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    infoCol: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 11,
      color: colors.text,
      fontFamily: fonts.body,
      marginBottom: 2,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      fontFamily: fonts.heading,
    },
    cardFooter: {
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    queueContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    queueText: {
      fontSize: 12,
      color: colors.text,
      fontFamily: fonts.body,
    },
    emptyContainer: {
      marginTop: 60,
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
    },
    emptyText: {
      fontSize: 16,
      color: colors.text,
      fontFamily: fonts.body,
    },
  });
