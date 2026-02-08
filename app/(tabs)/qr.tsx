import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QR() {
  const { colors, fonts } = useTheme();
  const { width } = useWindowDimensions();
  const styles = createStyles(colors, fonts);

  // Calculate QR size based on screen width but cap it for larger screens
  const qrSize = Math.min(width * 0.5, 200);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>QR Code</Text>
          <Text style={styles.subtitle}>Tunjukkan kode ini untuk absensi</Text>
        </View>

        <View style={styles.qrContainer}>
          <View style={styles.qrCard}>
            <View style={styles.qrHeader}>
              <View style={styles.logoContainer}>
                <Ionicons name="qr-code" size={30} color={colors.mainButton} />
              </View>
              <Text style={styles.cardTitle}>Kode Absensi</Text>
              <Text style={styles.cardSubtitle}>
                Scan untuk melakukan absensi harian
              </Text>
            </View>

            <View style={styles.qrWrapper}>
              <QRCode
                value="19912010010101"
                size={qrSize}
                color={colors.mainButton}
                backgroundColor="#FFFFFF"
              />
            </View>

            <View style={styles.qrFooter}>
              <View style={styles.idContainer}>
                <Text style={styles.idLabel}>ID PEGAWAI</Text>
                <Text style={styles.idValue}>19912010010101</Text>
              </View>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Aktif</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.infoBox}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.mainButton}
            />
            <Text style={styles.footerText}>
              Pastikan kecerahan layar cukup tinggi agar QR code mudah terbaca
            </Text>
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
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 24,
    },
    header: {
      alignItems: "center",
      marginVertical: 10,
    },
    title: {
      fontSize: 28,
      fontFamily: fonts.heading,
      color: colors.text,
      fontWeight: "bold",
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 15,
      fontFamily: fonts.body,
      color: colors.secondary,
      marginTop: 4,
    },
    qrContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    qrCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 32,
      padding: 24,
      width: "100%",
      maxWidth: 340,
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.05)",
    },
    qrHeader: {
      alignItems: "center",
      marginBottom: 24,
    },
    logoContainer: {
      width: 56,
      height: 56,
      borderRadius: 18,
      backgroundColor: `${colors.mainButton}10`,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 20,
      fontFamily: fonts.heading,
      color: "#1c1c1c",
      fontWeight: "bold",
    },
    cardSubtitle: {
      fontSize: 13,
      fontFamily: fonts.body,
      color: "#666",
      textAlign: "center",
      marginTop: 4,
    },
    qrWrapper: {
      backgroundColor: "#f8f9fa",
      padding: 20,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
      borderWidth: 1,
      borderColor: "#f0f0f0",
    },
    qrFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: "#f0f0f0",
    },
    idContainer: {
      flex: 1,
    },
    idLabel: {
      fontSize: 10,
      fontFamily: fonts.body,
      color: "#999",
      fontWeight: "bold",
      letterSpacing: 1,
    },
    idValue: {
      fontSize: 15,
      fontFamily: fonts.heading,
      color: "#1c1c1c",
      fontWeight: "bold",
      marginTop: 2,
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: `${colors.mainButton}15`,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: `${colors.mainButton}30`,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.mainButton,
      marginRight: 6,
    },
    statusText: {
      fontSize: 12,
      fontFamily: fonts.body,
      color: colors.mainButton,
      fontWeight: "bold",
    },
    refreshButton: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 24,
      backgroundColor: "white",
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: `${colors.mainButton}30`,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    refreshText: {
      fontSize: 14,
      fontFamily: fonts.button,
      color: colors.mainButton,
      fontWeight: "600",
      marginLeft: 8,
    },
    footer: {
      marginVertical: 24,
    },
    infoBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: `${colors.mainButton}08`,
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: `${colors.mainButton}80`,
    },
    footerText: {
      flex: 1,
      fontSize: 12,
      fontFamily: fonts.body,
      color: colors.text,
      marginLeft: 12,
      lineHeight: 18,
    },
  });
