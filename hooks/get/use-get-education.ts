import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface Education {
  id: string;
  name: string;
}

export default function useGetEducation() {
  const [educations, setEducations] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<Education[]>({
    queryKey: ["educations"],
    queryFn: async () => {
      const response = await api.get("/redagsi-mobile/education");
      if (response.status === 200) {
        setEducations(
          response.data.map((item: Education) => ({
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
    educations,
    isLoading,
    isError,
    refetch,
  };
}
