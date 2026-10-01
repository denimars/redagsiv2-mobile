/* eslint-disable @typescript-eslint/no-require-imports */
import Constants from "expo-constants";
import { useCallback, useEffect, useState } from "react";
import { AppState, Linking, Platform } from "react-native";

const isExpoGo = Constants.executionEnvironment === "storeClient";

type NotificationPermissionStatus = "undetermined" | "granted" | "denied";

export function useNotificationPermission() {
  const [notificationStatus, setNotificationStatus] =
    useState<NotificationPermissionStatus>("undetermined");

  /**
   * Cek permission saat ini
   */
  const checkPermission = useCallback(async () => {
    if (isExpoGo) return "undetermined" as NotificationPermissionStatus;
    const Notifications = require("expo-notifications");
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationStatus(status);
    return status as NotificationPermissionStatus;
  }, []);

  /**
   * Request permission (Android 13+ ready)
   */
  const requestPermission = useCallback(async () => {
    if (isExpoGo) return "undetermined" as NotificationPermissionStatus;
    const Notifications = require("expo-notifications");
    const { status } = await Notifications.requestPermissionsAsync({
      android: {
        allowAlert: true,
        allowSound: true,
        allowBadge: true,
      },
    });

    setNotificationStatus(status);
    return status as NotificationPermissionStatus;
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
    if (notificationStatus === "granted") {
      openSettings();
      return;
    }

    // Belum diizinkan → request
    const status = await requestPermission();

    // Ditolak / blocked → buka settings
    if (status !== "granted") {
      openSettings();
    }
  }, [notificationStatus, requestPermission, openSettings]);

  /**
   * Lifecycle: cek ulang saat app aktif
   */
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (isExpoGo) {
        if (mounted) setNotificationStatus("undetermined");
        return;
      }
      const Notifications = require("expo-notifications");
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
    isSupported: !isExpoGo,
    isGranted: notificationStatus === "granted",
    isDenied: notificationStatus === "denied",

    checkPermission,
    handleToggleNotification,
    openSettings,
  };
}