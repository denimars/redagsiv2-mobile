import * as Notifications from "expo-notifications";
import { useEffect } from "react";

type LocalNotificationPayload = {
  title: string;
  body: string;
  data?: Record<string, any>;
};

export function useLocalNotification() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification:
        async (): Promise<Notifications.NotificationBehavior> => ({
          shouldShowBanner: true,
          shouldShowList: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
    });
  }, []);

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  };

  const notifyNow = async (payload: LocalNotificationPayload) => {
    await Notifications.scheduleNotificationAsync({
      content: payload,
      trigger: null,
    });
  };

  const notifyAfter = async (
    payload: LocalNotificationPayload,
    seconds: Notifications.NotificationTriggerInput,
  ) => {
    await Notifications.scheduleNotificationAsync({
      content: payload,
      trigger: seconds,
    });
  };

  const notifyAt = async (
    payload: LocalNotificationPayload,
    trigger: Notifications.NotificationTriggerInput,
  ) => {
    await Notifications.scheduleNotificationAsync({
      content: payload,
      trigger,
    });
  };

  const cancelAll = async () => {
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
