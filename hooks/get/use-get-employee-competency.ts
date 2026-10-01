import api from "@/api/http";
import { useQuery } from "@tanstack/react-query";

export interface EmployeeCompetency {
  id: string;
  competency: string;
  score: number;
  employee_document_competency?: EmployeeDocumentCompetencyResponse;
}

export interface EmployeeDocumentCompetencyResponse {
  id: string;
  employee_id: string;
  reference_id: string;
  url: string;
}

export default function useGetEmployeeCompetency() {
  const { data, isLoading, isError, refetch } = useQuery<EmployeeCompetency[]>({
    queryKey: ["employee-competency"],
    queryFn: async () => {
      const response = await api.get(
        `/redagsi-mobile/employee-document-competency/user/id`,
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
