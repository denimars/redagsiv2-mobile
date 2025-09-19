import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import LoadingOverlay from '../components/LoadingOverlay';
import { LoadingProvider } from '../context/LoadingContext';
import { ThemeProvider } from '../context/ThemeContext';

SplashScreen.preventAutoHideAsync();



export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'RobotoMono-Regular': require('../assets/fonts/RobotoMono-Regular.ttf'),
  });

  useEffect(() => {
    console.log("useEffect triggered - fontsLoaded:", fontsLoaded, "fontError:", fontError);
    
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
    <ThemeProvider>
      <LoadingProvider>
        <Stack screenOptions={{ headerShown:false }}>
           <StatusBar style="auto"  />
           <Stack.Screen name="index" />
          <Stack.Screen name="login" />
        </Stack>
         <LoadingOverlay />
       </LoadingProvider>
    </ThemeProvider>
  );
}
