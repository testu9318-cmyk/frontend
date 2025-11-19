export async function sendBulkEmail(payload) {
  const res = await fetch("http://localhost:5000/api/bulk-send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to send email");

  return res.json();
}
