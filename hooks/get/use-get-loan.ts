import api from "@/api/http";
import { useQuery } from "@tanstack/react-query";

export interface LoanItem {
  id: string;
  employee_id: string;
  description: string;
  amount: number;
  deducation_amount: number;
  duration_months: number;
  type: number;
  is_paid_off: boolean | null;
  queue: number;
  is_approved: boolean | null;
}

export default function useGetLoan(type: number) {
  const { data, isLoading, isError, refetch } = useQuery<LoanItem[]>({
    queryKey: ["loans", type],
    queryFn: async () => {
      const response = await api.get(`/redagsi-mobile/loan/${type}`);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    },
    enabled: !!type,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
