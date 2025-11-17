import { useQuery } from "@tanstack/react-query";
import { getHistoryById } from "../api/history";

export function useHistory(id: string) {
  return useQuery({
    queryKey: ["history", id],
    queryFn: () => getHistoryById(id),
    enabled: !!id, // only fetch if id exists
  });
}
