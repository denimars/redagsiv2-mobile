import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { colors, fonts } = useTheme();
    
    const getIconName = (routeName: string, focused: boolean) => {
        switch (routeName) {
            case 'history':
                return focused ? 'people' : 'people-outline';
            case 'finansial':
                return focused ? 'card' : 'card-outline';
            case 'index':
                return focused ? 'location' : 'location-outline';
            case 'qr':
                return focused ? 'qr-code' : 'qr-code-outline';
            case 'profile':
                return focused ? 'person' : 'person-outline';
            default:
                return 'help-outline';
        }
    };

    return (
        <View style={[styles.tabBar, { backgroundColor: colors.tabBar }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.title || route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={styles.tabItem}
                    >
                        <Ionicons
                            name={getIconName(route.name, isFocused) as any}
                            size={24}
                            color={isFocused ? colors.mainButton : colors.tabBarInActive}
                        />
                        <Text style={[
                            styles.tabLabel,
                            { 
                                fontFamily: fonts.body,
                                color: isFocused ? colors.mainButton : colors.tabBarInActive 
                            }
                        ]}>
                            {label}
                        </Text>
                        {isFocused && (
                            <View style={[styles.underline, { backgroundColor: colors.mainButton }]} />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: 60,
        elevation: 8,
        shadowOpacity: 0.1,
        borderTopWidth: 0,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
    },
    underline: {
        position: 'absolute',
        bottom: 0,
        left: '20%',
        right: '20%',
        height: 3,
        borderRadius: 2,
    },
});

export default function TabLoyout() {
    const {colors, fonts} = useTheme()
    return(
        <Tabs 
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="history" options={{ title: "Riwayat" }} />
            <Tabs.Screen name="finansial" options={{ title: "Finansial" }} />
            <Tabs.Screen name="index" options={{ title: "Absensi" }} />
            <Tabs.Screen name="qr" options={{ title: "QR" }} />
            <Tabs.Screen name="profile" options={{ title: "Profil" }} />
        </Tabs>   
    )
}