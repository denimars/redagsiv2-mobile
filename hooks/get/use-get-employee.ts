import api from "@/api/http";
import { useQuery } from "@tanstack/react-query";

export interface EmployeeResponse {
  id: string;
  nik: string;
  nupy: string;
  name: string;
  place_of_birth: string;
  date_of_birth: string;
  gender: string;
  address: string;
  wa_number: string;
  phone_number: string;
  rt: string;
  rw: string;
  kk_number: string;
  hamlet: string;
  district_id: string;
  regency_id: string;
  province_id: string;
  npwp: string;
  mother_name: string;
  blood_type: string;
  email: string;
  village: string;
  province: {
    name: string;
  };
  regency: {
    name: string;
  };
  district: {
    name: string;
  };
  employee_detail: {
    degree_id: number;
    marital_status: number;
    employment_status: number;
    major_id: number;
    years_of_service: number;
    institution_id: number;
    is_active: boolean;
    is_teacher: boolean;
    degree: {
      id: number;
      name: string;
    };
    major: {
      id: number;
      name: string;
    };
  };
  residance?: Residance | null;
  spouse?: Spouse | null;
  educations?: Educations[];
  competencies?: Competencies[];
  traning_histories?: TrainingHistories[];
  children?: Children[];
  employee_historical_status?: EmployeeHistoricalStatuses[];
  employee_lesson?: {
    lesson_id?: number | string;
    lesson?:
      | string
      | {
          id: number | string;
          name: string;
        };
  }[];
}

export interface EmployeeHistoricalStatuses {
  id: string;
  employment_status: number;
  enrollment_date: string;
  sk_number: string;
  sk_url: string;
}

export interface Spouse {
  name: string;
  occupation: {
    id: number;
    name: string;
  };
  income: {
    id: number;
    value: string;
  };
}

export interface Residance {
  employee_id: string;
  address: string;
  rt: string;
  rw: string;
  hamlet: string;
  district_id: string;
  regency_id: string;
  province_id: string;
  province: {
    name: string;
  };
  regency: {
    name: string;
  };
  district: {
    name: string;
  };
}

export interface Children {
  name: string;
  level: string;
  gender: string;
  place_of_birth: string;
  date_of_birth: string;
  is_institution_abuhur: boolean;
}

export interface TrainingHistories {
  field: string;
  name: string;
  organizer: string;
  year: number;
}

export interface Competencies {
  score: number;
  competency: string;
}

export interface Educations {
  education_id: number;
  major_id: string;
  faculty: string;
  degree_id: string;
  institution: string;
  entry_year: number;
  graduation_year: number;
  education: {
    id: number;
    name: string;
  };
  major: {
    id: number;
    name: string;
  };
  degree: {
    id: number;
    name: string;
  };
}

export default function useGetEmployee() {
  const { data, isLoading, isError, refetch } = useQuery<EmployeeResponse>({
    queryKey: ["employee"],
    queryFn: async () => {
      const response = await api.get(`/redagsi-mobile/employee-mobile/user/id`);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
