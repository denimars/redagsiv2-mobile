import { Tabs } from "expo-router";

export default function TabLoyout() {
    return(
        <Tabs screenOptions={{headerShown:false}}>
            <Tabs.Screen name="index" options={{title:"Home"}}/>
            <Tabs.Screen name="absensi" options={{title:"Absensi"}}/>
        </Tabs>   
    )
}