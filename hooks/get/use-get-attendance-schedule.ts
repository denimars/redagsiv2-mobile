import api from "@/api/http";
import { useQuery } from "@tanstack/react-query";

export interface AttendanceScheduleType {
  in: boolean;
  start: boolean;
  end: boolean;
  total_absen: number;
  location: Location;
}

export interface Location {
  lat: number;
  long: number;
  radius: number;
}

export default function useGetAttendanceSchedule() {
  const {
    data: AttendanceSchedule,
    isPending,
    refetch,
    isLoading,
    error,
  } = useQuery<AttendanceScheduleType>({
    queryKey: ["attendance-schedule"],
    queryFn: async () => {
      const response = await api.get(`/redagsi-mobile/attendance`);

      if (response.status === 200) {
        return response.data;
      }
      return null;
    },
    refetchInterval: 5000, // 5 seconds
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
  return { AttendanceSchedule, refetch, isPending, isLoading, error };
}
