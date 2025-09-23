import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QR(){
    const {colors, fonts} = useTheme();
    const styles = createStyles(colors, fonts);
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>QR Code</Text>
            </View>
            
            <View style={styles.qrContainer}>
                <View style={styles.qrCard}>
                    <View style={styles.qrHeader}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>📱</Text>
                        </View>
                        <Text style={styles.cardTitle}>Kode Absensi</Text>
                        <Text style={styles.cardSubtitle}>Scan untuk melakukan absensi</Text>
                    </View>
                    
                    <View style={styles.qrWrapper}>
                        <QRCode 
                            value="19912010010101" 
                            size={180} 
                            color={colors.mainButton}  
                            backgroundColor="#FFFFFF"
                        />
                    </View>
                    
                    <View style={styles.qrFooter}>
                        <View style={styles.idContainer}>
                            <Text style={styles.idLabel}>ID:</Text>
                            <Text style={styles.idValue}>19912010010101</Text>
                        </View>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>● Aktif</Text>
                        </View>
                    </View>
                </View>
            </View>
            
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Pastikan QR code terlihat jelas saat melakukan absensi
                </Text>
            </View>
        </SafeAreaView>
    )
}

const createStyles = (colors: any, fonts: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginVertical: 40,
    },
    title: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.text,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: fonts.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    qrContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    qrCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 15,
        borderWidth: 1,
        borderColor: colors.border || '#f0f0f0',
        width: '100%',
        maxWidth: 320,
    },
    qrHeader: {
        alignItems: 'center',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border || '#f0f0f0',
    },
    logoContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: `${colors.mainButton}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    logoText: {
        fontSize: 24,
    },
    cardTitle: {
        fontSize: 20,
        fontFamily: fonts.heading,
        color: colors.text,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        fontFamily: fonts.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    qrWrapper: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        borderWidth: 2,
        borderColor: colors.mainButton,
        borderStyle: 'dashed',
    },
    qrFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border || '#f0f0f0',
    },
    idContainer: {
        flex: 1,
    },
    idLabel: {
        fontSize: 12,
        fontFamily: fonts.body,
        color: colors.textSecondary,
        marginBottom: 2,
    },
    idValue: {
        fontSize: 14,
        fontFamily: fonts.heading,
        color: colors.text,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    statusBadge: {
        backgroundColor: `${colors.mainButton}15`,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.mainButton,
    },
    statusText: {
        fontSize: 12,
        fontFamily: fonts.body,
        color: colors.mainButton,
        fontWeight: 'bold',
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 40,
    },
    footerText: {
        fontSize: 12,
        fontFamily: fonts.body,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
        paddingHorizontal: 20,
    },
})