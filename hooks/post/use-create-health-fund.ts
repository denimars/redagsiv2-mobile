import api from "@/api/http";
import { HealthFundFormData } from "@/schema/health-fund";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateHealthFund(
  onSuccess: () => void,
  onError: () => void,
) {
  const queryClient = useQueryClient();
  const {
    mutate: saveHealthFund,
    mutateAsync: saveHealthFundAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: HealthFundFormData) => {
      const response = await api.post(`/redagsi-mobile/health-fund`, data);
      if (response.status === 200) {
        return response.data;
      }
      return undefined;
    },
    onSuccess: (res) => {
      console.log("Health fund application success:", res);
      queryClient.invalidateQueries({ queryKey: ["health-funds"] });
      onSuccess();
    },
    onError: (err) => {
      console.error("Health fund application error:", err);
      onError();
    },
  });

  const handleSave = (data: HealthFundFormData) => {
    saveHealthFund(data);
    console.log("Health fund application data:", data);
  };

  return {
    saveHealthFund,
    saveHealthFundAsync,
    isError,
    isPending,
    isSuccess,
    handleSave,
  };
}
