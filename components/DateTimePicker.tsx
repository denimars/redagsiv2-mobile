import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "../context/ThemeContext";
import { useDatePicker } from "../hooks/useDatePicker";

interface DateTimePickerProps {
  label: string;
  onDateChange?: (date: Date) => void;
}

export default function DateTimePicker({
  label,
  onDateChange,
}: DateTimePickerProps) {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);
  const { date_, handleData, isDataPickerVisible, setIsDataPickerVisible } =
    useDatePicker(onDateChange || (() => {}));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsDataPickerVisible(true)}
        style={styles.inputContainer}
      >
        <Text style={styles.dateText}>{date_ || "Pilih Tanggal"}</Text>
        <View style={styles.iconContainer}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={colors.mainButton}
          />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDataPickerVisible}
        mode="date"
        onConfirm={handleData}
        onCancel={() => setIsDataPickerVisible(false)}
        accentColor={colors.mainButton}
        buttonTextColorIOS={colors.mainButton}
      />
    </View>
  );
}

const createStyles = (colors: any, fonts: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 4,
    },
    label: {
      fontSize: 13,
      fontFamily: fonts.body,
      color: colors.text,
      marginBottom: 8,
      fontWeight: "600",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background || "#F8F9FA",
      borderWidth: 1,
      borderColor: colors.border || "#E0E0E0",
      borderRadius: 12,
      paddingHorizontal: 16,
      height: 50,
    },
    dateText: {
      flex: 1,
      fontSize: 15,
      fontFamily: fonts.body,
      color: colors.text,
    },
    iconContainer: {
      marginLeft: 10,
    },
  });
