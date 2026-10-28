import api from "@/api/http";
import { useQuery } from "@tanstack/react-query";

export interface EmployeeDocumentIdentityCardResponse {
  id: string;
  employee_id: string;
  reference_id: string;
  url: string;
}

export default function useGetEmployeeIdentityCard() {
  const { data, isLoading, isError, refetch } = useQuery<
    EmployeeDocumentIdentityCardResponse[]
  >({
    queryKey: ["employee-identity-card"],
    queryFn: async () => {
      const response = await api.get(
        `/redagsi-mobile/employee-document-identity-card/user/id`,
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
