export const LOAN_TYPES = [
  { label: "Tipe 1", value: 1 },
  { label: "Tipe 2", value: 2 },
];

export const ScoreOption = [
  { label: "Ahli", value: "1" },
  { label: "Menengah", value: "2" },
  { label: "Pemula", value: "3" },
];

// Status keluar/pemberhentian — value harus sama dengan kode di backend
// (sipaham-v2-1-1/app/service/employee/response.go → exitStatusMap)
export const ExitStatusOption = [
  { label: "Mutasi", value: "1" },
  { label: "Dikeluarkan", value: "2" },
  { label: "Mengundurkan diri", value: "3" },
  { label: "Wafat", value: "4" },
  { label: "Hilang", value: "5" },
  { label: "Alih Fungsi", value: "6" },
  { label: "Pensiun", value: "7" },
];
