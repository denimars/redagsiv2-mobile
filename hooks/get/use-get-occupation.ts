import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface Occupation {
  id: string;
  name: string;
}

export default function useGetOccupation() {
  const [occupations, setOccupations] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<Occupation[]>({
    queryKey: ["occupations"],
    queryFn: async () => {
      const response = await api.get("/student/occupation");
      if (response.status === 200) {
        setOccupations(
          response.data.map((item: Occupation) => ({
            label: item.name,
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
    occupations,
    isLoading,
    isError,
    refetch,
  };
}
