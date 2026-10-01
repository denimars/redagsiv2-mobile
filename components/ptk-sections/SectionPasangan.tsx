import TextInput from "@/components/TextInput";
import useGetIncome from "@/hooks/get/use-get-income";
import useGetOccupation from "@/hooks/get/use-get-occupation";
import { PtkFormData } from "@/schema/ptk";
import React from "react";
import { Control, Controller, useFormState } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import DropdownSearch from "../DropdownSearch";

interface SectionProps {
  control: Control<PtkFormData>;
}

const SectionPasangan = ({ control }: SectionProps) => {
  const { errors } = useFormState({
    control,
  });
  const { occupations, isLoading: isLoadingOcc } = useGetOccupation();
  const { incomes, isLoading: isLoadingInc } = useGetIncome();
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="spouse.name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nama Pasangan"
            placeholder="Masukkan nama pasangan"
            value={value || ""}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name="spouse.occupation"
        render={({ field: { onChange, value } }) => (
          <DropdownSearch
            label="Pekerjaan"
            options={occupations}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder={isLoadingOcc ? "Memuat..." : "Pilih pekerjaan"}
            error={errors.spouse?.occupation?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="spouse.income"
        render={({ field: { onChange, value } }) => (
          <DropdownSearch
            label="Penghasilan"
            options={incomes}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder={isLoadingInc ? "Memuat..." : "Pilih penghasilan"}
            error={errors.spouse?.income?.message}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
});

export default SectionPasangan;
