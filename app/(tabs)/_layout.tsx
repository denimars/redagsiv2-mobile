import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function CustomTabBar({ state, descriptors, navigation }: any) {
  const { colors, fonts } = useTheme();

  const getIconName = (routeName: string, focused: boolean): any => {
    switch (routeName) {
      case "finansial":
        return focused ? "card" : "card-outline";
      case "history":
        return focused ? "people" : "people-outline";
      case "attendance":
        return focused ? "location" : "location-outline";
      case "qr":
        return focused ? "qr-code" : "qr-code-outline";
      case "profile":
        return focused ? "person" : "person-outline";
      default:
        return "help-outline";
    }
  };

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.tabBar }]}>
      {state.routes.map((route: any, index: number) => {
        const options = descriptors[route.key]?.options ?? {};
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (isFocused) return;

          router.navigate({
            pathname: `/(tabs)/${route.name}` as any,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={() =>
              navigation?.emit?.({
                type: "tabLongPress",
                target: route.key,
              })
            }
            style={styles.tabItem}
          >
            <Ionicons
              name={getIconName(route.name, isFocused)}
              size={24}
              color={isFocused ? colors.mainButton : colors.tabBarInActive}
            />

            <Text
              style={[
                styles.tabLabel,
                {
                  fontFamily: fonts.body,
                  color: isFocused ? colors.mainButton : colors.tabBarInActive,
                  fontSize: 10,
                },
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>

            {isFocused && (
              <View
                style={[
                  styles.underline,
                  { backgroundColor: colors.mainButton },
                ]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 65,
    elevation: 8,
    shadowOpacity: 0.1,
    borderTopWidth: 0,
    paddingBottom: Platform.OS === "ios" ? 5 : 5,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tabLabel: {
    marginTop: 4,
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: "15%",
    right: "15%",
    height: 3,
    borderRadius: 2,
  },
});

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="finansial" options={{ title: "Finansial" }} />
      <Tabs.Screen name="history" options={{ title: "Riwayat" }} />
      <Tabs.Screen name="attendance" options={{ title: "Absensi" }} />
      <Tabs.Screen name="qr" options={{ title: "QR" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
}
