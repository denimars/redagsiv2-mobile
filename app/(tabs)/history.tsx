import useGetAttendance from "@/hooks/get/use-get-attendance";
import { formatLocalizedDate } from "@/utils/time";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/button";
import DateTimePicker from "../../components/DateTimePicker";
import { useTheme } from "../../context/ThemeContext";

export default function History() {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showData, setShowData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { handleGet, data, setData } = useGetAttendance();

  const handle = () => {
    console.log("From Date:", formatLocalizedDate(fromDate, "YYYY-MM-DD"));
    console.log("To Date:", formatLocalizedDate(toDate, "YYYY-MM-DD"));
    handleGet({
      start: formatLocalizedDate(fromDate, "YYYY-MM-DD"),
      end: formatLocalizedDate(toDate, "YYYY-MM-DD"),
    });
    setShowData(true);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    // simulasi fetch data
    setData([]);
    setShowData(false);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setRefreshing(false);
  }, [setData, setShowData]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <Text style={styles.title}>Riwayat Kehadiran</Text>
            <Text style={styles.subtitle}>
              Pantau data kehadiran Anda dengan mudah
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formCard}>
              <View style={styles.formHeader}>
                <View style={styles.formIconContainer}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={colors.mainButton}
                  />
                </View>
                <View>
                  <Text style={styles.formTitle}>Filter Periode</Text>
                  <Text style={styles.formSubtitle}>
                    Pilih rentang tanggal data
                  </Text>
                </View>
              </View>

              <View style={styles.datePickerRow}>
                <View style={styles.datePickerWrapper}>
                  <DateTimePicker
                    label="Dari Tanggal"
                    onDateChange={setFromDate}
                  />
                </View>
                <View style={styles.datePickerWrapper}>
                  <DateTimePicker
                    label="Sampai Tanggal"
                    onDateChange={setToDate}
                  />
                </View>
              </View>

              <Button
                title="Filter Data"
                onPress={handle}
                backgroundColor={colors.mainButton}
                textColor="#FFFFFF"
                style={styles.filterButton}
              />
            </View>
          </View>

          {showData && (
            <View style={styles.dataContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Hasil Pencarian</Text>
                <Text style={styles.resultCount}>
                  {data?.length} Data ditemukan
                </Text>
              </View>
              {data?.map((item, index) => (
                <View key={index} style={styles.dataItem}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemNumberContainer}>
                      <Text style={styles.itemNumber}>#{index + 1}</Text>
                    </View>
                    <Text style={styles.itemDate}>
                      {item.date
                        ? formatLocalizedDate(item.date, "D MMMM YYYY")
                        : "-"}
                    </Text>
                  </View>

                  <View style={styles.timeContainer}>
                    <View style={styles.timeItem}>
                      <View style={styles.timeIcon}>
                        <Ionicons
                          name="enter-outline"
                          size={18}
                          color="#FFFFFF"
                        />
                      </View>
                      <View>
                        <Text style={styles.timeLabel}>Datang</Text>
                        <Text style={styles.timeValue}>
                          {item.arrive
                            ? formatLocalizedDate(item.arrive, "HH:mm:ss")
                            : "-"}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.timeSeparator} />

                    <View style={styles.timeItem}>
                      <View style={[styles.timeIcon, styles.timeIconLeave]}>
                        <Ionicons
                          name="exit-outline"
                          size={18}
                          color="#FFFFFF"
                        />
                      </View>
                      <View>
                        <Text style={styles.timeLabel}>Pulang</Text>
                        <Text style={styles.timeValue}>
                          {item.leave
                            ? formatLocalizedDate(item.leave, "HH:mm:ss")
                            : "-"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
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
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    header: {
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
      flex: 1,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      fontFamily: fonts.heading,
    },
    resultCount: {
      fontSize: 12,
      color: colors.textSecondary || "#666",
      fontFamily: fonts.body,
      opacity: 0.7,
    },
    dataItem: {
      backgroundColor: colors.card || "#FFFFFF",
      padding: 16,
      marginBottom: 16,
      borderRadius: 22,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.04,
      shadowRadius: 12,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border || "#f0f0f0",
    },
    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border || "#f0f0f0",
    },
    itemNumberContainer: {
      backgroundColor: `${colors.mainButton}15`,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
    },
    itemNumber: {
      fontSize: 12,
      fontFamily: fonts.body,
      color: colors.mainButton,
      fontWeight: "bold",
    },
    itemDate: {
      fontSize: 14,
      fontFamily: fonts.body,
      color: colors.text,
      fontWeight: "600",
    },
    timeContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    timeItem: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    timeIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: "#4CAF50",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    timeIconLeave: {
      backgroundColor: "#FF9800",
    },
    timeLabel: {
      fontSize: 11,
      fontFamily: fonts.body,
      color: colors.textSecondary || "#666",
      marginBottom: 2,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    timeValue: {
      fontSize: 16,
      fontFamily: fonts.body,
      color: colors.text,
      fontWeight: "bold",
    },
    timeSeparator: {
      width: 1,
      height: 30,
      backgroundColor: colors.border || "#f0f0f0",
      marginHorizontal: 16,
    },
  });
