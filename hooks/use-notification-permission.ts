import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useState } from "react";
import { AppState, Linking, Platform } from "react-native";

export function useNotificationPermission() {
  const [notificationStatus, setNotificationStatus] =
    useState<Notifications.PermissionStatus>(
      Notifications.PermissionStatus.UNDETERMINED,
    );

  /**
   * Cek permission saat ini
   */
  const checkPermission = useCallback(async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationStatus(status);
    return status;
  }, []);

  /**
   * Request permission (Android 13+ ready)
   */
  const requestPermission = useCallback(async () => {
    const { status } = await Notifications.requestPermissionsAsync({
      android: {
        allowAlert: true,
        allowSound: true,
        allowBadge: true,
      },
    });

    setNotificationStatus(status);
    return status;
  }, []);

  /**
   * Buka app notification settings
   */
  const openSettings = useCallback(() => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  }, []);

  /**
   * MAIN HANDLER (pengganti toggle)
   */
  const handleToggleNotification = useCallback(async () => {
    // Sudah diizinkan → buka settings
    if (notificationStatus === Notifications.PermissionStatus.GRANTED) {
      openSettings();
      return;
    }

    // Belum diizinkan → request
    const status = await requestPermission();

    // Ditolak / blocked → buka settings
    if (status !== Notifications.PermissionStatus.GRANTED) {
      openSettings();
    }
  }, [notificationStatus, requestPermission, openSettings]);

  /**
   * Lifecycle: cek ulang saat app aktif
   */
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (mounted) setNotificationStatus(status);
    };

    init();

    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        checkPermission();
      }
    });

    return () => {
      mounted = false;
      sub.remove();
    };
  }, [checkPermission]);

  return {
    notificationStatus,
    isGranted: notificationStatus === Notifications.PermissionStatus.GRANTED,
    isDenied: notificationStatus === Notifications.PermissionStatus.DENIED,

    checkPermission,
    handleToggleNotification,
    openSettings,
  };
}
