import { Ionicons } from "@expo/vector-icons";
import { TextInput as RNTextInput, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "../context/ThemeContext";
import { useDatePicker } from "../hooks/useDatePicker";
interface DateTimePickerProps {
    label: string;
    onDateChange?: (date: Date) => void;
}

export default function DateTimePicker({label, onDateChange}:DateTimePickerProps){
    const {colors, fonts} = useTheme();
    const styles = createStyles(colors, fonts);
    const {date_, handleData, isDataPickerVisible, setIsDataPickerVisible} = useDatePicker(onDateChange || (() => {}));
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label} :</Text>
            <View style={styles.inputContainer}>
                <RNTextInput value={date_} editable={false} style={styles.textInput}/>
                <TouchableOpacity onPress={()=>setIsDataPickerVisible(true)} style={styles.iconContainer}>
                    <Ionicons name="calendar" size={20} color={colors.mainButton} />
                </TouchableOpacity>
            </View>
            <DateTimePickerModal 
                isVisible={isDataPickerVisible}
                mode="date"
                onConfirm={handleData}
                onCancel={()=>setIsDataPickerVisible(false)}
                accentColor={colors.mainButton}
                textColor={colors.mainButton}
            />
        </View>
    )
} 

const createStyles = (colors: any, fonts: any) => StyleSheet.create({
  container:{
    flexDirection:"row",
    fontFamily:fonts.body,
    borderWidth:2,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderColor: colors.mainButton,
    borderRadius: 5,
  },
  label:{
    textAlignVertical: "center",
    alignSelf: "center"
  },
  inputContainer:{
    position:"relative",
    flexDirection:"row",
    alignItems:"center",
    flex: 1,
  },
  textInput:{
    flex: 1,
    paddingRight: 35,
  },
  iconContainer:{
    position: "absolute",
    right: 8,
  }
})