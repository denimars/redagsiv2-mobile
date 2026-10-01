import { z } from "zod";

export const EmployeeUpdateSchema = z.object({
  // mother_name: z.string().min(1, "Nama ibu kandung wajib diisi"),
  kk_number: z.string().min(1, "Nomor KK wajib diisi"),
  blood_type: z.string().min(1, "Golongan darah wajib diisi"),
  npwp: z.string().optional(),
  email: z.string().optional(),
  nupy: z.string().optional(),
  nik: z.string().min(1, "NIK tidak boleh kosong"),
  name: z.string().min(1, "nama tidak boleh kosong"),
  place_of_birth: z.string().min(1, "tempat lahir wajib diisi"),
  date_of_birth: z
    .date({ message: "Tanggal tidak boleh kosong" })
    .refine((val) => val !== null, {
      message: "Tanggal tidak boleh kosong",
    }),
  gender: z.enum(["Laki-laki", "Perempuan"]),
  address: z.string().min(1, "alamat wajib diisi"),
  wa_number: z.string().min(1, "nomor wa wajib diisi"),
  phone_number: z.string(),
  rt: z.string().min(1, "RT tidak boleh kosong"),
  rw: z.string().min(1, "RW tidak boleh kosong"),
  hamlet: z.string().min(1, "dusun wajib diisi"),
  village: z.string().min(1, "desa wajib diisi"),
  district: z.string().min(1, "kecamatan wajib diisi"),
  regency: z.string().min(1, "kabupaten wajib diisi"),
  province: z.string().min(1, "province tidak boleh kosong"),
});

export const EmployeeResidanceSchema = z.object({
  address: z.string().optional(),
  rt: z.string().optional(),
  rw: z.string().optional(),
  hamlet: z.string().optional(),
  district: z.string().min(1, "kecamatan wajib diisi"),
  regency: z.string().min(1, "kabupaten wajib diisi"),
  province: z.string().min(1, "province tidak boleh kosong"),
});

export const EmployeeDetailSchema = z.object({
  degree: z.string().min(1, "gelar tidak boleh kosong"),
  marital: z.string().min(1, "status perkawinan tidak boleh kosong"),
  employment_status: z.string().min(1, "status pekerjaan tidak boleh kosong"),
  major: z.string().min(1, "jurusan tidak boleh kosong"),
  years_of_service: z.string().min(1, "tahun kerja tidak boleh kosong"),
  institution: z.string().optional(),
  is_active: z.boolean().optional(),
  is_teacher: z.boolean().optional(),
});

export const EmployeeSpouseSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().min(1, "pekerjaan tidak boleh kosong"),
  income: z.string().min(1, "penghasilan tidak boleh kosong"),
});

export const EmployeeEducationSchema = z.object({
  education: z.string().optional(),
  major: z.string().optional(),
  faculty: z.string().optional(),
  degree: z.string().optional(),
  institution: z.string().optional(),
  entry_year: z.string().optional(),
  graduation_year: z.string().optional(),
});

export const EmployeeCompetencySchema = z.object({
  competency: z.string().optional(),
  score: z.string().optional(),
});

export const EmployeeTrainingSchema = z.object({
  field: z.string().optional(),
  name: z.string().optional(),
  organizer: z.string().optional(),
  year: z.string().optional(),
});

export const EmployeeCareerSchema = z.object({
  enrollment_date: z.date().optional(),
  employment_status: z.string().optional(),
  sk_number: z.string().optional(),
  sk_url: z.string().optional(),
});

export const EmployeeLessonSchema = z.object({
  lesson: z.string().optional(),
});

export const EmployeeChildrenSchema = z.object({
  name: z.string().optional(),
  level: z.string().optional(),
  gender: z.enum(["Laki-laki", "Perempuan"]).optional(),
  place_of_birth: z.string().optional(),
  date_of_birth: z.date().optional(),
  is_institution_abuhur: z.boolean().optional(),
});

export const FinalUpdateEmployeeSchema = z.object({
  employee: EmployeeUpdateSchema,
  residance: EmployeeResidanceSchema,
  spouse: EmployeeSpouseSchema,
  education: z.array(EmployeeEducationSchema),
  employee_detail: EmployeeDetailSchema,
  competency: z.array(EmployeeCompetencySchema),
  training: z.array(EmployeeTrainingSchema),
  career: z.array(EmployeeCareerSchema),
  employee_lesson: z.array(EmployeeLessonSchema),
  children: z.array(EmployeeChildrenSchema),
});

// For backward compatibility or if the form still uses flat structure,
// we could keep ptkSchema but let's try to move to nested.
// However, the user asked to "make like this", so I'll prioritize the nested one.
export type PtkFormData = z.infer<typeof FinalUpdateEmployeeSchema>;

// Keep the old ptkSchema if needed for form components that haven't been updated yet
// but ideally we should update them to use the nested structure.
export const ptkSchema = FinalUpdateEmployeeSchema;
