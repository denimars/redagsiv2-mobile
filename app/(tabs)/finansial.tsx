import { Ionicons } from "@expo/vector-icons";
import { RelativePathString, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

const QUICK_ACTIONS = [
  {
    id: "1",
    title: "Gaji",
    icon: "cash-outline" as const,
    navigate: "/salary",
  },
  {
    id: "2",
    title: "Kesehatan",
    icon: "medkit-outline" as const,
    navigate: "/health",
  },
  {
    id: "3",
    title: "Pinjaman",
    icon: "wallet-outline" as const,
    navigate: "/loan",
  },
];

export default function Finansial() {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Keuangan</Text>
            <Text style={styles.headerSubtitle}>
              Kelola pendapatan dan layanan finansial Anda
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Layanan</Text>
            </View>
            <View style={styles.quickActionsGrid}>
              {QUICK_ACTIONS.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionItem}
                  onPress={() =>
                    router.push(action.navigate as RelativePathString)
                  }
                >
                  <View style={styles.actionIconContainer}>
                    <Ionicons
                      name={action.icon}
                      size={28}
                      color={colors.mainButton}
                    />
                  </View>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
      paddingVertical: 24,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      fontFamily: fonts.heading,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.secondary,
      fontFamily: fonts.body,
      opacity: 0.8,
    },
    sectionContainer: {
      marginBottom: 24,
    },
    sectionHeader: {
      marginBottom: 16,
      paddingHorizontal: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      fontFamily: fonts.heading,
    },
    quickActionsGrid: {
      flexDirection: "row",
      backgroundColor: colors.card,
      paddingHorizontal: 16,
      paddingVertical: 24,
      borderRadius: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 12,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border || "#f0f0f0",
    },
    actionItem: {
      alignItems: "center",
      width: "33.33%",
    },
    actionIconContainer: {
      width: 64,
      height: 64,
      borderRadius: 18,
      backgroundColor: `${colors.mainButton}10`,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
      borderWidth: 1,
      borderColor: `${colors.mainButton}15`,
    },
    actionTitle: {
      fontSize: 13,
      color: colors.text,
      fontFamily: fonts.body,
      textAlign: "center",
      fontWeight: "600",
    },
  });
