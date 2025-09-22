
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import Button from "../components/button";
import { useLogin } from "../hooks/useLogin";


import TextInput from "../components/TextInput";
import { useLoading } from "../context/LoadingContext";
import { useTheme } from "../context/ThemeContext";

const loginSchema = z.object({
    userName : z.string()
    .min(1, "Username wajib diisi")
    .min(3, "Username minimal 3 karakter"),
    password: z.string()
    .min(1, "Password wajib diisi")
    .min(6, "Password minimal 6 karakter")
})

type FormData = z.infer<typeof loginSchema>;

export default function Login(){
    const { colors, fonts } = useTheme();
    const { showLoading, hideLoading } = useLoading();
    const styles = createStyles(colors, fonts);
   
    const {control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userName: '',
            password: ''
        }
    })

    const {login, isLoading, loginError} = useLogin();

    const handleLogin = async (data:FormData) => {
        showLoading();
        try {
            await login(data.userName, data.password);
           
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            hideLoading();
        }
    };

    return (  
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/masjid-jamik.png')} contentFit="cover" style={styles.heroImage}/>
                <View style={styles.overlay} />
            </View>
            
            <KeyboardAvoidingView 
                style={styles.contentContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.heading}>Redagsi</Text>
                    {loginError && <Text style={styles.messageError}>{loginError}</Text>}
                    
                    <View style={styles.formLogin}>
                     
     
               <Controller 
               control={control}
               name="userName"
               render={({field:{onChange, value}}) => (
                <TextInput
                label="Username"
                placeholder="Username"
                value={value}
                onChangeText={onChange}
                style={styles.textInput}
                />
               )}
               />
               {errors.userName && <View style={styles.messageContainer}><Text style={styles.messageError}>{errors.userName.message}</Text></View>}
            <Controller 
               control={control}
               name="password"
               render={({field:{onChange, value}}) => (
                <TextInput
                    label="Password"
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={true}
                    style={styles.textInput}
                />
              )}
              />
              {errors.password && <View style={styles.messageContainer}><Text style={styles.messageError}>{errors.password.message}</Text></View>}                
                <Button
                    title={ "Login"}
                    onPress={handleSubmit(handleLogin)}
                    backgroundColor={colors.mainButton}
                    textColor="#FFFFFF"
                    style={{  width:"100%" }}
                    disabled={isLoading}
                />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const { height: screenHeight } = Dimensions.get('window');

const createStyles = (colors: any, fonts: any) => StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors?.background || '#f0f0f0'
    
    },
    imageContainer: {
        height: screenHeight * 0.40,
        width: '100%',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: colors?.background || '#f0f0f0',
        
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
    },
    scrollContent: {
        flexGrow: 1,
        paddingTop: 20,
        paddingHorizontal: 30,
    },
    heading: {
        color: '#333',
        fontFamily: fonts?.heading || 'System',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    messageContainer:{
        width:"100%",
        alignSelf: 'center',
    },
    formLogin: {
      
        width: '100%',
        alignSelf: 'center',
        gap: 20,
    },
    messageError:{
        color:"red",
        fontSize: 12,
    },
    textInput: {
        marginBottom: -10,
        width: '100%',
    }
});


