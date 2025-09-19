
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";
import Button from "../components/button";
import Logo from "../components/logo";
import TextInput from "../components/TextInput";
import { useLoading } from "../context/LoadingContext";
import { useTheme } from "../context/ThemeContext";

export default function Login(){
    const { colors, fonts } = useTheme();
    const { showLoading, hideLoading } = useLoading();
    const styles = createStyles(colors, fonts);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        showLoading();
        console.log('Login attempt:', { username, password });
        
        // Simulate API call with 2 second delay
        setTimeout(() => {
            hideLoading();
            console.log('Login completed');
        }, 2000);
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
            >
                <Logo/>
                <Text style={styles.heading}>Redagsi</Text>
                
                <TextInput
                    label="Username"
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={{ marginTop: 20 }}
                />
                
                <TextInput
                    label="Password"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                
                <Button
                    title="Login"
                    onPress={handleLogin}
                    backgroundColor={colors.mainButton}
                    textColor="#FFFFFF"
                    style={{ marginTop: 30 }}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const createStyles = (colors: any, fonts: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    heading: {
        color: colors.text,
        fontFamily: fonts.heading,
        fontSize: 24,
        marginBottom: 20,
        marginTop: 12,
    },
    bodyText: {
        color: colors.text,
        fontFamily: fonts.body,
        fontSize: 16,
        marginBottom: 10
    },
    timeText: {
        color: colors.text,
        fontFamily: fonts.mono,
        fontSize: 14,
        marginTop: 20
    },
});


