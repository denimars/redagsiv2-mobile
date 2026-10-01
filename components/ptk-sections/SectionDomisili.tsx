import TextInput from "@/components/TextInput";
import useGetDistricts from "@/hooks/get/use-get-districts";
import useGetProvinces from "@/hooks/get/use-get-provinces";
import useGetRegencies from "@/hooks/get/use-get-regencies";
import { PtkFormData } from "@/schema/ptk";
import React from "react";
import { Control, Controller, useFormState, useWatch } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import DropdownSearch from "../DropdownSearch";

interface SectionProps {
  control: Control<PtkFormData>;
}

const SectionDomisili = ({ control }: SectionProps) => {
  const { errors } = useFormState({
    control,
  });
  const watchProvinsi = useWatch({
    control,
    name: "residance.province",
  });
  const watchKabKota = useWatch({
    control,
    name: "residance.regency",
  });

  const { provinces, isLoading: isLoadingProv } = useGetProvinces();
  const { regencies, isLoading: isLoadingReg } = useGetRegencies(
    watchProvinsi as string,
  );
  const { districts, isLoading: isLoadingDist } = useGetDistricts(
    watchKabKota as string,
  );
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="residance.address"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nama Jalan"
            placeholder="Masukkan nama jalan"
            value={value || ""}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />
      <View style={styles.row}>
        <Controller
          control={control}
          name="residance.rt"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="RT"
              placeholder="000"
              value={value || ""}
              onChangeText={onChange}
              style={[styles.input, { flex: 1 }]}
            />
          )}
        />
        <Controller
          control={control}
          name="residance.rw"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="RW"
              placeholder="000"
              value={value || ""}
              onChangeText={onChange}
              style={[styles.input, { flex: 1 }]}
            />
          )}
        />
      </View>

      <Controller
        control={control}
        name="residance.hamlet"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Dusun"
            placeholder="Masukkan dusun"
            value={value || ""}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="residance.province"
        render={({ field: { onChange, value } }) => (
          <DropdownSearch
            label="Provinsi"
            options={provinces}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder={isLoadingProv ? "Memuat..." : "Pilih provinsi"}
            error={errors.residance?.province?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="residance.regency"
        render={({ field: { onChange, value } }) => (
          <DropdownSearch
            label="Kab/Kota"
            options={regencies}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder={
              !watchProvinsi
                ? "Pilih provinsi dahulu"
                : isLoadingReg
                  ? "Memuat..."
                  : "Pilih kabupaten/kota"
            }
            error={errors.residance?.regency?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="residance.district"
        render={({ field: { onChange, value } }) => (
          <DropdownSearch
            label="Kecamatan"
            options={districts}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder={
              !watchKabKota
                ? "Pilih kabupaten/kota dahulu"
                : isLoadingDist
                  ? "Memuat..."
                  : "Pilih kecamatan"
            }
            error={errors.residance?.district?.message}
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
  row: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
});

export default SectionDomisili;
