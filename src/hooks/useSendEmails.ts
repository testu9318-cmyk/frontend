import { useMutation } from "@tanstack/react-query";
import { sendBulkEmail } from "../api/sendEmails";

export function useBulkEmail() {
  return useMutation({
    mutationFn: sendBulkEmail,
  });
}
