import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus, Linking, Platform } from "react-native";

type LocationState =
  | "loading"
  | "permission-denied"
  | "service-disabled"
  | "ready";

export default function useGetLocation(refresh?: boolean) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [state, setState] = useState<LocationState>("loading");

  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const isInitializingRef = useRef(false);

  const initLocation = async () => {
    if (isInitializingRef.current) return;
    isInitializingRef.current = true;

    try {
      // 1️⃣ Permission check (TIDAK request terus)
      const perm = await Location.getForegroundPermissionsAsync();

      if (perm.status !== "granted") {
        const req = await Location.requestForegroundPermissionsAsync();

        if (req.status !== "granted") {
          setState("permission-denied");
          if (!req.canAskAgain) {
            Linking.openSettings();
          }
          return;
        }
      }

      // 2️⃣ GPS Service check
      const serviceEnabled = await Location.hasServicesEnabledAsync();

      if (!serviceEnabled) {
        setState("service-disabled");
        return;
      }

      // 3️⃣ Ambil lokasi AWAL (INI WAJIB)
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      if (Platform.OS === "android") {
        if (current.mocked) {
          setState("service-disabled");
          return;
        }
      }

      setLocation(current);

      // 4️⃣ Hindari watcher dobel
      if (subscriptionRef.current) return;

      // 5️⃣ Watch location (realtime ringan)
      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 5, // meter
          timeInterval: 5000, // ms (5 detik)
        },
        (loc) => {
          setLocation(loc);
        },
      );

      setState("ready");
    } catch (err) {
      console.log("LOCATION ERROR:", err);
      setState("service-disabled");
    } finally {
      isInitializingRef.current = false;
    }
  };

  useEffect(() => {
    initLocation();

    const onAppStateChange = (state: AppStateStatus) => {
      if (state === "active") {
        initLocation();
      }
    };

    const sub = AppState.addEventListener("change", onAppStateChange);

    return () => {
      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
      sub.remove();
    };
  }, [refresh]);

  return {
    location,
    state,
    isReady: state === "ready" && location !== null,
  };
}
