import DropdownSearch from "@/components/DropdownSearch";
import Dropdownv2 from "@/components/Dropdownv2";
import { RadioGroup } from "@/components/Radio";
import TextInput from "@/components/TextInput";
import useGetDegree from "@/hooks/get/use-get-degree";
import useGetEmployeeStatus from "@/hooks/get/use-get-employee-status";
import useGetInstitution from "@/hooks/get/use-get-institution";
import useGetMajor from "@/hooks/get/use-get-major";
import useGetMarital from "@/hooks/get/use-get-marital";
import { PtkFormData } from "@/schema/ptk";
import React from "react";
import { Control, Controller, useFormState } from "react-hook-form";
import { StyleSheet, View } from "react-native";

interface SectionProps {
  control: Control<PtkFormData>;
}

const SectionGtk = ({ control }: SectionProps) => {
  const { errors } = useFormState({
    control,
  });
  const { institutions, isLoading: isLoadingInstitution } = useGetInstitution();
  const { degrees, isLoading: isLoadingDegree } = useGetDegree();
  const { maritalStatuses, isLoading: isLoadingMarital } = useGetMarital();
  const { employeeStatuses, isLoading: isLoadingStatus } =
    useGetEmployeeStatus();
  const { majors, isLoading: isLoadingMajor } = useGetMajor();

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="employee_detail.institution"
        render={({ field: { onChange, value } }) => (
          <DropdownSearch
            label="Lembaga"
            options={institutions}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder={isLoadingInstitution ? "Memuat..." : "Pilih lembaga"}
            error={errors.employee_detail?.institution?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="employee_detail.years_of_service"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Masa Kerja (Tahun)"
            placeholder="Masukkan masa kerja"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee_detail?.years_of_service?.message}
            style={styles.input}
            keyboardType="numeric"
          />
        )}
      />
      <Controller
        control={control}
        name="employee_detail.degree"
        render={({ field: { onChange, value } }) => (
          <Dropdownv2
            label="Gelar"
            options={degrees}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder={isLoadingDegree ? "Memuat..." : "Pilih gelar"}
            error={errors.employee_detail?.degree?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="employee_detail.marital"
        render={({ field: { onChange, value } }) => (
          <Dropdownv2
            label="Status Perkawinan"
            options={maritalStatuses}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder={isLoadingMarital ? "Memuat..." : "Pilih status"}
            error={errors.employee_detail?.marital?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="employee_detail.employment_status"
        render={({ field: { onChange, value } }) => (
          <Dropdownv2
            label="Status Kepegawaian"
            options={employeeStatuses}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder={isLoadingStatus ? "Memuat..." : "Pilih status"}
            error={errors.employee_detail?.employment_status?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="employee_detail.major"
        render={({ field: { onChange, value } }) => (
          <Dropdownv2
            label="Jurusan"
            options={majors}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder={isLoadingMajor ? "Memuat..." : "Pilih jurusan"}
            error={errors.employee_detail?.major?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="employee_detail.is_active"
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            label="Status Aktif"
            options={[
              { label: "Ya", value: true },
              { label: "Tidak", value: false },
            ]}
            selectedValue={value ?? null}
            onValueChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="employee_detail.is_teacher"
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            label="Guru"
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

export default SectionGtk;