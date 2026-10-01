import api from "@/api/http";
import { useQuery } from "@tanstack/react-query";

export interface EmployeeDocumentFamilyCardResponse {
  id: string;
  employee_id: string;
  reference_id: string;
  url: string;
}

export default function useGetEmployeeFamilyCard() {
  const { data, isLoading, isError, refetch } = useQuery<
    EmployeeDocumentFamilyCardResponse[]
  >({
    queryKey: ["employee-family-card"],
    queryFn: async () => {
      const response = await api.get(
        `/redagsi-mobile/employee-document-family-card/user/id`,
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
