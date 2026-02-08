import { LightThemes, ThemeType } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useNotificationPermission } from "@/hooks/use-notification-permission";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { colors, fonts, themeName, setTheme } = useTheme();
  const styles = createStyles(colors, fonts);
  const router = useRouter();

  const { notificationStatus, handleToggleNotification } =
    useNotificationPermission();

  const themeOptions: {
    id: ThemeType;
    name: string;
    color: string;
    backgroundColor: string;
  }[] = [
    {
      id: "gold",
      name: "Gold (Default)",
      color: LightThemes.gold.mainButton,
      backgroundColor: LightThemes.gold.mainButton,
    },
    {
      id: "dark",
      name: "Midnight Dark",
      color: LightThemes.dark.mainButton,
      backgroundColor: LightThemes.dark.background,
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pengaturan</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.secondary, fontFamily: fonts.heading },
            ]}
          >
            Tampilan
          </Text>

          <View
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons
                  name="color-palette-outline"
                  size={24}
                  color={colors.mainButton}
                />
                <View style={styles.settingText}>
                  <Text
                    style={[
                      styles.settingLabel,
                      { color: colors.text, fontFamily: fonts.heading },
                    ]}
                  >
                    Warna Tema
                  </Text>
                  <Text
                    style={[
                      styles.settingSubLabel,
                      { color: colors.secondary, fontFamily: fonts.body },
                    ]}
                  >
                    Pilih warna aksen aplikasi
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.themeGrid}>
              {themeOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.themeOption,
                    {
                      borderColor:
                        themeName === option.id ? option.color : colors.border,
                      backgroundColor:
                        themeName === option.id
                          ? option.color + "10"
                          : "transparent",
                    },
                  ]}
                  onPress={() => setTheme(option.id)}
                >
                  <View
                    style={[
                      styles.colorCircle,
                      { backgroundColor: option.backgroundColor },
                    ]}
                  />
                  <Text
                    style={[
                      styles.themeName,
                      {
                        color:
                          themeName === option.id ? option.color : colors.text,
                        fontFamily:
                          themeName === option.id ? fonts.heading : fonts.body,
                      },
                    ]}
                  >
                    {option.name}
                  </Text>
                  {themeName === option.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={option.color}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.secondary, fontFamily: fonts.heading },
            ]}
          >
            Notifikasi
          </Text>

          <View
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <TouchableOpacity
              style={styles.settingItem}
              onPress={handleToggleNotification}
            >
              <View style={styles.settingInfo}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={colors.mainButton}
                />
                <View style={styles.settingText}>
                  <Text
                    style={[
                      styles.settingLabel,
                      { color: colors.text, fontFamily: fonts.heading },
                    ]}
                  >
                    Izin Notifikasi
                  </Text>
                  <Text
                    style={[
                      styles.settingSubLabel,
                      { color: colors.secondary, fontFamily: fonts.body },
                    ]}
                  >
                    {notificationStatus ===
                    Notifications.PermissionStatus.GRANTED
                      ? "Aktif"
                      : "Tidak Aktif"}
                  </Text>
                </View>
              </View>
              <Ionicons
                name={
                  notificationStatus === Notifications.PermissionStatus.GRANTED
                    ? "notifications"
                    : "notifications-off"
                }
                size={24}
                color={
                  notificationStatus === Notifications.PermissionStatus.GRANTED
                    ? colors.mainButton
                    : colors.secondary
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    headerTitle: {
      fontFamily: fonts.heading,
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    scrollContent: {
      padding: 20,
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 14,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10,
      marginLeft: 5,
    },
    card: {
      borderRadius: 16,
      borderWidth: 1,
      overflow: "hidden",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
    },
    settingItem: {
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    settingInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    settingText: {
      marginLeft: 15,
    },
    settingLabel: {
      fontSize: 16,
    },
    settingSubLabel: {
      fontSize: 12,
      marginTop: 2,
    },
    themeGrid: {
      padding: 10,
      gap: 10,
    },
    themeOption: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderRadius: 12,
      borderWidth: 2,
      marginBottom: 8,
    },
    colorCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 12,
    },
    themeName: {
      fontSize: 15,
      flex: 1,
    },
    checkIcon: {
      marginLeft: 10,
    },
    infoItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
    },
    infoLabel: {
      fontSize: 16,
      marginLeft: 15,
      flex: 1,
    },
    infoValue: {
      fontSize: 14,
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
  });
