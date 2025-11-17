import type { template } from "../types/template";

export async function getTemplates(): Promise<template[]> {
  const res = await fetch("http://localhost:5000/api/templates");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function getTemplatesByRound(roundId: string): Promise<Template[]> {
  const res = await fetch(`http://localhost:5000/api/templates/round/${roundId}`);
  if (!res.ok) throw new Error("Failed to fetch templates for round");
  return res.json();
}
