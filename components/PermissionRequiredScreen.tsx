import { Ionicons } from "@expo/vector-icons";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

type Props = {
  title: string;
  description: string;
  onOpenSettings?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export default function PermissionRequiredScreen({
  title,
  description,
  onOpenSettings,
  refreshing = false,
  onRefresh,
}: Props) {
  const { colors, fonts } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={64}
          color={colors.mainButton}
        />
      </View>

      <Text
        style={[
          styles.title,
          { color: colors.text, fontFamily: fonts.heading },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.description,
          { color: colors.secondary, fontFamily: fonts.body },
        ]}
      >
        {description}
      </Text>

      {onOpenSettings && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.mainButton }]}
          onPress={onOpenSettings}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.buttonText,
              { color: "#fff", fontFamily: fonts.button },
            ]}
          >
            Buka Pengaturan
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  iconContainer: {
    marginBottom: 32,
    padding: 24,
    borderRadius: 100,
    backgroundColor: "rgba(200, 167, 90, 0.1)", // Subtle gold background
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
