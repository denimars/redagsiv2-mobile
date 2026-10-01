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

const SectionPelatihan = ({ control }: SectionProps) => {
  const { colors } = useTheme();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "training",
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
              Pelatihan #{index + 1}
            </Text>
            <TouchableOpacity onPress={() => remove(index)}>
              <Ionicons name="trash-outline" size={20} color="#ff4444" />
            </TouchableOpacity>
          </View>

          <Controller
            control={control}
            name={`training.${index}.field`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Bidang"
                placeholder="Masukkan bidang pelatihan"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name={`training.${index}.name`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Nama Pelatihan"
                placeholder="Masukkan nama pelatihan"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name={`training.${index}.organizer`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Penyelenggara"
                placeholder="Masukkan penyelenggara"
                value={value || ""}
                onChangeText={onChange}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name={`training.${index}.year`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Tahun"
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
          Tambah Pelatihan
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

export default SectionPelatihan;
