import TextInput from "@/components/TextInput";
import { useTheme } from "@/context/ThemeContext";
import useGetDegree from "@/hooks/get/use-get-degree";
import useGetEducation from "@/hooks/get/use-get-education";
import useGetMajor from "@/hooks/get/use-get-major";
import { PtkFormData } from "@/schema/ptk";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropdownSearch from "../DropdownSearch";

interface SectionProps {
  control: Control<PtkFormData>;
}

const SectionPendidikan = ({ control }: SectionProps) => {
  const { colors } = useTheme();

  const { degrees, isLoading: isLoadingDegree } = useGetDegree();
  const { majors, isLoading: isLoadingMajor } = useGetMajor();
  const { educations, isLoading: isLoadingEducation } = useGetEducation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <View style={styles.container}>
      {fields.map((item, index) => (
        <View
          key={item.id}
          style={[styles.card, { borderColor: colors.border }]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Pendidikan #{index + 1}
            </Text>
            <TouchableOpacity onPress={() => remove(index)}>
              <Ionicons name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
          </View>

          <Controller
            control={control}
            name={`education.${index}.education`}
            render={({ field: { onChange, value } }) => (
              <DropdownSearch
                label="Pendidikan"
                options={educations}
                selectedValue={value || ""}
                onValueChange={onChange}
                placeholder={
                  isLoadingEducation ? "Memuat..." : "Pilih Pendidikan"
                }
              />
            )}
          />

          <Controller
            control={control}
            name={`education.${index}.major`}
            render={({ field: { onChange, value } }) => (
              <DropdownSearch
                label="Jurusan"
                options={majors}
                selectedValue={value || ""}
                onValueChange={onChange}
                placeholder={isLoadingMajor ? "Memuat..." : "Pilih Jenjang"}
              />
            )}
          />
          <Controller
            control={control}
            name={`education.${index}.faculty`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Fakultas"
                placeholder="Masukkan fakultas"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name={`education.${index}.institution`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Lembaga Pendidikan"
                placeholder="Contoh: Universitas Gadjah Mada"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name={`education.${index}.degree`}
            render={({ field: { onChange, value } }) => (
              <DropdownSearch
                label="Gelar Akademik"
                options={degrees}
                selectedValue={value || ""}
                onValueChange={onChange}
                placeholder={
                  isLoadingDegree ? "Memuat..." : "Pilih Gelar Akademik"
                }
              />
            )}
          />
          <Controller
            control={control}
            name={`education.${index}.entry_year`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Tahun Masuk"
                placeholder="YYYY"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
                keyboardType="numeric"
              />
            )}
          />
          <Controller
            control={control}
            name={`education.${index}.graduation_year`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Tahun Lulus"
                placeholder="YYYY"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
                keyboardType="numeric"
              />
            )}
          />
        </View>
      ))}

      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: colors.mainButton + "10",
            borderColor: colors.mainButton,
          },
        ]}
        onPress={() => append({})}
      >
        <Ionicons
          name="add-circle-outline"
          size={20}
          color={colors.mainButton}
        />
        <Text style={[styles.addButtonText, { color: colors.mainButton }]}>
          Tambah Pendidikan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    marginTop: 10,
  },
  addButtonText: {
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default SectionPendidikan;
