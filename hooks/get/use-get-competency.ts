import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface Competency {
  id: string;
  name: string;
}

export default function useGetCompetency() {
  const [competencies, setCompetencies] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<Competency[]>({
    queryKey: ["competencies"],
    queryFn: async () => {
      const response = await api.get("/redagsi-mobile/competency");
      if (response.status === 200) {
        setCompetencies(
          response.data.map((item: Competency) => ({
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
    competencies,
    isLoading,
    isError,
    refetch,
  };
}
