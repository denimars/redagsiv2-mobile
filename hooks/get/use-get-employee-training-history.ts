import api from "@/api/http";
import { useQuery } from "@tanstack/react-query";

export interface EmployeeTrainingHistory {
  id: string;
  field: string;
  name: string;
  organizer: string;
  year: number;
  employee_document_training_history?: EmployeeDocumentTrainingHistoryResponse;
}

export interface EmployeeDocumentTrainingHistoryResponse {
  id: string;
  employee_id: string;
  reference_id: string;
  url: string;
}

export default function useGetEmployeeTrainingHistory() {
  const { data, isLoading, isError, refetch } = useQuery<
    EmployeeTrainingHistory[]
  >({
    queryKey: ["employee-training-history"],
    queryFn: async () => {
      const response = await api.get(
        `/redagsi-mobile/employee-document-training-history/user/id`,
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
