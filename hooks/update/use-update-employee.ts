import api from "@/api/http";
import { formatLocalizedDate } from "@/utils/time";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export default function useUpdateEmployee(
  onSuccess: () => void,
  onError: () => void
) {
  const queryClient = useQueryClient();

  const {
    mutate: updateEmployee,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ data }: { data: Record<string, unknown> }) => {
      const response = await api.put(`/redagsi-mobile/employee-mobile`, data);
      if (response.status === 200) {
        return response.data;
      }
      return undefined;
    },
    onSuccess: (res) => {
      console.log(res);
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["employee"] });
    },
    onError: (err) => {
      onError();
      console.log(err);
    },
  });

  const middleware = (data: FieldValues) => {
    const {
      employee,
      employee_detail,
      residance,
      children,
      competency,
      training,
      education,
      spouse,
      career,
      employee_lesson,
    } = data;

    const newEducation = education?.map(
      (item: {
        education: string;
        major: string;
        degree: string;
        entry_year: number;
        graduation_year: number;
        faculty: string;
        institution: string;
      }) => {
        return {
          education_id: Number(item.education),
          major_id: Number(item.major),
          faculty: item.faculty,
          degree_id: Number(item.degree),
          institution: item.institution,
          entry_year: Number(item.entry_year),
          graduation_year: Number(item.graduation_year),
        };
      }
    );

    const newTraining = training?.map(
      (item: {
        field: string;
        name: string;
        organizer: string;
        year: string;
      }) => {
        return {
          field: item.field,
          name: item.name,
          organizer: item.organizer,
          year: Number(item.year),
        };
      }
    );

    const newCompetency = competency?.map(
      (item: { competency: string; score: string }) => {
        return {
          competency: item.competency,
          score: Number(item.score),
        };
      }
    );

    const newChildren = children?.map(
      (item: {
        name: string;
        level: string;
        gender: string;
        place_of_birth: string;
        date_of_birth: Date;
        is_institution_abuhur: boolean;
      }) => {
        return {
          name: item.name,
          level: item.level,
          gender: item.gender === "Laki-laki" ? "L" : "P",
          place_of_birth: item.place_of_birth,
          date_of_birth: formatLocalizedDate(item.date_of_birth),
          is_institution_abuhur: item.is_institution_abuhur,
        };
      }
    );

    const newCareer = career?.map(
      (item: {
        enrollment_date: Date;
        employment_status: string;
        sk_number: string;
        sk_url: string;
      }) => {
        return {
          enrollment_date: formatLocalizedDate(item.enrollment_date),
          employment_status: Number(item.employment_status),
          sk_number: item.sk_number,
          sk_url: item.sk_url,
        };
      }
    );

    const newEmployeeLesson = employee_lesson?.map(
      (item: { lesson: string }) => {
        return {
          lesson_id: Number(item.lesson),
        };
      }
    );

    return {
      nik: employee.nik,
      name: employee.name,
      kk_number: employee.kk_number,
      npwp: employee.npwp,
      nupy: employee.nupy,
      email: employee.email,
      place_of_birth: employee.place_of_birth,
      date_of_birth: formatLocalizedDate(employee.date_of_birth),
      gender: employee.gender === "Laki-laki" ? "l" : "p",
      address: employee.address,
      wa_number: employee.wa_number,
      phone_number: employee.phone_number,
      rt: employee.rt,
      rw: employee.rw,
      hamlet: employee.hamlet,
      village: employee.village,
      blood_type: employee.blood_type,
      province_id: employee.province,
      regency_id: employee.regency,
      district_id: employee.district,
      employee_detail: {
        degree_id: Number(employee_detail.degree),
        marital_status: Number(employee_detail.marital),
        employment_status: Number(employee_detail.employment_status),
        major_id: Number(employee_detail.major),
        years_of_service: Number(employee_detail.years_of_service),
        institution_id:
          employee_detail.institution !== ""
            ? Number(employee_detail.institution)
            : null,
        is_teacher: employee_detail.is_teacher,
        is_active: employee_detail.is_active,
      },
      residance: {
        address: residance.address,
        rt: residance.rt,
        rw: residance.rw,
        hamlet: residance.hamlet,
        province_id: residance.province !== "" ? residance.province : null,
        regency_id: residance.regency !== "" ? residance.regency : null,
        district_id: residance.district !== "" ? residance.district : null,
      },
      spouse: {
        name: spouse.name,
        income_id: spouse.income !== "" ? Number(spouse.income) : null,
        occupation_id:
          spouse.occupation !== "" ? Number(spouse.occupation) : null,
      },
      educations: newEducation,
      competencies: newCompetency,
      traning_histories: newTraining,
      children: newChildren,
      employee_historical_status: newCareer,
      employee_lesson: newEmployeeLesson,
    };
  };

  const handleUpdate = (data: Record<string, unknown>) => {
    // console.log(data);
    // console.log("///////");
    // console.log(middleware(data));
    updateEmployee({ data: middleware(data) });
  };

  return {
    updateEmployee,
    isError,
    isPending,
    isSuccess,
    handleUpdate,
  };
}
