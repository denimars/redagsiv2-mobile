import Button from "@/components/button";
import Stepper from "@/components/Stepper";
import { useTheme } from "@/context/ThemeContext";
import { PtkFormData, ptkSchema } from "@/schema/ptk";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Section Components
import SectionAnak from "@/components/ptk-sections/SectionAnak";
import SectionDomisili from "@/components/ptk-sections/SectionDomisili";
import SectionEmployeeLesson from "@/components/ptk-sections/SectionEmployeeLesson";
import SectionGtk from "@/components/ptk-sections/SectionGtk";
import SectionKarir from "@/components/ptk-sections/SectionKarir";
import SectionKompetensi from "@/components/ptk-sections/SectionKompetensi";
import SectionPasangan from "@/components/ptk-sections/SectionPasangan";
import SectionPelatihan from "@/components/ptk-sections/SectionPelatihan";
import SectionPendidikan from "@/components/ptk-sections/SectionPendidikan";
import SectionPribadi from "@/components/ptk-sections/SectionPribadi";
import { useLoading } from "@/context/LoadingContext";
import useGetEmployee, {
  Children,
  Competencies,
  Educations,
  EmployeeHistoricalStatuses,
  TrainingHistories,
} from "@/hooks/get/use-get-employee";
import useUpdateEmployee from "@/hooks/update/use-update-employee";
import { zodResolver } from "@hookform/resolvers/zod";

const toStr = (value: unknown) =>
  value === undefined || value === null ? "" : String(value);

const toValidDate = (value: unknown) => {
  if (!value) return undefined;
  const date = new Date(String(value));
  return isNaN(date.getTime()) ? undefined : date;
};

const STEPS = [
  { name: "Pribadi", title: "Data PTK" },
  { name: "Domisili", title: "Alamat Domisili" },
  { name: "Pasangan", title: "Data Pasangan" },
  {
    name: "Guru atau Tenaga Kependidikan",
    title: "Guru atau Tenaga Kependidikan",
  },
  { name: "Pendidikan", title: "Pendidikan Formal" },
  { name: "Kompetensi", title: "Kompetensi" },
  { name: "Pelatihan", title: "Riwayat Pelatihan" },
  { name: "Riwayat Status Kepegawaian", title: "Riwayat Status Kepegawaian" },
  { name: "Mata Pelajaran", title: "Mata Pelajaran" },
  { name: "Anak", title: "Data Anak" },
];

