import { useQuery } from "@tanstack/react-query";
import type { Round } from "../types/round";
import { getRounds } from "../api/round";

export function useRounds() {
  return useQuery<Round[]>({
    queryKey: ["rounds"],
    queryFn: getRounds,
  });
}
