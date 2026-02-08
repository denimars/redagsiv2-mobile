import api from "@/api/http";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface Attendance {
  id: string;
  date: string;
  arrive: string;
  leave: string;
}

export default function useGetAttendance() {
  const [data, setData] = useState<Attendance[]>();
  const {
    mutate: getAttendance,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: { start: string; end: string }) => {
      const response = await api.get(
        `/redagsi-mobile/attendance/history?start=${data.start}&end=${data.end}`,
      );
      if (response.status === 200) {
        return response.data;
      }
      return undefined;
    },
    onSuccess: (res) => {
      setData(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleGet = (data: { start: string; end: string }) => {
    getAttendance(data);
  };
  return {
    getAttendance,
    isError,
    isPending,
    isSuccess,
    handleGet,
    data,
    setData,
  };
}
