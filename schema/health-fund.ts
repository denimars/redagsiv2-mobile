import { z } from "zod";

export const healthFundSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
});

export type HealthFundFormData = z.infer<typeof healthFundSchema>;

