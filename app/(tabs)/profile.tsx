import ProfileMenuSection from "@/components/ProfileMenuSection";
import { useTheme } from "@/context/ThemeContext";
import useGetProfile from "@/hooks/get/use-get-profile";
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

  const { EmployeeMobile } = useGetProfile();

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
                    {capitalizeWords(
                      EmployeeMobile?.employee_hub?.employee?.name || ""
                    )}
                  </Text>
                  <View style={styles.nupyBadge}>
                    <Text style={styles.profileNupy}>
                      NUPY: {EmployeeMobile?.employee_hub?.employee?.nupy}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>SATKER</Text>
                  <Text style={styles.statValue}>
                    {capitalizeWords(
                      EmployeeMobile?.user_hub.role_hub[0]?.institution.name ||
                        "-"
                    )}
                  </Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>LEMBAGA</Text>
                  <Text style={styles.statValue}>
                    {capitalizeWords(
                      EmployeeMobile?.employee_hub?.employee?.employee_detail
                        ?.institution?.name || "-"
                    )}
                  </Text>
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
                  <Text style={styles.profileLabel}>TUGAS POKOK</Text>
                  {EmployeeMobile?.employee_hub?.employee
                    ?.employee_responsibilities?.length ? (
                    <View style={styles.tupasChipWrap}>
                      {EmployeeMobile.employee_hub.employee.employee_responsibilities.map(
                        (responsibility) => (
                          <View
                            key={responsibility.id}
                            style={styles.tupasChip}
                          >
                            <View style={styles.tupasChipDot} />
                            <Text style={styles.tupasChipText}>
                              {responsibility.job_responsibility?.name}
                            </Text>
                          </View>
                        )
                      )}
                    </View>
                  ) : (
                    <Text style={styles.tupasEmpty}>Belum ada tugas pokok</Text>
                  )}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <ProfileMenuSection
              title="Akun & Keamanan"
              items={[
                {
                  label: "Ubah Password",
                  icon: "lock-closed",
                  iconColor: "#0284C7",
                  iconBgColor: "#E0F2FE",
                  onPress: () => router.push("/change-password"),
                },
                {
                  label: "Pengaturan",
                  icon: "settings-outline",
                  iconColor: "#16A34A",
                  iconBgColor: "#F0FDF4",
                  onPress: () => router.push("/settings"),
                },
              ]}
            />

            <ProfileMenuSection
              title="Lainnya"
              items={[
                {
                  label: "PTK",
                  icon: "person-outline",
                  iconColor: "#4F46E5",
                  iconBgColor: "#EEF2FF",
                  onPress: () => router.push("/ptk-menu"),
                },
                {
                  label: "Keluar",
                  icon: "log-out-outline",
                  iconColor: "#DC2626",
                  iconBgColor: "#FEE2E2",
                  onPress: () => Logout(),
                  isDanger: true,
                },
              ]}
            />

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
      alignItems: "flex-start",
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
    tupasChipWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 4,
    },
    tupasChip: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: `${colors.mainButton}12`,
      borderRadius: 100,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    tupasChipDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.mainButton,
      marginRight: 8,
    },
    tupasChipText: {
      fontFamily: fonts.body,
      fontSize: 13,
      color: colors.text,
      fontWeight: "600",
    },
    tupasEmpty: {
      fontFamily: fonts.body,
      fontSize: 14,
      color: colors.textSecondary,
      opacity: 0.6,
      paddingVertical: 12,
    },
    bottomSection: {
      flex: 1,
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
