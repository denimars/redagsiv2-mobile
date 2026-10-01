import DropdownSearch from "@/components/DropdownSearch";
import useGetLessons from "@/hooks/get/use-get-lessons";
import { PtkFormData } from "@/schema/ptk";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Control, Controller, useFieldArray, useWatch } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

interface SectionProps {
  control: Control<PtkFormData>;
}

const SectionEmployeeLesson = ({ control }: SectionProps) => {
  const { colors } = useTheme();
  const { lessons, isLoading } = useGetLessons();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "employee_lesson",
  });

  const isTeacher = useWatch({ control, name: "employee_detail.is_teacher" });

  if (!isTeacher) {
    return (
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: "#EAB308" + "10",
            borderColor: "#EAB308",
            paddingVertical: 48,
          },
        ]}
        disabled
        activeOpacity={1}
      >
        <Ionicons name="alert-circle-outline" size={20} color="#EAB308" />
        <Text style={[styles.addButtonText, { color: "#EAB308" }]}>
          Hanya untuk Guru
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {fields.map((item, index) => (
        <View
          key={item.id}
          style={[styles.card, { borderColor: colors.border }]}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Mata Pelajaran #{index + 1}
            </Text>
            <TouchableOpacity onPress={() => remove(index)}>
              <Ionicons name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
          </View>

          <Controller
            control={control}
            name={`employee_lesson.${index}.lesson`}
            render={({ field: { onChange, value } }) => (
              <DropdownSearch
                label="Mata Pelajaran"
                options={lessons}
                selectedValue={value || ""}
                onValueChange={onChange}
                placeholder={isLoading ? "Memuat..." : "Pilih mata pelajaran"}
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
          Tambah Mata Pelajaran
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

export default SectionEmployeeLesson;
