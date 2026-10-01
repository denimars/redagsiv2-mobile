import * as FileSystem from "expo-file-system/legacy";
import { z } from "zod";

const MAX_FILE_SIZE = 1_048_576;

export const documentUploadSchema = z.object({
  fileUri: z.string().min(1, "Pilih file terlebih dahulu"),
  fileName: z.string().optional(),
}).superRefine(async (data, ctx) => {
  const fileName = data.fileName || data.fileUri.split("/").pop() || "";

  if (!fileName.toLowerCase().endsWith(".pdf")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Hanya file PDF yang diperbolehkan",
      path: ["fileUri"],
    });
    return;
  }

  const info = await FileSystem.getInfoAsync(data.fileUri);
  if (!info.exists) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "File tidak ditemukan",
      path: ["fileUri"],
    });
    return;
  }

  if (info.size && info.size > MAX_FILE_SIZE) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Ukuran file maksimal 1 MB",
      path: ["fileUri"],
    });
  }
});

export type DocumentUploadFormData = z.infer<typeof documentUploadSchema>;
