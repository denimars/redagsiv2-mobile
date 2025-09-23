import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/button";
import DateTimePicker from "../../components/DateTimePicker";
import { useTheme } from "../../context/ThemeContext";

const generateRandomTime = (startHour: number, endHour: number) => {
    const hour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
    const minute = Math.floor(Math.random() * 60);
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
};

const data = Array.from({ length: 4 }, (_, index) => {
    const day = (index + 1).toString().padStart(2, '0');
    const arriveTime = generateRandomTime(8, 9); // 08:00 - 08:59
    const leaveTime = Math.random() > 0.1 ? generateRandomTime(14, 17) : "-"; // 14:00 - 16:59 atau "-"
    
    return {
        arive: `2025-08-${day} ${arriveTime}`,
        leave: leaveTime === "-" ? "-" : `2025-08-${day} ${leaveTime}`,
    };
});

export default function History(){
    const {colors, fonts} = useTheme();
    const styles = createStyles(colors, fonts);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState<typeof data>([]);
    const [showData, setShowData] = useState(false);
    
    const handle = ()=>{
        console.log("From Date:", fromDate.toDateString());
        console.log("To Date:", toDate.toDateString());
        setFilteredData(data);
        setShowData(true);
    }
    
    return(
        <SafeAreaView style={styles.container}>
            
            <View style={styles.formContainer}>
                <View style={styles.formCard}>
                    <View style={styles.datePickerContainer}>
                        <DateTimePicker label="Dari Tanggal" onDateChange={setFromDate}/>
                    </View>
                    
                    <View style={styles.datePickerContainer}>
                        <DateTimePicker label="Sampai Tanggal" onDateChange={setToDate}/>
                    </View>
                    
                    <Button
                        title="Filter Data"
                        onPress={handle}
                        backgroundColor={colors.mainButton}
                        textColor="#FFFFFF"
                        style={styles.filterButton}
                    />
                </View>
            </View>
            
            {showData && (
                <View style={styles.dataContainer}>
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.dataItem}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemNumber}>#{index + 1}</Text>
                                    <Text style={styles.itemDate}>
                                        {new Date(item.arive).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </Text>
                                </View>
                                
                                <View style={styles.timeContainer}>
                                    <View style={styles.timeItem}>
                                        <View style={styles.timeIcon}>
                                            <Text style={styles.timeIconText}>▶</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.timeLabel}>Datang</Text>
                                            <Text style={styles.timeValue}>
                                                {new Date(item.arive).toLocaleTimeString('id-ID', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.timeSeparator} />
                                    
                                    <View style={styles.timeItem}>
                                        <View style={[styles.timeIcon, styles.timeIconLeave]}>
                                            <Text style={styles.timeIconText}>◀</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.timeLabel}>Pulang</Text>
                                            <Text style={styles.timeValue}>
                                                {item.leave === "-" ? "-" : new Date(item.leave).toLocaleTimeString('id-ID', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

const createStyles = (colors: any, fonts: any) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.text,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: fonts.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    formContainer: {
        marginBottom: 20,
    },
    formCard: {
        backgroundColor: colors.background || '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 0.5,
        borderColor: colors.border || '#e8e8e8',
        gap: 16,
    },
    datePickerContainer: {
        marginBottom: 4,
    },
    filterButton: {
        marginTop: 8,
    },
    dataContainer: {
        marginTop: 20,
        flex: 1,
    },
  
    dataItem: {
        backgroundColor: colors.background || '#FFFFFF',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 0.5,
        borderColor: colors.border || '#e8e8e8',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.border || '#f0f0f0',
    },
    itemNumber: {
        fontSize: 12,
        fontFamily: fonts.body,
        color: colors.mainButton,
        fontWeight: 'bold',
        backgroundColor: `${colors.mainButton}15`,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    itemDate: {
        fontSize: 14,
        fontFamily: fonts.body,
        color: colors.text,
        fontWeight: '600',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    timeIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    timeIconLeave: {
        backgroundColor: '#FF9800',
    },
    timeIconText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    timeLabel: {
        fontSize: 12,
        fontFamily: fonts.body,
        color: colors.textSecondary,
        marginBottom: 2,
    },
    timeValue: {
        fontSize: 16,
        fontFamily: fonts.body,
        color: colors.text,
        fontWeight: 'bold',
    },
    timeSeparator: {
        width: 2,
        height: 20,
        backgroundColor: colors.border || '#e0e0e0',
        marginHorizontal: 16,
    },
})