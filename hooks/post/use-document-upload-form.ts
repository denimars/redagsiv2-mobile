import {
  DocumentUploadFormData,
  documentUploadSchema,
} from "@/schema/document-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import useUploadDocument from "./use-upload-document";

interface UseDocumentUploadFormOptions {
  endpoint: string;
  queryKey: string[];
  successMessage?: string;
}

export default function useDocumentUploadForm({
  endpoint,
  queryKey,
  successMessage,
}: UseDocumentUploadFormOptions) {
  const uploadMutation = useUploadDocument({
    endpoint,
    queryKey,
    successMessage,
  });

  const { control, handleSubmit, reset, setValue } = useForm<DocumentUploadFormData>({
    resolver: zodResolver(documentUploadSchema),
    defaultValues: { fileUri: "", fileName: "" },
    mode: "onSubmit",
  });

  const submitWithContext = useCallback(
    (
      data: DocumentUploadFormData,
      referenceId: string,
      id?: string,
      onSettled?: () => void,
    ) => {
      uploadMutation.mutate(
        { referenceId, fileUri: data.fileUri, id },
        { onSettled },
      );
    },
    [uploadMutation],
  );

  return {
    control,
    handleSubmit,
    submitWithContext,
    setValue,
    isPending: uploadMutation.isPending,
    reset,
  };
}
