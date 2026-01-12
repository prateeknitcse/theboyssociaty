const API_BASE = "http://localhost:5000/api";

export async function getTodaysBirthday() {
  const res = await fetch(`${API_BASE}/birthday/today`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("No birthday today");
  return res.json();
}

export async function getContributions(birthdayId: string) {
  const res = await fetch(
    `${API_BASE}/contribution/${birthdayId}`,
    {
      credentials: "include",
    }
  );
  return res.json();
}

export async function payContribution(
  birthdayId: string,
  amount: number
) {
  const res = await fetch(
    `${API_BASE}/contribution/pay`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ birthdayId, amount }),
    }
  );
  return res.json();
}
