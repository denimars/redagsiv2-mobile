
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
}

export default function Button({
    title,
    onPress,
    backgroundColor,
    textColor,
    style,
    textStyle,
    disabled = false,
    variant = 'primary',
    loading = false
}: ButtonProps) {
    const { colors, fonts } = useTheme();

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: backgroundColor || colors.mainButton,
                    borderColor: backgroundColor || colors.mainButton,
                };
            case 'secondary':
                return {
                    backgroundColor: backgroundColor || colors.secondary,
                    borderColor: backgroundColor || colors.secondary,
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderColor: backgroundColor || colors.mainButton,
                    borderWidth: 2,
                };
            default:
                return {
                    backgroundColor: backgroundColor || colors.mainButton,
                    borderColor: backgroundColor || colors.mainButton,
                };
        }
    };

    const getTextColor = () => {
        if (textColor) return textColor;
        return variant === 'outline' ? colors.mainButton : '#FFFFFF';
    };

    const variantStyles = getVariantStyles();

    return (
        <TouchableOpacity
            style={[
                styles.button,
                variantStyles,
                style,
                (disabled || loading) && styles.disabled
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator 
                    size="small" 
                    color={getTextColor()} 
                />
            ) : (
                <Text style={[
                    styles.buttonText,
                    { 
                        color: getTextColor(),
                        fontFamily: fonts.button 
                    },
                    textStyle
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    disabled: {
        opacity: 0.5,
    },
});


