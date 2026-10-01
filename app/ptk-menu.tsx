import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
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

interface MenuItem {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBgColor: string;
  onPress: () => void;
}

export default function PtkMenuScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();

  const items: MenuItem[] = [
    {
      label: "Data PTK",
      icon: "id-card-outline",
      iconColor: "#4F46E5",
      iconBgColor: "#EEF2FF",
      onPress: () => router.push("/ptk-form"),
    },
    {
      label: "Dokumen Pendukung",
      icon: "document-attach-outline",
      iconColor: "#0284C7",
      iconBgColor: "#E0F2FE",
      onPress: () => router.push("/ptk-document-form"),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.card,
              borderBottomColor: colors.border || "#f0f0f0",
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.card }]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              { color: colors.text, fontFamily: fonts.heading },
            ]}
          >
            PTK
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.headerSection}>
            <Text
              style={[
                styles.headerTitle2,
                { color: colors.text, fontFamily: fonts.heading },
              ]}
            >
              Data PTK
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: colors.text, fontFamily: fonts.body },
              ]}
            >
              Kelola dan perbarui data kepegawaian Anda
            </Text>
          </View>

          {/* Menu Section — persis seperti ProfileMenuSection */}
          <View style={styles.bottomSection}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, fontFamily: fonts.heading },
              ]}
            >
              Pilih Kategori
            </Text>

            <View
              style={[
                styles.menuContainer,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border || "#f0f0f0",
                },
              ]}
            >
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={item.onPress}
                  >
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: item.iconBgColor },
                      ]}
                    >
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={item.iconColor}
                      />
                    </View>
                    <Text
                      style={[
                        styles.menuText,
                        { color: colors.text, fontFamily: fonts.body },
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={colors.secondary}
                    />
                  </TouchableOpacity>

                  {index < items.length - 1 && (
                    <View
                      style={[
                        styles.menuDivider,
                        { backgroundColor: colors.border || "#F3F4F6" },
                      ]}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  headerTitle2: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  bottomSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 14,
    marginLeft: 4,
    opacity: 0.9,
  },
  // --- identik dengan ProfileMenuSection ---
  menuContainer: {
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
    overflow: "hidden",
    borderWidth: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  menuDivider: {
    height: 1,
    marginLeft: 78,
    opacity: 0.5,
  },
});
