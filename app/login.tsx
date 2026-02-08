import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { z } from "zod";
import Button from "../components/button";
import { useLogin } from "../hooks/useLogin";

import TextInput from "../components/TextInput";
import { useLoading } from "../context/LoadingContext";
import { useTheme } from "../context/ThemeContext";

const loginSchema = z.object({
  userName: z
    .string()
    .min(1, "Username wajib diisi")
    .min(3, "Username minimal 3 karakter"),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});

type FormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { colors, fonts } = useTheme();
  const { showLoading, hideLoading } = useLoading();
  const styles = createStyles(colors, fonts);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const { login, isPending, isError, message } = useLogin();

  useEffect(() => {
    if (isPending) {
      showLoading();
    } else {
      hideLoading();
    }

    // Clean up loading state when component unmounts
    return () => hideLoading();
  }, [hideLoading, isPending, showLoading]);

  const handleLogin = async (data: FormData) => {
    login({
      username: data.userName,
      password: data.password,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/masjid-jamik.png")}
          contentFit="cover"
          style={styles.heroImage}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.overlay}
        />
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/images/abuhur-logo.webp")}
            contentFit="contain"
            style={styles.logo}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.innerContent}>
          <View style={styles.headerSection}>
            <Text style={styles.heading}>Redagsi</Text>
            <Text style={styles.subHeading}>
              Silakan masuk untuk melanjutkan
            </Text>
          </View>

          {isError && (
            <View style={styles.errorBanner}>
              <Text style={styles.messageErrorText}>{message}</Text>
            </View>
          )}

          <View style={styles.formLogin}>
            <View>
              <Controller
                control={control}
                name="userName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Username"
                    placeholder="Masukkan username Anda"
                    value={value}
                    onChangeText={onChange}
                    style={styles.textInput}
                  />
                )}
              />
              {errors.userName && (
                <Text style={styles.fieldError}>{errors.userName.message}</Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Password"
                    placeholder="Masukkan password Anda"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={true}
                    style={styles.textInput}
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.fieldError}>{errors.password.message}</Text>
              )}
            </View>

            <Button
              title={"Login"}
              onPress={handleSubmit(handleLogin)}
              backgroundColor={colors.mainButton}
              textColor="#FFFFFF"
              style={styles.loginButton}
              disabled={isPending}
              loading={isPending}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// const { height: screenHeight } = Dimensions.get("window");

const createStyles = (colors: any, fonts: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors?.background || "#f9f9f9",
    },
    imageContainer: {
      height: "40%",
      width: "100%",
      overflow: "hidden",
    },
    heroImage: {
      width: "100%",
      height: "100%",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    logoWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 120,
      height: 120,
    },
    contentContainer: {
      backgroundColor: colors?.background || "#f9f9f9",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: -40,
      height: "75%",
    },
    innerContent: {
      flex: 1,
      paddingHorizontal: 35,
      paddingBottom: 40,
      justifyContent: "center",
    },
    headerSection: {
      marginBottom: 35,
      alignItems: "center",
    },
    heading: {
      color: colors?.text || "#1c1c1c",
      fontFamily: fonts?.heading || "System",
      fontSize: 34,
      fontWeight: "bold",
      letterSpacing: 0.5,
      lineHeight: 40,
    },
    subHeading: {
      color: colors?.secondary || "#6b7280",
      fontFamily: fonts?.body || "System",
      fontSize: 16,
      marginTop: 8,
      lineHeight: 24,
    },
    formLogin: {
      width: "100%",
      gap: 20,
    },
    errorBanner: {
      backgroundColor: "#fee2e2",
      padding: 12,
      borderRadius: 8,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#fecaca",
    },
    messageErrorText: {
      color: "#dc2626",
      fontSize: 15,
      textAlign: "center",
      fontFamily: fonts?.body || "System",
      lineHeight: 22,
    },
    fieldError: {
      color: "#dc2626",
      fontSize: 12,
      marginTop: 4,
      fontFamily: fonts?.body || "System",
    },
    textInput: {
      width: "100%",
      marginVertical: 0,
    },
    loginButton: {
      width: "100%",
      marginTop: 10,
      borderRadius: 12,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  });
