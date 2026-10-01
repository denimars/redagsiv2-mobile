import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface Income {
  id: string;
  min: number;
  max: number;
  value: string;
}

export default function useGetIncome() {
  const [incomes, setIncomes] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<Income[]>({
    queryKey: ["incomes"],
    queryFn: async () => {
      const response = await api.get("/student/income");
      if (response.status === 200) {
        setIncomes(
          response.data.map((item: Income) => ({
            label: item.value,
            value: item.id.toString(),
          })),
        );
        return response.data;
      }
      return [];
    },
  });

  return {
    data,
    incomes,
    isLoading,
    isError,
    refetch,
  };
}
