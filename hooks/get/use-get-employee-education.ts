import api from "@/api/http";
import { useQuery } from "@tanstack/react-query";

export interface EmployeeEducation {
  id: string;
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
  employee_document_education?: EmployeeDocumentEducationResponse;
}

export interface EmployeeDocumentEducationResponse {
  id: string;
  employee_id: string;
  reference_id: string;
  url: string;
}

export default function useGetEmployeeEducation() {
  const { data, isLoading, isError, refetch } = useQuery<EmployeeEducation[]>({
    queryKey: ["employee-education"],
    queryFn: async () => {
      const response = await api.get(
        `/redagsi-mobile/employee-document-education/user/id`,
      );
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
