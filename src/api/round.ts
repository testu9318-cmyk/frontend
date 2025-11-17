
export async function getRounds() {
  const res = await fetch("http://localhost:5000/api/rounds");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
