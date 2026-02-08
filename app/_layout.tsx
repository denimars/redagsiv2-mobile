import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_700Bold,
  useFonts,
} from "@expo-google-fonts/outfit";
import * as NavigationBar from "expo-navigation-bar";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import { LoadingProvider } from "../context/LoadingContext";
import { ThemeProvider } from "../context/ThemeContext";
import QueryProvider from "../provider/QueryProvider";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "RobotoMono-Regular": require("../assets/fonts/RobotoMono-Regular.ttf"),
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_700Bold,
  });

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  useEffect(() => {
    console.log(
      "useEffect triggered - fontsLoaded:",
      fontsLoaded,
      "fontError:",
      fontError,
    );

    // Use alert for iPhone debugging (remove after testing)

    if (fontsLoaded || fontError) {
      console.log("Hiding splash screen - fonts condition met");

      SplashScreen.hideAsync();
    }

    // Timeout fallback - hide splash screen after 3 seconds regardless
    const timeout = setTimeout(() => {
      console.log("Timeout reached - hiding splash screen");

      SplashScreen.hideAsync();
    }, 3000);

    return () => {
      console.log("useEffect cleanup");
      clearTimeout(timeout);
    };
  }, [fontsLoaded, fontError]);

  return (
    <QueryProvider>
      <ThemeProvider>
        <LoadingProvider>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="change-password" />
            <Stack.Screen name="settings" />
          </Stack>
          <LoadingOverlay />
        </LoadingProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
