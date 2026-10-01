import DateTimePicker from "@/components/DateTimePicker";
import Dropdownv2 from "@/components/Dropdownv2";
import { RadioGroup } from "@/components/Radio";
import TextInput from "@/components/TextInput";
import { useTheme } from "@/context/ThemeContext";
import { PtkFormData } from "@/schema/ptk";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SectionProps {
  control: Control<PtkFormData>;
}

const SectionAnak = ({ control }: SectionProps) => {
  const { colors } = useTheme();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
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
              Anak #{index + 1}
            </Text>
            <TouchableOpacity onPress={() => remove(index)}>
              <Ionicons name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
          </View>
          <Controller
            control={control}
            name={`children.${index}.name`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Nama Anak"
                placeholder="Masukkan nama anak"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name={`children.${index}.level`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Jenjang Pendidikan"
                placeholder="Masukkan jenjang"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />

          <Controller
            control={control}
            name={`children.${index}.gender`}
            render={({ field: { onChange, value } }) => (
              <Dropdownv2
                label="Jenis Kelamin"
                options={[
                  { label: "Laki-laki", value: "Laki-laki" },
                  { label: "Perempuan", value: "Perempuan" },
                ]}
                selectedValue={value || ""}
                onValueChange={onChange}
                placeholder="Pilih jenis kelamin"
              />
            )}
          />
          <Controller
            control={control}
            name={`children.${index}.place_of_birth`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Tempat Lahir"
                placeholder="Masukkan tempat lahir"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name={`children.${index}.date_of_birth`}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                value={value}
                label="Tanggal Lahir"
                onDateChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={`children.${index}.is_institution_abuhur`}
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                label="Apakah anak bersekolah di Abuhur?"
                options={[
                  { label: "Ya", value: true },
                  { label: "Tidak", value: false },
                ]}
                selectedValue={value ?? null}
                onValueChange={onChange}
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
          Tambah Anak
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

export default SectionAnak;