export default function PtkFormScreen() {
  const { colors, fonts } = useTheme();
  const router = useRouter();
  const styles = createStyles(colors, fonts);
  const [currentStep, setCurrentStep] = useState(1);
  const { showLoading, hideLoading } = useLoading();

  const { control, handleSubmit, trigger, reset } = useForm<PtkFormData>({
    resolver: zodResolver(ptkSchema),
    defaultValues: {
      employee: {
        gender: "Laki-laki",
        // date_of_birth: new Date(),
      },
      education: [{}],
      competency: [{}],
      training: [{}],
      career: [{}],
      employee_lesson: [],
      children: [{}],
    },
  });

  const { data: employee } = useGetEmployee();
  const { handleUpdate, isPending } = useUpdateEmployee(
    () => {
      hideLoading();
      reset();
      setCurrentStep(1);
      Alert.alert("Sukses", "Data berhasil disimpan.");
    },
    () => {
      Alert.alert("Gagal", "Data gagal disimpan.");
      hideLoading();
    },
  );

  useEffect(() => {
    if (isPending) {
      showLoading();
    } else {
      hideLoading();
    }
    return () => hideLoading();
  }, [hideLoading, isPending, showLoading]);

  useEffect(() => {
    if (employee) {
      // console.log(employee);
      reset({
        employee: {
          nik: employee.nik || "",
          nupy: employee.nupy || "",
          name: employee.name || "",
          gender: employee.gender === "L" ? "Laki-laki" : "Perempuan",
          date_of_birth: toValidDate(employee.date_of_birth),
          place_of_birth: employee.place_of_birth || "",
          kk_number: employee.kk_number || "",
          address: employee.address || "",
          rt: employee.rt || "",
          rw: employee.rw || "",
          hamlet: employee.hamlet || "",
          district: employee.district_id || "",
          regency: employee.regency_id || "",
          province: employee.province_id || "",
          wa_number: employee.wa_number || "",
          phone_number: employee.phone_number || "",
          npwp: employee.npwp || "",
          // mother_name: employee.mother_name || "",
          blood_type: employee.blood_type || "",
          email: employee.email || "",
          village: employee.village || "",
        },
        employee_detail: {
          degree: toStr(employee.employee_detail?.degree_id),
          marital: toStr(employee.employee_detail?.marital_status),
          employment_status: toStr(
            employee.employee_detail?.employment_status,
          ),
          major: toStr(employee.employee_detail?.major_id),
          years_of_service: toStr(employee.employee_detail?.years_of_service),
          institution: toStr(employee.employee_detail?.institution_id),
          is_active: employee.employee_detail?.is_active,
          is_teacher: employee.employee_detail?.is_teacher,
        },
        residance: {
          address: employee.residance?.address || "",
          rt: employee.residance?.rt || "",
          rw: employee.residance?.rw || "",
          hamlet: employee.residance?.hamlet || "",
          district: toStr(employee.residance?.district_id),
          regency: toStr(employee.residance?.regency_id),
          province: toStr(employee.residance?.province_id),
        },
        spouse: {
          name: employee.spouse?.name || "",
          occupation: toStr(employee.spouse?.occupation?.id),
          income: toStr(employee.spouse?.income?.id),
        },
        education: employee?.educations
          ? employee?.educations.map((edu: Educations) => ({
              institution: edu.institution,
              degree: toStr(edu.degree?.id),
              major: toStr(edu.major?.id),
              faculty: edu.faculty,
              education: toStr(edu.education?.id),
              entry_year: toStr(edu.entry_year),
              graduation_year: toStr(edu.graduation_year),
            }))
          : [{}],
        competency: employee?.competencies
          ? employee?.competencies.map((comp: Competencies) => ({
              competency: comp.competency,
              score: toStr(comp.score),
            }))
          : [{}],
        training: employee?.traning_histories
          ? employee?.traning_histories.map((training: TrainingHistories) => ({
              name: training.name,
              field: training.field,
              organizer: training.organizer,
              year: toStr(training.year),
            }))
          : [{}],
        employee_lesson: employee?.employee_lesson
          ? employee.employee_lesson.map((lesson) => ({
              lesson: toStr(
                lesson?.lesson_id ??
                  (typeof lesson?.lesson === "string"
                    ? lesson.lesson
                    : lesson?.lesson?.id),
              ),
            }))
          : [],

        children: employee?.children
          ? employee?.children.map((child: Children) => ({
              name: child.name,
              level: child.level,
              gender: child.gender === "L" ? "Laki-laki" : "Perempuan",
              place_of_birth: child.place_of_birth,
              date_of_birth: toValidDate(child.date_of_birth),
              is_institution_abuhur: child.is_institution_abuhur,
            }))
          : [{}],
        career: employee?.employee_historical_status
          ? employee?.employee_historical_status.map(
              (career: EmployeeHistoricalStatuses) => ({
                enrollment_date: toValidDate(career.enrollment_date),
                employment_status: toStr(career?.employment_status),
                sk_number: career.sk_number,
                sk_url: career.sk_url,
              }),
            )
          : [{}],
      });
    }
  }, [employee, reset]);

  const handleNext = async () => {
    // Validate current step fields before proceeding
    let fieldsToValidate: any | string[] = [];
    if (currentStep === 1) {
      fieldsToValidate = [
        "employee.name",
        "employee.kk_number",
        "employee.nik",
        "employee.gender",
        "employee.place_of_birth",
        "employee.date_of_birth",
        "employee.blood_type",
        "employee.address",
        "employee.rt",
        "employee.rw",
        "employee.hamlet",
        "employee.village",
        "employee.province",
        "employee.regency",
        "employee.district",
        "employee.npwp",
        "employee.phone_number",
        "employee.wa_number",
        "employee.email",
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "residance.address",
        "residance.rt",
        "residance.rw",
        "residance.hamlet",
        "residance.province",
        "residance.regency",
        "residance.district",
      ];
    } else if (currentStep === 3) {
      fieldsToValidate = ["spouse.name", "spouse.occupation", "spouse.income"];
    } else if (currentStep === 4) {
      fieldsToValidate = [
        "employee_detail.degree",
        "employee_detail.marital",
        "employee_detail.employment_status",
        "employee_detail.major",
        "employee_detail.years_of_service",
        "employee_detail.institution",
        "employee_detail.is_active",
        "employee_detail.is_teacher",
      ];
    } else if (currentStep === 5) {
      fieldsToValidate = ["education"];
    } else if (currentStep === 6) {
      fieldsToValidate = ["competency"];
    } else if (currentStep === 7) {
      fieldsToValidate = ["training"];
    } else if (currentStep === 8) {
      fieldsToValidate = ["career"];
    } else if (currentStep === 9) {
      fieldsToValidate = ["employee_lesson"];
    }

    const isValid =
      fieldsToValidate.length > 0 ? await trigger(fieldsToValidate) : true;

    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const onSubmit = (data: PtkFormData) => {
    handleUpdate(data as unknown as Record<string, unknown>);
  };

  // console.log(errors);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SectionPribadi control={control} />;
      case 2:
        return <SectionDomisili control={control} />;
      case 3:
        return <SectionPasangan control={control} />;
      case 4:
        return <SectionGtk control={control} />;
      case 5:
        return <SectionPendidikan control={control} />;
      case 6:
        return <SectionKompetensi control={control} />;
      case 7:
        return <SectionPelatihan control={control} />;
      case 8:
        return <SectionKarir control={control} />;
      case 9:
        return <SectionEmployeeLesson control={control} />;
      case 10:
        return <SectionAnak control={control} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.back();
            setCurrentStep(1);
          }}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data PTK</Text>
        <View style={{ width: 40 }} />
      </View>

      <Stepper
        currentStep={currentStep}
        totalSteps={STEPS.length}
        title={STEPS[currentStep - 1].title}
        stepName={STEPS[currentStep - 1].name}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formCard}>
          {renderStepContent()}

          <View style={styles.buttonRow}>
            {currentStep > 1 && (
              <Button
                title="Kembali"
                variant="outline"
                onPress={handleBack}
                style={{ flex: 1 }}
              />
            )}

            {currentStep < STEPS.length ? (
              <Button
                title="Selanjutnya"
                onPress={handleNext}
                style={{ flex: 2 }}
              />
            ) : (
              <Button
                title={isPending ? "Menyimpan..." : "Simpan Data"}
                onPress={handleSubmit(onSubmit)}
                disabled={isPending}
                style={{ flex: 2 }}
              />
            )}
          </View>
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
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 40,
    },
    formCard: {
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
    },
    stepContainer: {
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
    buttonRow: {
      flexDirection: "row",
      gap: 12,
      marginTop: 24,
    },
  });
