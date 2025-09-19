
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import Button from "../components/button";


import Logo from "../components/logo";
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

    const handleLogin = async (data:FormData) => {
        showLoading();
        console.log("---")
        console.log(data.userName)
        console.log(data.password)
        console.log("---")

        // // Simulate API call with 2 second delay
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
                <View style={styles.logoContainer}>
                <Logo/>
                <Text style={styles.heading}>Redagsi</Text>
                </View>

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
                />
              )}
              />
              {errors.password && <View style={styles.messageContainer}><Text style={styles.messageError}>{errors.password.message}</Text></View>}
               
                
                <Button
                    title="Login"
                    onPress={handleSubmit(handleLogin)}
                    backgroundColor={colors.mainButton}
                    textColor="#FFFFFF"
                    style={{ marginTop: 30 }}
                />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const createStyles = (colors: any, fonts: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors?.background || '#f9f9f9'
    },
    logoContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    heading: {
        color: colors?.text || '#1c1c1c',
        fontFamily: fonts?.heading || 'System',
        fontSize: 24,
        marginBottom: 20,
        marginTop: 12,
    },
    bodyText: {
        color: colors?.text || '#1c1c1c',
        fontFamily: fonts?.body || 'System',
        fontSize: 16,
        marginBottom: 10
    },
    timeText: {
        color: colors?.text || '#1c1c1c',
        fontFamily: fonts?.mono || 'System',
        fontSize: 14,
        marginTop: 20
    },
    messageContainer:{
        width:"100%",
        paddingHorizontal:20,
       
    },
    formLogin:{
        justifyContent:"center",
        alignItems:"center",
    },
    messageError:{
        color:"red",
        
    }
});


