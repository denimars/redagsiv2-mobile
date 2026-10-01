import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface Major {
  id: string;
  name: string;
}

export default function useGetMajor() {
  const [majors, setMajors] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<Major[]>({
    queryKey: ["majors"],
    queryFn: async () => {
      const response = await api.get("/redagsi-mobile/major");
      if (response.status === 200) {
        setMajors(
          response.data.map((item: Major) => ({
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
    majors,
    isLoading,
    isError,
    refetch,
  };
}
