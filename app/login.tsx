
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from "react-native";
import Button from "../components/button";
import Logo from "../components/logo";
import TextInput from "../components/TextInput";
import { useTheme } from "../context/ThemeContext";

export default function Login(){
    const { colors, fonts } = useTheme();
    const styles = createStyles(colors, fonts);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login attempt:', { username, password });
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
                <Text style={styles.heading}>Login</Text>
                <Text style={styles.bodyText}>Welcome back! Please sign in to continue.</Text>
                
                <TextInput
                    label="Username"
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                    style={{ marginTop: 20 }}
                />
                
                <TextInput
                    label="Password"
                    placeholder="Enter your password"
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
        marginBottom: 20
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


