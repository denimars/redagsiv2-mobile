import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

// Mock Notification Data
const NOTIFICATIONS = [
  {
    id: "1",
    title: "Absensi Berhasil",
    message: "Anda telah berhasil melakukan absensi masuk pada pukul 08:00.",
    time: "2 jam yang lalu",
    type: "success",
    isRead: false,
  },
  {
    id: "2",
    title: "Pengingat Absensi",
    message: "Jangan lupa untuk melakukan absensi pulang hari ini.",
    time: "4 jam yang lalu",
    type: "warning",
    isRead: false,
  },
  {
    id: "3",
    title: "Pembaruan Sistem",
    message: "Sistem absensi akan mengalami pemeliharaan pada pukul 22:00.",
    time: "1 hari yang lalu",
    type: "info",
    isRead: true,
  },
  {
    id: "4",
    title: "Izin Disetujui",
    message: "Permohonan izin sakit Anda untuk tanggal 20 Jan telah disetujui.",
    time: "2 hari yang lalu",
    type: "success",
    isRead: true,
  },
  {
    id: "5",
    title: "Gagal Absensi",
    message: "Absensi gagal karena Anda berada di luar area yang ditentukan.",
    time: "3 hari yang lalu",
    type: "error",
    isRead: true,
  },
];

export default function NotificationScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const styles = createStyles(colors, fonts);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const getIconName = (type: string) => {
    switch (type) {
      case "success":
        return "checkmark-circle";
      case "warning":
        return "alert-circle";
      case "error":
        return "close-circle";
      default:
        return "information-circle";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "#10B981";
      case "warning":
        return "#FBBF24";
      case "error":
        return "#EF4444";
      default:
        return colors.mainButton;
    }
  };

  const renderItem = ({ item }: { item: (typeof NOTIFICATIONS)[0] }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.isRead && styles.unreadItem]}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${getIconColor(item.type)}15` },
        ]}
      >
        <Ionicons
          name={getIconName(item.type) as any}
          size={24}
          color={getIconColor(item.type)}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.itemHeader}>
          <Text
            style={[
              styles.itemTitle,
              { fontWeight: item.isRead ? "500" : "bold" },
            ]}
          >
            {item.title}
          </Text>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        <Text
          style={[styles.itemMessage, item.isRead && { opacity: 0.8 }]}
          numberOfLines={2}
        >
          {item.message}
        </Text>
        <Text style={styles.itemTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifikasi</Text>
          <View style={styles.headerRight}>
            {notifications.some((n) => !n.isRead) && (
              <TouchableOpacity onPress={markAllAsRead}>
                <Text style={styles.markReadText}>Baca Semua</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* List */}
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            notifications.length === 0 && { flexGrow: 1 },
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.mainButton}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="notifications-off-outline"
                size={64}
                color={colors.secondary}
                style={{ opacity: 0.3 }}
              />
              <Text style={styles.emptyText}>Tidak ada notifikasi</Text>
            </View>
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
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.background,
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
      position: "absolute",
      left: 0,
      right: 0,
      textAlign: "center",
      zIndex: -1,
    },
    headerRight: {
      minWidth: 80,
      alignItems: "flex-end",
    },
    markReadText: {
      fontFamily: fonts.body,
      fontSize: 14,
      color: colors.mainButton,
      fontWeight: "600",
    },
    listContent: {
      padding: 20,
      paddingBottom: 40,
    },
    notificationItem: {
      flexDirection: "row",
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.03,
      shadowRadius: 10,
      elevation: 2,
      borderWidth: 1,
      borderColor: colors.border,
    },
    unreadItem: {
      borderColor: `${colors.mainButton}40`,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    contentContainer: {
      flex: 1,
    },
    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    itemTitle: {
      fontFamily: fonts.heading,
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      flex: 1,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.mainButton,
      marginLeft: 8,
    },
    itemMessage: {
      fontFamily: fonts.body,
      fontSize: 14,
      color: colors.secondary,
      lineHeight: 20,
      marginBottom: 8,
    },
    itemTime: {
      fontFamily: fonts.body,
      fontSize: 12,
      color: colors.secondary,
      opacity: 0.6,
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 100, // Offset to look more centered
    },
    emptyText: {
      fontFamily: fonts.body,
      fontSize: 16,
      color: colors.secondary,
      marginTop: 16,
    },
  });
