import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Absensi(){
    const { colors, fonts } = useTheme();
    const [currentTime, setCurrentTime] = useState(new Date());
    const styles = createStyles(colors, fonts);

    // Animation values
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Continuous pulse animation
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );

        pulseAnimation.start();

        return () => {
            pulseAnimation.stop();
        };
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            // Fade animation on time change
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.7,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();

            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, [fadeAnim]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('id-ID', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return(
        <View style={styles.container}>
            <View style={styles.clockContainer}>
                <Animated.View 
                    style={[
                        styles.clockCircle,
                        {
                            transform: [{ scale: pulseAnim }]
                        }
                    ]}
                >
                    <Animated.Text style={[styles.timeText, { opacity: fadeAnim }]}>
                        {formatTime(currentTime)}
                    </Animated.Text>
                    <Animated.Text style={[styles.dateText, { opacity: fadeAnim }]}>
                        {formatDate(currentTime)}
                    </Animated.Text>
                </Animated.View>
            </View>
        </View>
    )
}

const createStyles = (colors: any, fonts: any) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors?.background || '#f5f5f5',
    },
    clockContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    clockCircle: {
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: colors?.mainButton || '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 12,
        borderWidth: 3,
        borderColor: "#1B3C53",
    },
    timeText: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: fonts?.heading || 'System',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 1,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: fonts?.body || 'System',
        color: '#ffffff',
        textAlign: 'center',
        opacity: 0.8,
    },
});