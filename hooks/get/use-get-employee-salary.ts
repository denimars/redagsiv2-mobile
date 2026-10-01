import api from "@/api/http";
import { useQuery } from "@tanstack/react-query";

export interface JobEarning {
  name: string;
  base_salary: number;
  job_amount: number;
}

export interface AdditionalEarning {
  name: string;
  amount: number;
}

export interface EarningsSummary {
  jobs?: JobEarning[];
  additional_allowances?: AdditionalEarning[];
}

export interface DeductionsSummary {
  children_school_fee: number;
  vehicle_loan: number;
  savings: number;
  btn_persa_loan: number;
}

export interface SalarySummary {
  total_salary: number;
  take_home_pay: number;
}

export interface EmployeeSalaryResponse {
  earnings: EarningsSummary;
  deductions: DeductionsSummary;
  summary: SalarySummary;
}

export default function useGetEmployeeSalary() {
  const {
    data: salaryData,
    refetch,
    isLoading,
    isPending,
    error,
  } = useQuery<EmployeeSalaryResponse>({
    queryKey: ["employee-salary"],
    queryFn: async () => {
      const response = await api.get(`/redagsi-mobile/employee-mobile/salary`);
      if (response.status === 200) {
        return response.data;
      }

      return null;
    },
  });
  return { salaryData, refetch, isLoading, isPending, error };
}
