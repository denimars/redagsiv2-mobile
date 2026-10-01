import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface Province {
  id: string;
  name: string;
}

export default function useGetProvinces() {
  const [provinces, setProvinces] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<Province[]>({
    queryKey: ["provinces"],
    queryFn: async () => {
      const response = await api.get("/student/province");
      if (response.status === 200) {
        setProvinces(
          response.data.map((item: Province) => ({
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
    provinces,
    isLoading,
    isError,
    refetch,
  };
}
