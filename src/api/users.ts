import type { User } from "../types/user";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("http://localhost:5000/api/users");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
