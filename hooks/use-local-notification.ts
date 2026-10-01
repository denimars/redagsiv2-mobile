/* eslint-disable @typescript-eslint/no-require-imports */
import Constants from "expo-constants";
import { useEffect } from "react";

const isExpoGo = Constants.executionEnvironment === "storeClient";

type LocalNotificationPayload = {
  title: string;
  body: string;
  data?: Record<string, any>;
};

type NotificationTriggerInput =
  | number
  | null
  | {
      type: "date" | "timeInterval";
      date?: Date | number;
      seconds?: number;
    };

export function useLocalNotification() {
  useEffect(() => {
    if (isExpoGo) return;
    const Notifications = require("expo-notifications");
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }, []);

  const requestPermission = async () => {
    if (isExpoGo) return false;
    const Notifications = require("expo-notifications");
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  };

  const notifyNow = async (payload: LocalNotificationPayload) => {
    if (isExpoGo) return;
    const Notifications = require("expo-notifications");
    await Notifications.scheduleNotificationAsync({
      content: payload,
      trigger: null,
    });
  };

  const notifyAfter = async (
    payload: LocalNotificationPayload,
    seconds: NotificationTriggerInput,
  ) => {
    if (isExpoGo) return;
    const Notifications = require("expo-notifications");
    await Notifications.scheduleNotificationAsync({
      content: payload,
      trigger: seconds,
    });
  };

  const notifyAt = async (
    payload: LocalNotificationPayload,
    trigger: NotificationTriggerInput,
  ) => {
    if (isExpoGo) return;
    const Notifications = require("expo-notifications");
    await Notifications.scheduleNotificationAsync({
      content: payload,
      trigger,
    });
  };

  const cancelAll = async () => {
    if (isExpoGo) return;
    const Notifications = require("expo-notifications");
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  return {
    requestPermission,
    notifyNow,
    notifyAfter,
    notifyAt,
    cancelAll,
  };
}