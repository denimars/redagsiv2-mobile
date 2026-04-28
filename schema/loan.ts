import { z } from "zod";

export const loanSchema = z.object({
  description: z.string().min(1, "Keterangan wajib diisi"),
  amount: z.string().refine((val) => Number(val.replace(/\./g, "")) > 0, {
    message: "Jumlah pinjaman wajib diisi",
  }),
  duration_month: z
    .number()
    .min(1, "Durasi (bulan) wajib diisi")
    .max(12, "Durasi (bulan) maksimal 12"),
  deducation_amount: z
    .string()
    .refine((val) => Number(val.replace(/\./g, "")) > 0, {
      message: "Jumlah potongan wajib diisi",
    }),
  type: z.number().min(1, "Tipe wajib dipilih"),
});

export type LoanFormData = z.infer<typeof loanSchema>;
