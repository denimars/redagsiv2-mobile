import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, } from "react-native-safe-area-context";

export default function Profile(){
    const {colors, fonts} = useTheme();
    const styles = createStyles(colors, fonts);
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
               <View style={styles.profileCard}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={40} color={colors.tabBarInActive} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Deni Marswandi</Text>
                        <Text style={styles.profileNupy}>NUPY: 12345678</Text>
                        <View style={styles.profileRow}>
                            <View style={styles.profileColumn}>
                                <Text style={styles.profileLabel}>SATKER</Text>
                                <Text style={styles.profileValue}>SD IT PUTRI</Text>
                            </View>
                            <View style={styles.profileColumn}>
                                <Text style={styles.profileLabel}>LEMBAGA</Text>
                                <Text style={styles.profileValue}>SD IT PUTRI</Text>
                            </View>
                        </View>
                        <View style={styles.tupasContainer}>
                            <Text style={styles.profileLabel}>TUPAS POKOK</Text>
                            <Text style={styles.profileTupas}>TIM IT</Text>
                        </View>
                    </View>
                </View>
               </View>
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.menuContainer}>
                    <View style={styles.menuItem}>
                        <Ionicons name="lock-closed" size={24} color={colors.icon} />
                        <Text style={styles.menuText}>Ubah Password</Text>
                        <Ionicons name="chevron-forward" size={20} color={colors.text} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const createStyles = (colors: any, fonts: any) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    profileCard:{
        backgroundColor: colors.card,
        padding: 24,
        borderRadius: 16,
        width: '100%',
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    profileHeader:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer:{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.mainButton,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    profileInfo:{
        flex: 1,
    },
    profileName:{
        fontFamily: fonts.heading,
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
    },
    profileNupy:{
        fontFamily: fonts.mono,
        fontSize: 14,
        color: colors.icon,
        marginBottom: 12,
        fontWeight: '600',
    },
    profileRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    profileColumn:{
        flex: 1,
        marginRight: 16,
    },
    profileLabel:{
        fontFamily: fonts.body,
        fontSize: 11,
        color: colors.secondary,
        fontWeight: '500',
        textTransform: 'uppercase',
        marginBottom: 2,
        letterSpacing: 0.5,
    },
    profileValue:{
        fontFamily: fonts.body,
        fontSize: 14,
        color: colors.text,
        fontWeight: '600',
    },
    tupasContainer:{
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 12,
    },
    profileTupas:{
        fontFamily: fonts.body,
        fontSize: 14,
        color: colors.text,
        fontWeight: '600',
    },
    topSection: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    bottomSection: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        paddingBottom: 50,
    },
    menuContainer:{
        backgroundColor: colors.card,
        borderRadius: 16,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    menuItem:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    menuText:{
        flex: 1,
        fontFamily: fonts.body,
        fontSize: 18,
        color: colors.text,
        marginLeft: 16,
    }
})