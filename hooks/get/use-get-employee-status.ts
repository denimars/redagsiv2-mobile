import api from "@/api/http";
import { Option } from "@/components/Dropdownv2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface EmployeeStatus {
  id: string;
  name: string;
}

export default function useGetEmployeeStatus() {
  const [employeeStatuses, setEmployeeStatuses] = useState<Option[]>([]);
  const { data, isLoading, isError, refetch } = useQuery<EmployeeStatus[]>({
    queryKey: ["employeeStatuses"],
    queryFn: async () => {
      const response = await api.get("/redagsi-mobile/employee-status");
      if (response.status === 200) {
        setEmployeeStatuses(
          response.data.map((item: EmployeeStatus) => ({
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
    employeeStatuses,
    isLoading,
    isError,
    refetch,
  };
}
