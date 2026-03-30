import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface LoanType {
  type: number;
  name: string;
}

export default function useGetLoanType() {
  const [loanType, setLoanType] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<LoanType[]>({
    queryKey: ["loan-types"],
    queryFn: async () => {
      const response = await api.get("/redagsi-mobile/loan/type");
      if (response.status === 200) {
        setLoanType(
          response.data.map((item: LoanType) => ({
            label: item.name,
            value: item.type,
          })),
        );
        return response.data;
      }
      return null;
    },
  });

  return {
    data,
    loanType,
    isLoading,
    isError,
    refetch,
  };
}
