import type { History } from "../types/history";

export async function getHistoryById(id: string): Promise<History> {
  const res = await fetch(`http://localhost:5000/api/history/${id}`);
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}
