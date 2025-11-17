import { useQuery } from "@tanstack/react-query";
import type { template } from "../types/template";
import { getTemplates, getTemplatesByRound } from "../api/templates";

export function useTemplates() {
  return useQuery<template[]>({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });
}



export function useTemplatesByRound(roundId: string) {
  return useQuery({
    queryKey: ["templates", roundId],  // cache per round
    queryFn: () => getTemplatesByRound(roundId),
    enabled: !!roundId,               // only run if roundId exists
  });
}

