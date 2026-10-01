import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface District {
  id: string;
  name: string;
  regency_id: string;
}

export default function useGetDistricts(regencyId: string) {
  const [districts, setDistricts] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<District[]>({
    queryKey: ["districts", regencyId],
    queryFn: async () => {
      const response = await api.get(
        `/student/district?regency_id=${regencyId}`,
      );
      if (response.status === 200) {
        setDistricts(
          response.data.map((item: District) => ({
            label: item.name,
            value: item.id,
          })),
        );
        return response.data;
      }
      return [];
    },
    enabled: !!regencyId,
  });

  return {
    data,
    districts,
    isLoading,
    isError,
    refetch,
  };
}
