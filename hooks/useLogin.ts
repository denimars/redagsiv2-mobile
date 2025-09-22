import { router } from "expo-router";
import { useState } from "react";

export const useLogin = ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string| null>('');

    const login = async(userName: string, password: string) =>{
        setIsLoading(true);
        setLoginError(null);
        try{
            //simulate api call delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            if (userName==='admin' && password==='123456'){
                console.log("Login Berhasil");
                router.replace("/(tabs)");
            }else{
                setLoginError("Username atau password salah")
            }

        }catch(error){
            setLoginError("Terjadi kesalahan")
        }finally{
            setIsLoading(false)
        }

    };
    const clearError = ()=>{
        setLoginError(null)
    }
        
    return{
        login,
        isLoading,
        loginError,
        clearError
    }
}