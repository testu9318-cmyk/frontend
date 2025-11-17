import type { template } from "../types/template";

export async function getTemplates(): Promise<template[]> {
  const res = await fetch("http://localhost:5000/api/templates");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function getTemplatesByRound(roundId: string): Promise<template[]> {
  const res = await fetch(`http://localhost:5000/api/templates/round/${roundId}`);
  if (!res.ok) throw new Error("Failed to fetch templates for round");
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
