import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface Grade {
  id: string;
  name: string;
}

export default function useGetGrade() {
  const [grades, setGrades] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<Grade[]>({
    queryKey: ["grades"],
    queryFn: async () => {
      const response = await api.get("/redagsi-mobile/grade");
      if (response.status === 200) {
        setGrades(
          response.data.map((item: Grade) => ({
            label: item.name,
            value: item.id,
          })),
        );
        return response.data;
      }
      return [];
    },
  });

  return {
    data,
    grades,
    isLoading,
    isError,
    refetch,
  };
}
