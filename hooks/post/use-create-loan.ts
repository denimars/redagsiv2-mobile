import api from "@/api/http";
import { LoanFormData } from "@/schema/loan";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateLoan(
  onSuccess: () => void,
  onError: () => void,
) {
  const queryClient = useQueryClient();
  const {
    mutate: saveLoan,
    mutateAsync: saveLoanAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: LoanFormData) => {
      const response = await api.post(`/redagsi-mobile/loan`, data);
      if (response.status === 200) {
        return response.data;
      }
      return undefined;
    },
    onSuccess: (res) => {
      console.log("Loan application success:", res);
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      onSuccess();
    },
    onError: (err) => {
      console.error("Loan application error:", err);
      onError();
    },
  });

  const handleSave = (data: LoanFormData) => {
    saveLoan(data);
    console.log("Loan application data:", data);
  };

  return {
    saveLoan,
    saveLoanAsync,
    isError,
    isPending,
    isSuccess,
    handleSave,
  };
}
