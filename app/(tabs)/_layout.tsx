import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLoyout() {
    const {colors, fonts} = useTheme()
    return(
        <Tabs screenOptions={{
            headerShown:false,
            tabBarActiveTintColor: colors.mainButton,
            tabBarInactiveTintColor: colors.tabBarInActive,
            tabBarStyle: {
                backgroundColor: colors.tabBar,

            },
            tabBarLabelStyle:{
                fontFamily: fonts.body,
                fontSize: 12,
            }
        }}>
            <Tabs.Screen name="history" options={{title:"Riwayat", tabBarIcon:({color, focused})=>(
                <Ionicons name={focused ? "people" : "people-outline"} size={24} color={color}/>
            )}}/>
            <Tabs.Screen name="finansial" options={{title:"Finansial", tabBarIcon:({color, focused})=>(
                <Ionicons name={focused ? "card" : "card-outline"} size={24} color={color}/>
            )}}/>
            <Tabs.Screen name="index" options={{title:"Absesni", tabBarIcon:({color, focused})=>(
                <Ionicons name={focused ? "location" : "location-outline"} size={24} color={color}/>
            )}}/>
            <Tabs.Screen name="qr" options={{title:"QR", tabBarIcon:({color, focused})=>(
                <Ionicons name={focused ? "qr-code" : "qr-code-outline"} size={24} color={color}/>
            )}}/>
            <Tabs.Screen name="profile" options={{title:"Profil", tabBarIcon:({color, focused})=>(
                <Ionicons name={focused ? "people" : "people-outline"} size={24} color={color}/>
            )}}/>
        </Tabs>   
    )
}