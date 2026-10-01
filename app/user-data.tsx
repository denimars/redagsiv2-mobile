import Button from "@/components/button";
import TextInput from "@/components/TextInput";
import { useTheme } from "@/context/ThemeContext";
import useGetEmployeeMobile from "@/hooks/get/use-get-profile";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserDataScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();
  const styles = createStyles(colors, fonts);

  const { EmployeeMobile } = useGetEmployeeMobile();

  const [formData, setFormData] = useState({
    name: "",
    nupy: "",
    email: "",
    phone: "",
    address: "",
  });

  const [profileLoaded, setProfileLoaded] = useState<object | null>(null);
  if (EmployeeMobile && profileLoaded !== EmployeeMobile) {
    setProfileLoaded(EmployeeMobile);
    setFormData((prev) => ({
      ...prev,
      name: EmployeeMobile.employee_hub?.employee?.name ?? "",
      nupy: EmployeeMobile.employee_hub?.employee?.nupy ?? "",
    }));
  }

  const handleSave = () => {
    // Logic to save data would go here
    router.back();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data User</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoSection}>
          <Text style={styles.sectionDescription}>
            Lengkapi data diri Anda untuk keperluan administrasi dan layanan
            aplikasi.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            style={styles.input}
          />

          <TextInput
            label="NUPY"
            placeholder="Masukkan NUPY"
            value={formData.nupy}
            onChangeText={(text) => setFormData({ ...formData, nupy: text })}
            style={styles.input}
            disabled={true}
          />

          <TextInput
            label="Email"
            placeholder="Masukkan alamat email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            label="No. WhatsApp"
            placeholder="Contoh: 08123456789"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TextInput
            label="Alamat"
            placeholder="Masukkan alamat domisili"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            style={styles.input}
          />

          <Button
            title="Simpan Perubahan"
            onPress={handleSave}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any, fonts: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontFamily: fonts.heading,
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.card,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },
    infoSection: {
      marginBottom: 24,
      paddingHorizontal: 4,
    },
    sectionDescription: {
      fontFamily: fonts.body,
      fontSize: 14,
      color: colors.secondary,
      lineHeight: 20,
    },
    formContainer: {
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
    },
    input: {
      width: "100%",
      marginBottom: 16,
    },
    submitButton: {
      marginTop: 10,
      borderRadius: 12,
    },
  });
