import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface Degree {
  id: string;
  name: string;
}

export default function useGetDegree() {
  const [degrees, setDegrees] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<Degree[]>({
    queryKey: ["degrees"],
    queryFn: async () => {
      const response = await api.get("/redagsi-mobile/degree");
      if (response.status === 200) {
        setDegrees(
          response.data.map((item: Degree) => ({
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
    degrees,
    isLoading,
    isError,
    refetch,
  };
}
