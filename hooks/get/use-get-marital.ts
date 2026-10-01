import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface MaritalStatus {
  id: string;
  name: string;
}

export default function useGetMarital() {
  const [maritalStatuses, setMaritalStatuses] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<MaritalStatus[]>({
    queryKey: ["maritalStatuses"],
    queryFn: async () => {
      const response = await api.get("/redagsi-mobile/marital");
      if (response.status === 200) {
        setMaritalStatuses(
          response.data.map((item: MaritalStatus) => ({
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
    maritalStatuses,
    isLoading,
    isError,
    refetch,
  };
}
