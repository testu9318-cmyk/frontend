export async function getWithCount() {
  const res = await fetch("http://localhost:5000/api/with-count");

  if (!res.ok) throw new Error("Failed to fetch with-count");

  return res.json();
}


export async function createCampaign(payload: any) {
  const res = await fetch("http://localhost:5000/api/campaigns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create campaign");
  }

  return res.json();
}
