import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput as RNTextInput, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface TextInputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    style?: ViewStyle;
    inputStyle?: TextStyle;
    labelStyle?: TextStyle;
    disabled?: boolean;
}

export default function TextInput({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    style,
    inputStyle,
    labelStyle,
    disabled = false
}: TextInputProps) {
    const { colors, fonts } = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    console.log('TextInput colors.mainButton:', colors.mainButton);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={[styles.container, style]}>
            {label && (
                <Text style={[
                    styles.label,
                    { 
                        color: colors.text,
                        fontFamily: fonts.body 
                    },
                    labelStyle
                ]}>
                    {label}
                </Text>
            )}
            <View style={styles.inputContainer}>
                <RNTextInput
                    style={[
                        styles.input,
                        {
                            borderBottomColor: colors.mainButton,
                            borderBottomWidth: 1, // ensure border width
                            backgroundColor: 'transparent',
                            color: colors.text,
                            fontFamily: fonts.body
                        },
                        secureTextEntry && styles.inputWithIcon,
                        inputStyle,
                        disabled && styles.disabled
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={colors.secondary}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    editable={!disabled}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={togglePasswordVisibility}
                        disabled={disabled}
                    >
                        <Ionicons
                            name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                            size={20}
                            color={colors.mainButton}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        fontWeight: '500',
    },
    inputContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'transparent', // akan di-override oleh style inline
        paddingHorizontal: 0,
        paddingVertical: 12,
        fontSize: 16,
    },
    inputWithIcon: {
        paddingRight: 40,
    },
    eyeIcon: {
        position: 'absolute',
        right: 0,
        bottom: 12,
        padding: 4,
    },
    disabled: {
        opacity: 0.6,
    },
});