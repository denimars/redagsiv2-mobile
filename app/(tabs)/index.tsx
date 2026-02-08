import useGetAttendanceSchedule from "@/hooks/get/use-get-attendance-schedule";
import { formatLocalizedDate } from "@/utils/time";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
// import { getCurrentLocation } from "@/utils/location";
import PermissionRequiredScreen from "@/components/PermissionRequiredScreen";
import useCreateAttendance from "@/hooks/post/use-create-attendance";
import useGetLocation from "@/hooks/use-get-location";
import { useGetUserStorage } from "@/hooks/use-get-user-storage";
import { capitalizeWords, getGreeting } from "@/utils/general";
import { convertLatLongToKm } from "@/utils/location";
import SkeletonLoadingAbsensi from "../../components/loading_page/SkeletonLoadingAbsensi";

// Mock Announcement Data
const ANNOUNCEMENT_DATA = [
  {
    id: "1",
    title: "Pembaruan Sistem Absensi Digital v2.0",
    category: "PENGUMUMAN",
    date: "29 Des 2025",
  },
  {
    id: "2",
    title: "Jadwal Libur Akhir Tahun Pelajaran 2025/2026",
    category: "INFO",
    date: "28 Des 2025",
  },
  {
    id: "3",
    title: "Rapat Koordinasi Bulanan Seluruh Staff",
    category: "RAPAT",
    date: "30 Des 2025",
  },
];

