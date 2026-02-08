import api from "@/api/http";
import { MOCK_SALARY_DATA } from "@/constants/salary-mock";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface SalaryData {
  earnings: {
    gajiPokok: number;
    tunjProfesi: number;
    tunjKehadiran: number;
    timPendampingMutu: number;
  };
  deductions: {
    sppAnakGtk: number;
    pinjBeliKendaraan: number;
    potTabungan: number;
    btnPersa: number;
  };
  summary: {
    totalGaji: number;
    takeHomePay: number;
  };
}

export default function useGetSalary() {
  const [data, setData] = useState<SalaryData>();
  const {
    mutate: getSalary,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (payload: { start: string; end: string }) => {
      try {
        const response = await api.get(
          `/redagsi-mobile/salary/history?start=${payload.start}&end=${payload.end}`,
        );
        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        console.log("API Error, using mock data:", error);
      }

      // Simulate API delay for mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return MOCK_SALARY_DATA;
    },
    onSuccess: (res) => {
      setData(res);
    },
    onError: (err) => {
      console.log(err);
      // Fallback to mock data even on error
      setData(MOCK_SALARY_DATA);
    },
  });

  const handleGet = (data: { start: string; end: string }) => {
    getSalary(data);
  };

  return {
    getSalary,
    isError,
    isPending,
    isSuccess,
    handleGet,
    data,
    setData,
  };
}
