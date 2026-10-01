import api from "@/api/http";
import { useQuery } from "@tanstack/react-query";

export interface ProfileResponse {
  employee_hub: employeeHub;
  user_hub: userHub;
}

export interface employeeHub {
  id: string;
  employee: {
    id: string;
    name: string;
    nupy: string;
    employee_detail: {
      id: string;
      institution: {
        id: number;
        name: string;
      };
    };
    employee_responsibilities: {
      id: string;
      is_active: boolean;
      job_responsibility: {
        id: number;
        name: string;
        amount: number;
      };
    }[];
  };
}

interface userHub {
  role_hub: {
    institution: {
      id: number;
      name: string;
    };
  }[];
}

export default function useGetProfile() {
  const {
    data: EmployeeMobile,
    isPending,
    refetch,
    isLoading,
    error,
  } = useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get(`/redagsi-mobile/employee-mobile/profile`);
      if (response.status === 200) {
        return response.data;
      }

      return null;
    },
  });
  return { EmployeeMobile, refetch, isPending, isLoading, error };
}
