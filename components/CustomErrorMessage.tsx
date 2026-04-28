import { Text, StyleSheet, TextStyle } from "react-native";

interface CustomErrorMessageProps {
  name: string;
  trigger?: any;
  style?: TextStyle;
}

export default function CustomErrorMessage({ trigger, style }: CustomErrorMessageProps) {
  if (!trigger) return null;

  return (
    <Text style={[styles.error, style]}>
      {trigger.message || "Wajib diisi"}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
