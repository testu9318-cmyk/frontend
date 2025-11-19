import type { template } from "../types/template";

export async function getTemplates(filters?: {
  name?: string;
  category?: string;
  roundSearch?: string;
  selectedDate?: string;
  customStart?: string;
  customEnd?: string;
}): Promise<template[]> {

  const params = new URLSearchParams();

  if (filters?.name) params.append("name", filters.name);
  if (filters?.category && filters.category !== "All") params.append("category", filters.category);
  if (filters?.roundSearch && filters.roundSearch !== "All") params.append("roundSearch", filters.roundSearch);
  if (filters?.selectedDate && filters.selectedDate !== "All time") params.append("selectedDate", filters.selectedDate);
  if (filters?.customStart) params.append("customStart", filters.customStart);
  if (filters?.customEnd) params.append("customEnd", filters.customEnd);
  const url = `http://localhost:5000/api/templates?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch templates");
  return res.json();
}


export async function getTemplatesByRound(roundId: string): Promise<template[]> {
  const res = await fetch(`http://localhost:5000/api/templates/round/${roundId}`);
  if (!res.ok) throw new Error("Failed to fetch templates for round");
  return res.json();
}


export async function getTotalEmail(): Promise<{ totalEmails: number }> {
  const res = await fetch(`http://localhost:5000/api/total-emails`);
  if (!res.ok) throw new Error("Failed to fetch total-emails");
  return res.json();
}

export async function getSentEmailCount(): Promise<{ totalEmails: number }> {
  const res = await fetch(`http://localhost:5000/api/emails/sent/count`);
  if (!res.ok) throw new Error("Failed to fetch total-emails");
  return res.json();
}

export async function createTemplate(payload: {
  templateName: string;
  category: string;
  subject: string;
  content: string;
}): Promise<template> {
  const res = await fetch("http://localhost:5000/api/templates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create template");
  return res.json();
}

export async function updateTemplate(
  id: string,
  payload: {
    templateName?: string;
    category?: string;
    subject?: string;
    content?: string;
  }
): Promise<template> {
  const res = await fetch(`http://localhost:5000/api/templates/${id}`, {
    method: "PUT", // or PATCH depending on your API
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update template");
  return res.json();
}


export async function deleteTemplate(id: string): Promise<{ message: string }> {
  const res = await fetch(`http://localhost:5000/api/templates/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete template");
  return res.json(); // assuming API returns { message: "Template deleted" }
}

