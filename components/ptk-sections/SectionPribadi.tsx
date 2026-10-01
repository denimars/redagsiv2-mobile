import DateTimePicker from "@/components/DateTimePicker";
import Dropdownv2 from "@/components/Dropdownv2";
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

const SectionPribadi = ({ control }: SectionProps) => {
  const { errors } = useFormState({
    control,
  });
  const watchProvinsi = useWatch({
    control,
    name: "employee.province",
  });
  const watchKabKota = useWatch({
    control,
    name: "employee.regency",
  });

  const { provinces, isLoading: isLoadingProv } = useGetProvinces();
  const { regencies, isLoading: isLoadingReg } = useGetRegencies(
    watchProvinsi as string,
  );
  const { districts, isLoading: isLoadingDist } = useGetDistricts(
    watchKabKota as string,
  );

  console.log(errors, "nama error");

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="employee.name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee?.name?.message}
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="employee.kk_number"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nomor KK"
            placeholder="Masukkan nomor KK"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee?.kk_number?.message}
            style={styles.input}
            keyboardType="numeric"
          />
        )}
      />
      <Controller
        control={control}
        name="employee.nik"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="NIK"
            placeholder="Masukkan NIK"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee?.nik?.message}
            style={styles.input}
            keyboardType="numeric"
          />
        )}
      />
      <Controller
        control={control}
        name="employee.gender"
        render={({ field: { onChange, value } }) => (
          <Dropdownv2
            label="Jenis Kelamin"
            options={[
              { label: "Laki-laki", value: "Laki-laki" },
              { label: "Perempuan", value: "Perempuan" },
            ]}
            selectedValue={value}
            onValueChange={onChange}
            error={errors.employee?.gender?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="employee.place_of_birth"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Tempat Lahir"
            placeholder="Masukkan tempat lahir"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee?.place_of_birth?.message}
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="employee.date_of_birth"
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            label="Tanggal Lahir"
            value={value}
            onDateChange={onChange}
            error={errors.employee?.date_of_birth?.message}
          />
        )}
      />
      {/* <Controller
        control={control}
        name="employee.mother_name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nama Ibu Kandung"
            placeholder="Masukkan nama ibu kandung"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee?.mother_name?.message}
            style={styles.input}
          />
        )}
      /> */}
      <Controller
        control={control}
        name="employee.blood_type"
        render={({ field: { onChange, value } }) => (
          <Dropdownv2
            label="Golongan Darah"
            options={[
              { label: "A", value: "A" },
              { label: "B", value: "B" },
              { label: "AB", value: "AB" },
              { label: "O", value: "O" },
            ]}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder="Pilih golongan darah"
            error={errors.employee?.blood_type?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="employee.address"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Alamat"
            placeholder="Masukkan alamat sesuai KTP"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee?.address?.message}
            style={styles.input}
          />
        )}
      />
      <View style={styles.row}>
        <Controller
          control={control}
          name="employee.rt"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="RT"
              placeholder="000"
              value={value || ""}
              onChangeText={onChange}
              error={errors.employee?.rt?.message}
              style={[styles.input, { flex: 1 }]}
            />
          )}
        />
        <Controller
          control={control}
          name="employee.rw"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="RW"
              placeholder="000"
              value={value || ""}
              onChangeText={onChange}
              error={errors.employee?.rw?.message}
              style={[styles.input, { flex: 1 }]}
            />
          )}
        />
      </View>
      <Controller
        control={control}
        name="employee.hamlet"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Dusun"
            placeholder="Masukkan dusun"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee?.hamlet?.message}
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="employee.village"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Desa"
            placeholder="Masukkan desa"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee?.village?.message}
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="employee.province"
        render={({ field: { onChange, value } }) => (
          <DropdownSearch
            label="Provinsi"
            options={provinces}
            selectedValue={value || ""}
            onValueChange={onChange}
            placeholder={isLoadingProv ? "Memuat..." : "Pilih provinsi"}
            error={errors.employee?.province?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="employee.regency"
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
            error={errors.employee?.regency?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="employee.district"
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
            error={errors.employee?.district?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="employee.npwp"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="NPWP"
            placeholder="Masukkan NPWP (opsional)"
            value={value || ""}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="employee.phone_number"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nomor HP"
            placeholder="Contoh: 08123456789"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee?.phone_number?.message}
            style={styles.input}
            keyboardType="phone-pad"
          />
        )}
      />
      <Controller
        control={control}
        name="employee.wa_number"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Nomor WA"
            placeholder="Contoh: 08123456789"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee?.wa_number?.message}
            style={styles.input}
            keyboardType="phone-pad"
          />
        )}
      />
      <Controller
        control={control}
        name="employee.email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            placeholder="Masukkan alamat email"
            value={value || ""}
            onChangeText={onChange}
            error={errors.employee?.email?.message}
            style={styles.input}
            keyboardType="email-address"
          />
        )}
      />
      <Controller
        control={control}
        name="employee.nupy"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="NUPY"
            placeholder="Nomor Unit Pendidik Yayasan"
            value={value || ""}
            onChangeText={onChange}
            style={styles.input}
            disabled
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
    gap: 12,
  },
});

export default SectionPribadi;
