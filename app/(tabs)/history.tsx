import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "../../context/ThemeContext";
import { useDatePicker } from "../../hooks/useDatePicker";

export default function History(){
    const {colors, fonts} = useTheme();
    const styles = createStyles(colors, fonts);
    const {
        isStartPickerVisible,
        setIsStartPickerVisible,
        isEndPickerVisible,
        setIsEndPickerVisible,
        startDate,
        endDate,
        handleData
    } = useDatePicker();
    return(
        <View style={styles.container}>
            <Text>Tanggal Dari: {startDate.toDateString()}</Text>
            <TouchableOpacity onPress={()=>setIsStartPickerVisible(true)} style={{backgroundColor:colors.mainButton}}>
                <Text style={{color:"#ffffff"}}>Ubah</Text>
            </TouchableOpacity>
            <DateTimePickerModal 
                isVisible={isStartPickerVisible}
                mode="date"
                onConfirm={handleData('start')}
                onCancel={()=>setIsStartPickerVisible(false)}
            />
            <Text>Tanggal Sampai: {endDate.toDateString()}</Text>
            <TouchableOpacity onPress={()=>setIsEndPickerVisible(true)} style={{backgroundColor:colors.mainButton}}>
                <Text style={{color:"#ffffff"}}>Ubah</Text>
            </TouchableOpacity>
            <DateTimePickerModal 
                isVisible={isEndPickerVisible}
                mode="date"
                onConfirm={handleData('end')}
                onCancel={()=>setIsEndPickerVisible(false)}
            />
        </View>
    )
}

const createStyles = (colors: any, fonts: any) => StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    fontUse: {
        fontFamily: fonts.body
    }
})