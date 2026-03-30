import { z } from "zod";

export const loanSchema = z.object({
  description: z.string().min(1, "Keterangan wajib diisi"),
  amount: z.number().min(1, "Jumlah pinjaman wajib diisi"),
  duration_month: z.number().min(1, "Durasi (bulan) wajib diisi"),
  deducation_amount: z.number().min(1, "Jumlah potongan wajib diisi"),
  type: z.number().min(1, "Tipe wajib dipilih"),
});

export type LoanFormData = z.infer<typeof loanSchema>;
