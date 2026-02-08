import { useTheme } from "@/context/ThemeContext";
import { useGetUserStorage } from "@/hooks/use-get-user-storage";
import useLogout from "@/hooks/useLogout";
import { capitalizeWords } from "@/utils/general";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { colors, fonts } = useTheme();
  const router = useRouter();
  const styles = createStyles(colors, fonts);
  const { Logout } = useLogout();

  const { userData } = useGetUserStorage();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.topSection}>
            <View style={styles.profileCard}>
              <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                  <LinearGradient
                    colors={[colors.mainButton, "#B8964A"]}
                    style={styles.avatarInner}
                  >
                    <Ionicons name="person" size={44} color="#FFFFFF" />
                  </LinearGradient>
                  <TouchableOpacity style={styles.editAvatarButton}>
                    <Ionicons name="camera" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>
                    {capitalizeWords(userData?.name || "")}
                  </Text>
                  <View style={styles.nupyBadge}>
                    <Text style={styles.profileNupy}>
                      NUPY: {userData?.user}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>SATKER</Text>
                  <Text style={styles.statValue}>SD IT PUTRI</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>LEMBAGA</Text>
                  <Text style={styles.statValue}>SD IT PUTRI</Text>
                </View>
              </View>

              <View style={styles.tupasContainer}>
                <View style={styles.tupasIconContainer}>
                  <Ionicons
                    name="briefcase-outline"
                    size={18}
                    color={colors.mainButton}
                  />
                </View>
                <View style={styles.tupasInfo}>
                  <Text style={styles.profileLabel}>TUPAS POKOK</Text>
                  <Text style={styles.profileTupas}>TIM IT</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <Text style={styles.sectionTitle}>Akun & Keamanan</Text>

            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push("/change-password")}
              >
                <View
                  style={[styles.iconContainer, { backgroundColor: "#E0F2FE" }]}
                >
                  <Ionicons name="lock-closed" size={20} color="#0284C7" />
                </View>
                <Text style={styles.menuText}>Ubah Password</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push("/settings")}
              >
                <View
                  style={[styles.iconContainer, { backgroundColor: "#F0FDF4" }]}
                >
                  <Ionicons name="settings-outline" size={20} color="#16A34A" />
                </View>
                <Text style={styles.menuText}>Pengaturan</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Lainnya</Text>
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => Logout()}
              >
                <View
                  style={[styles.iconContainer, { backgroundColor: "#FEE2E2" }]}
                >
                  <Ionicons name="log-out-outline" size={20} color="#DC2626" />
                </View>
                <Text style={[styles.menuText, { color: "#DC2626" }]}>
                  Keluar
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.versionText}>Versi 1.0.0</Text>
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
      paddingBottom: 40,
    },
    topSection: {
      marginTop: 20,
      marginBottom: 24,
    },
    profileCard: {
      backgroundColor: colors.card,
      padding: 24,
      borderRadius: 32,
      width: "100%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.border || "#f0f0f0",
    },
    profileHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
    },
    avatarContainer: {
      position: "relative",
      marginRight: 18,
    },
    avatarInner: {
      width: 84,
      height: 84,
      borderRadius: 42,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 4,
      borderColor: "#fff",
      shadowColor: colors.mainButton,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    editAvatarButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: colors.icon,
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: "#fff",
      elevation: 4,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontFamily: fonts.heading,
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 6,
    },
    nupyBadge: {
      backgroundColor: `${colors.mainButton}15`,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
      alignSelf: "flex-start",
    },
    profileNupy: {
      fontFamily: fonts.mono,
      fontSize: 12,
      color: colors.mainButton,
      fontWeight: "bold",
    },
    statsContainer: {
      flexDirection: "row",
      backgroundColor: "#F9FAFB",
      borderRadius: 20,
      padding: 18,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#F3F4F6",
    },
    statItem: {
      flex: 1,
      alignItems: "center",
    },
    statDivider: {
      width: 1,
      height: "100%",
      backgroundColor: "#E5E7EB",
      marginHorizontal: 10,
    },
    statLabel: {
      fontFamily: fonts.body,
      fontSize: 10,
      color: colors.secondary,
      fontWeight: "bold",
      textTransform: "uppercase",
      marginBottom: 6,
      letterSpacing: 0.8,
      opacity: 0.8,
    },
    statValue: {
      fontFamily: fonts.body,
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: "bold",
    },
    tupasContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 4,
    },
    tupasIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: `${colors.mainButton}15`,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    tupasInfo: {
      flex: 1,
    },
    profileLabel: {
      fontFamily: fonts.body,
      fontSize: 10,
      color: colors.secondary,
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginBottom: 2,
      opacity: 0.8,
    },
    profileTupas: {
      fontFamily: fonts.body,
      fontSize: 15,
      color: colors.text,
      fontWeight: "bold",
    },
    bottomSection: {
      flex: 1,
    },
    sectionTitle: {
      fontFamily: fonts.heading,
      fontSize: 17,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 14,
      marginLeft: 4,
      opacity: 0.9,
    },
    menuContainer: {
      backgroundColor: colors.card,
      borderRadius: 24,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 4,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border || "#f0f0f0",
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
      fontFamily: fonts.body,
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    menuDivider: {
      height: 1,
      backgroundColor: colors.border || "#F3F4F6",
      marginLeft: 78,
      opacity: 0.5,
    },
    versionText: {
      textAlign: "center",
      fontFamily: fonts.body,
      fontSize: 12,
      color: colors.text,
      marginTop: 10,
      marginBottom: 20,
      opacity: 0.7,
    },
  });
