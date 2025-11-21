import { useMutation, useQuery } from "@tanstack/react-query";
import { createCampaign, getWithCount } from "../api/compaign";

export function useWithCount() {
  return useQuery({
    queryKey: ["with-count"],
    queryFn: getWithCount,
  });
}



export function useCreateCampaign() {
  return useMutation({
    mutationFn: createCampaign,
  });
}