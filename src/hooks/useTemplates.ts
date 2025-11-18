import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { template } from "../types/template";
import { createTemplate, deleteTemplate, getSentEmailCount, getTemplates, getTemplatesByRound, getTotalEmail, updateTemplate } from "../api/templates";

export function useTemplates(filters: {
  name: string;
  category: string;
  roundSearch: string;
  selectedDate: string;
  customStart?: string;
  customEnd?: string;
}) {
  return useQuery<template[]>({
    queryKey: ["templates", filters], // refetch when filters change
    queryFn: () => getTemplates(filters),
  });
}

export function useTotalEmail() {
  return useQuery({
    queryKey: ["totalemail"],  
    queryFn: () => getTotalEmail(),

  });
};

export function useSentEmailCount() {
  return useQuery({
    queryKey: ["sentemail"],  
    queryFn: () => getSentEmailCount(),

  });
};

export function useTemplatesByRound(roundId: string) {
  return useQuery({
    queryKey: ["templates", roundId],  // cache per round
    queryFn: () => getTemplatesByRound(roundId),
    enabled: !!roundId,               // only run if roundId exists
  });
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
  });
}

export function useUpdateTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateTemplate(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates","totalemail"] });
    },
  });

}
export function useDeleteTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTemplate(id),
    onSuccess: () => {
      // Refresh templates list after deletion
      queryClient.invalidateQueries({ queryKey: ["templates","totalemail"] });
    },
  });
}