import DateTimePicker from "@/components/DateTimePicker";
import Dropdownv2 from "@/components/Dropdownv2";
import TextInput from "@/components/TextInput";
import { useTheme } from "@/context/ThemeContext";
import useGetEmployeeStatus from "@/hooks/get/use-get-employee-status";
import { PtkFormData } from "@/schema/ptk";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SectionProps {
  control: Control<PtkFormData>;
}

const SectionKarir = ({ control }: SectionProps) => {
  const { colors } = useTheme();
  const { employeeStatuses, isLoading: isLoadingStatus } =
    useGetEmployeeStatus();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "career",
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
              Riwayat Status #{index + 1}
            </Text>
            <TouchableOpacity onPress={() => remove(index)}>
              <Ionicons name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
          </View>

          <Controller
            control={control}
            name={`career.${index}.enrollment_date`}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                value={value}
                label="TMT Pengangkatan"
                onDateChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name={`career.${index}.employment_status`}
            render={({ field: { onChange, value } }) => (
              <Dropdownv2
                label="Status Kepegawaian"
                options={employeeStatuses}
                selectedValue={value || ""}
                onValueChange={onChange}
                placeholder={
                  isLoadingStatus ? "Memuat..." : "Pilih status kepegawaian"
                }
              />
            )}
          />
          <Controller
            control={control}
            name={`career.${index}.sk_number`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Nomor SK"
                placeholder="Masukkan nomor SK"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name={`career.${index}.sk_url`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="URL SK"
                placeholder="Masukkan URL SK"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
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
          Tambah Riwayat Status
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

export default SectionKarir;