export default function Absensi() {
  const { colors, fonts } = useTheme();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const styles = createStyles(colors, fonts);
  const [refreshing, setRefreshing] = useState(false);
  const [isInRange, setIsInRange] = useState(false);

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const announcementScrollRef = useRef<ScrollView>(null);
  const announcementIndex = useRef(0);

  useEffect(() => {
    // Continuous pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [pulseAnim]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Auto-scroll for announcements
    const scrollTimer = setInterval(() => {
      if (announcementScrollRef.current) {
        announcementIndex.current =
          (announcementIndex.current + 1) % ANNOUNCEMENT_DATA.length;
        announcementScrollRef.current.scrollTo({
          x: announcementIndex.current * 296, // width (280) + marginRight (16)
          animated: true,
        });
      }
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(scrollTimer);
    };
  }, []);

  const handleManualScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / 296);
    announcementIndex.current = index;
  };

  const {
    AttendanceSchedule,
    isLoading: isScheduleLoading,
    refetch,
  } = useGetAttendanceSchedule();

  const { location, state } = useGetLocation(refreshing);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    // simulasi fetch data
    refetch();
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setRefreshing(false);
  }, [refetch]);

  const { saveAttendance } = useCreateAttendance();

  const isLoading = isScheduleLoading || !location || !AttendanceSchedule;

  useEffect(() => {
    const distance = convertLatLongToKm(
      location?.coords.latitude || 0,
      location?.coords.longitude || 0,
      AttendanceSchedule?.location.lat || 0,
      AttendanceSchedule?.location.long || 0,
    );
    setIsInRange(distance <= (AttendanceSchedule?.location.radius || 0));
  }, [
    AttendanceSchedule?.location.radius,
    AttendanceSchedule?.location.lat,
    AttendanceSchedule?.location.long,
    location?.coords.latitude,
    location?.coords.longitude,
  ]);

  const { userData } = useGetUserStorage();

  function showAbsensi(): { text: string; status: boolean; absensi: boolean } {
    const hasSchedule = Boolean(AttendanceSchedule?.in);
    const total_attendance = AttendanceSchedule?.total_absen as number;
    const start = AttendanceSchedule?.start as boolean;
    const end = AttendanceSchedule?.end as boolean;

    if (!hasSchedule) {
      return {
        text: "",
        status: false,
        absensi: false,
      };
    }

    if (start) {
      if (total_attendance === 0) {
        return {
          text: "Absen Masuk",
          status: true,
          absensi: false,
        };
      } else {
        return {
          text: "Absen Masuk",
          status: true,
          absensi: true,
        };
      }
    }

    if (end) {
      if (total_attendance <= 1) {
        return {
          text: "Absen Keluar",
          status: true,
          absensi: false,
        };
      } else {
        return {
          text: "Absen Keluar",
          status: true,
          absensi: true,
        };
      }
    }

    if ((!start && !end && total_attendance) || 0 > 0) {
      return {
        text: "",
        status: false,
        absensi: true,
      };
    }

    return {
      text: "",
      status: false,
      absensi: false,
    };
  }

  if (state === "permission-denied") {
    return (
      <PermissionRequiredScreen
        title="Izin Lokasi Diperlukan"
        description="Aplikasi ini membutuhkan izin lokasi."
        onOpenSettings={() => Linking.openSettings()}
      />
    );
  }

  if (state === "service-disabled") {
    return (
      <PermissionRequiredScreen
        refreshing={refreshing}
        onRefresh={onRefresh}
        title="Lokasi Tidak Aktif"
        description="Silakan aktifkan GPS / Location Service."
        onOpenSettings={() => {
          if (Platform.OS === "android") {
            Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
          } else {
            Linking.openSettings();
          }
        }}
      />
    );
  }

  if (isLoading) {
    return <SkeletonLoadingAbsensi />;
  } else {
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
            {/* Header Section */}
            <View style={styles.header}>
              <View>
                <Text style={styles.greetingText}>
                  {getGreeting(currentTime)},
                </Text>
                <Text style={styles.userNameText}>
                  {capitalizeWords(userData?.name || "")}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => router.push("/notification")}
              >
                <Ionicons
                  name={isInRange ? "notifications-outline" : "warning-outline"}
                  size={24}
                  color={isInRange ? colors.text : "#EF4444"}
                />
                {isInRange && <View style={styles.notificationBadge} />}
              </TouchableOpacity>
            </View>

            {/* Clock Section */}
            <View style={styles.clockSection}>
              <View style={styles.clockCard}>
                <Text style={styles.dateLabel}>
                  {formatLocalizedDate(currentTime, "dddd, D MMMM YYYY")}
                </Text>
                <View style={styles.clockWrapper}>
                  <Animated.View
                    style={[
                      styles.clockCircle,
                      {
                        transform: [{ scale: pulseAnim }],
                      },
                    ]}
                  >
                    <Text style={styles.timeText}>
                      {formatLocalizedDate(currentTime, "HH:mm:ss")}
                    </Text>
                    {AttendanceSchedule?.in && (
                      <View style={styles.statusBadge}>
                        <View
                          style={[
                            styles.statusDot,
                            {
                              backgroundColor: showAbsensi().absensi
                                ? "#10B981"
                                : isInRange
                                  ? "#FBBF24"
                                  : "#EF4444",
                            },
                          ]}
                        />
                        <Text style={styles.statusText}>
                          {showAbsensi().absensi
                            ? "Sudah Absen"
                            : isInRange
                              ? "Belum Absen"
                              : "Luar Area"}
                        </Text>
                      </View>
                    )}
                  </Animated.View>
                </View>
              </View>
            </View>

            {/* Geofencing Alert */}
            {!isInRange && (
              <View style={styles.alertBanner}>
                <View style={styles.alertIconContainer}>
                  <Ionicons name="location-outline" size={24} color="#EF4444" />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>Di Luar Area</Text>
                  <Text style={styles.alertMessage}>
                    Anda berada di luar area absensi. Silakan masuk ke area
                    untuk melakukan absen.
                  </Text>
                </View>
              </View>
            )}

            {/* Action Button */}
            {isInRange && showAbsensi().status && (
              <View style={styles.actionSection}>
                <TouchableOpacity
                  style={[
                    styles.dynamicButton,
                    showAbsensi().absensi && { backgroundColor: "#10B981" },
                  ]}
                  onPress={() => {
                    saveAttendance({
                      lat: location?.coords.latitude || 0,
                      long: location?.coords.longitude || 0,
                    });
                  }}
                >
                  <View style={styles.actionIconContainer}>
                    <Ionicons
                      name={
                        showAbsensi().absensi
                          ? "checkmark-circle-outline"
                          : showAbsensi().text === "Absen Masuk"
                            ? "log-in-outline"
                            : "log-out-outline"
                      }
                      size={32}
                      color="#fff"
                    />
                  </View>
                  <Text style={styles.actionButtonText}>
                    {showAbsensi().absensi ? "Sudah Absen" : showAbsensi().text}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Announcement Section */}
            <View style={styles.announcementSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Pengumuman</Text>
              </View>
              <ScrollView
                ref={announcementScrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.announcementScrollContent}
                snapToInterval={296}
                decelerationRate="fast"
                onMomentumScrollEnd={handleManualScroll}
              >
                {ANNOUNCEMENT_DATA.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.announcementCard,
                      { borderLeftColor: colors.mainButton },
                    ]}
                  >
                    <View style={styles.announcementInfo}>
                      <View style={styles.categoryBadgeMinimal}>
                        <View
                          style={[
                            styles.categoryDot,
                            { backgroundColor: colors.mainButton },
                          ]}
                        />
                        <Text
                          style={[
                            styles.categoryTextMinimal,
                            { color: colors.mainButton },
                          ]}
                        >
                          {item.category}
                        </Text>
                      </View>
                      <Text style={styles.announcementTitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <View style={styles.announcementFooter}>
                        <Ionicons
                          name="calendar-outline"
                          size={14}
                          color={colors.secondary}
                        />
                        <Text style={styles.announcementDate}>{item.date}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
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
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 20,
    },
    greetingText: {
      fontFamily: fonts?.body || "System",
      fontSize: 16,
      color: colors?.secondary || "#6b7280",
      opacity: 0.8,
    },
    userNameText: {
      fontFamily: fonts?.heading || "System",
      fontSize: 26,
      fontWeight: "bold",
      color: colors?.text || "#1c1c1c",
      marginTop: 2,
      textTransform: "capitalize",
    },
    notificationButton: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor: colors?.card || "#fff",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors?.border || "#f0f0f0",
    },
    notificationBadge: {
      position: "absolute",
      top: 14,
      right: 14,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: "#EF4444",
      borderWidth: 2,
      borderColor: colors?.card || "#fff",
    },
    clockSection: {
      marginBottom: 24,
    },
    clockCard: {
      backgroundColor: colors?.card || "#fff",
      borderRadius: 36,
      padding: 24,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
      elevation: 10,
      borderWidth: 1,
      borderColor: colors?.border || "#f0f0f0",
    },
    dateLabel: {
      fontFamily: fonts?.body || "System",
      fontSize: 14,
      color: colors?.secondary || "#6b7280",
      fontWeight: "600",
      marginBottom: 20,
      opacity: 0.8,
    },
    clockWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    clockCircle: {
      width: 230,
      height: 230,
      borderRadius: 115,
      backgroundColor: colors?.tabBar || "#1B3C53",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 10,
      borderColor: `${colors?.mainButton}10`,
      shadowColor: colors?.tabBar || "#1B3C53",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 15,
    },
    timeText: {
      fontSize: 42,
      fontWeight: "bold",
      fontFamily: fonts?.mono || "System",
      color: "#ffffff",
      textAlign: "center",
      letterSpacing: 1,
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      marginTop: 14,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#FBBF24",
      marginRight: 8,
    },
    statusText: {
      fontFamily: fonts?.body || "System",
      fontSize: 12,
      color: "#ffffff",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    actionSection: {
      marginBottom: 24,
    },
    dynamicButton: {
      height: 74,
      borderRadius: 22,
      paddingHorizontal: 24,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
      backgroundColor: colors?.mainButton,
    },
    alertBanner: {
      flexDirection: "row",
      backgroundColor: "#FEF2F2",
      borderRadius: 22,
      padding: 18,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: "#FEE2E2",
      alignItems: "center",
    },
    alertIconContainer: {
      width: 52,
      height: 52,
      borderRadius: 14,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
      shadowColor: "#EF4444",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    alertContent: {
      flex: 1,
    },
    alertTitle: {
      fontFamily: fonts?.heading || "System",
      fontSize: 16,
      fontWeight: "bold",
      color: "#EF4444",
      marginBottom: 4,
    },
    alertMessage: {
      fontFamily: fonts?.body || "System",
      fontSize: 13,
      color: "#7F1D1D",
      lineHeight: 18,
      opacity: 0.9,
    },
    announcementSection: {
      marginBottom: 30,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      paddingHorizontal: 4,
    },
    announcementScrollContent: {
      paddingLeft: 4,
      paddingRight: 20,
      marginBottom: 10,
    },
    announcementCard: {
      width: 280,
      backgroundColor: colors?.card || "#fff",
      borderRadius: 20,
      marginRight: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 4,
      borderLeftWidth: 6,
      borderWidth: 1,
      borderColor: colors?.border || "#f0f0f0",
    },
    categoryBadgeMinimal: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    categoryDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 6,
    },
    categoryTextMinimal: {
      fontFamily: fonts?.heading || "System",
      fontSize: 10,
      fontWeight: "bold",
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },
    announcementInfo: {
      padding: 20,
    },
    announcementTitle: {
      fontFamily: fonts?.heading || "System",
      fontSize: 16,
      fontWeight: "bold",
      color: colors?.text || "#1c1c1c",
      lineHeight: 22,
      marginBottom: 14,
    },
    announcementFooter: {
      flexDirection: "row",
      alignItems: "center",
    },
    announcementDate: {
      fontFamily: fonts?.body || "System",
      fontSize: 12,
      color: colors?.secondary || "#6b7280",
      marginLeft: 6,
      opacity: 0.8,
    },
    actionIconContainer: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    actionButtonText: {
      fontFamily: fonts?.heading || "System",
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
      letterSpacing: 0.5,
    },
    sectionTitle: {
      fontFamily: fonts?.heading || "System",
      fontSize: 20,
      fontWeight: "bold",
      color: colors?.text || "#1c1c1c",
      marginBottom: 12,
      marginLeft: 4,
    },
  });
