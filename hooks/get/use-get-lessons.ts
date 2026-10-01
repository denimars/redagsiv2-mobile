import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface Lesson {
  id: string;
  name: string;
}

export default function useGetLessons() {
  const [lessons, setLessons] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<Lesson[]>({
    queryKey: ["lessons"],
    queryFn: async () => {
      const response = await api.get("/redagsi-mobile/lesson");
      if (response.status === 200) {
        setLessons(
          response.data.map((item: Lesson) => ({
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
    lessons,
    isLoading,
    isError,
    refetch,
  };
}
