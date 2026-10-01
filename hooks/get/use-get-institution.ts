import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface Institution {
  id: string;
  name: string;
}

export default function useGetInstitution() {
  const [institutions, setInstitutions] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<Institution[]>({
    queryKey: ["institutions"],
    queryFn: async () => {
      const response = await api.get("/institution/redagsi-mobile");
      if (response.status === 200) {
        setInstitutions(
          response.data.map((item: Institution) => ({
            label: item.name,
            value: item.id.toString(),
          }))
        );
        return response.data;
      }
      return [];
    },
  });

  return {
    data,
    institutions,
    isLoading,
    isError,
    refetch,
  };
}
