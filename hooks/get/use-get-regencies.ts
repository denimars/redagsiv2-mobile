import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface Regency {
  id: string;
  name: string;
  province_id: string;
}

export default function useGetRegencies(provinceId: string) {
  const [regencies, setRegencies] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<Regency[]>({
    queryKey: ["regencies", provinceId],
    queryFn: async () => {
      const response = await api.get(
        `/student/regency?province_id=${provinceId}`,
      );
      if (response.status === 200) {
        setRegencies(
          response.data.map((item: Regency) => ({
            label: item.name,
            value: item.id,
          })),
        );
        return response.data;
      }
      return [];
    },
    enabled: !!provinceId,
  });

  return {
    data,
    regencies,
    isLoading,
    isError,
    refetch,
  };
}
