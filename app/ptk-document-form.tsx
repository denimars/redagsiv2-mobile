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

interface DocumentMenuItem {
  id: string;
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBgColor: string;
  route: string;
}

const DOCUMENT_MENU_ITEMS: DocumentMenuItem[] = [
  {
    id: "pendidikan",
    label: "Ijazah Pendidikan",
    description: "Dokumen ijazah pendidikan formal",
    icon: "school-outline",
    iconColor: "#0284C7",
    iconBgColor: "#E0F2FE",
    route: "/ptk-document-educations",
  },
  {
    id: "kompetensi",
    label: "Sertifikat Kompetensi",
    description: "Sertifikat uji kompetensi atau keahlian",
    icon: "ribbon-outline",
    iconColor: "#16A34A",
    iconBgColor: "#F0FDF4",
    route: "/ptk-document-competencies",
  },
  {
    id: "pelatihan",
    label: "Sertifikat Pelatihan",
    description: "Sertifikat dari program pelatihan atau workshop",
    icon: "medal-outline",
    iconColor: "#D97706",
    iconBgColor: "#FFFBEB",
    route: "/ptk-document-training",
  },
  {
    id: "family-card",
    label: "Kartu Keluarga",
    description: "Dokumen kartu keluarga",
    icon: "people-outline",
    iconColor: "#0284C7",
    iconBgColor: "#E0F2FE",
    route: "/ptk-document-family-card",
  },
];

export default function PtkDocumentMenuScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();

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
            Dokumen Pendukung
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
              Dokumen Pendukung
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: colors.text, fontFamily: fonts.body },
              ]}
            >
              Unggah dokumen pendukung untuk setiap data Anda
            </Text>
          </View>

          {/* Menu Section */}
          <View style={styles.bottomSection}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, fontFamily: fonts.heading },
              ]}
            >
              Pilih Jenis Dokumen
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
              {DOCUMENT_MENU_ITEMS.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push(item.route as any)}
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
                    <View style={styles.menuTextContainer}>
                      <Text
                        style={[
                          styles.menuText,
                          { color: colors.text, fontFamily: fonts.body },
                        ]}
                      >
                        {item.label}
                      </Text>
                      <Text
                        style={[
                          styles.menuDescription,
                          {
                            color: colors.secondary || "#888",
                            fontFamily: fonts.body,
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {item.description}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={colors.secondary}
                    />
                  </TouchableOpacity>

                  {index < DOCUMENT_MENU_ITEMS.length - 1 && (
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
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  menuDescription: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.7,
  },
  menuDivider: {
    height: 1,
    marginLeft: 78,
    opacity: 0.5,
  },
});
