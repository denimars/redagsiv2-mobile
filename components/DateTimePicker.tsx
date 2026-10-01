import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "../context/ThemeContext";
import { formatIndonesianDate, useDatePicker } from "../hooks/useDatePicker";

interface DateTimePickerProps {
  label: string;
  value?: string | Date;
  onDateChange?: (date: Date) => void;
  error?: string;
}

export default function DateTimePicker({
  label,
  value,
  onDateChange,
  error,
}: DateTimePickerProps) {
  const { colors, fonts } = useTheme();
  const styles = createStyles(colors, fonts);
  const { handleData, isDataPickerVisible, setIsDataPickerVisible } =
    useDatePicker(onDateChange);

  let displayDate = "";
  if (value) {
    const d = new Date(value);
    if (!isNaN(d.getTime())) {
      displayDate = formatIndonesianDate(d);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsDataPickerVisible(true)}
        style={[
          styles.inputContainer,
          error ? { borderColor: "#EF4444" } : {},
        ]}
      >
        <Text style={styles.dateText}>{displayDate || "Pilih Tanggal"}</Text>
        <View style={styles.iconContainer}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={colors.mainButton}
          />
        </View>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <DateTimePickerModal
        date={value ? new Date(value) : new Date()}
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
    errorText: {
      color: "#EF4444",
      fontSize: 12,
      marginTop: 4,
      fontFamily: fonts.body,
    },
  });
