"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, isAdmin } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(100);

  useEffect(() => {
    if (!isLoggedIn()) router.push("/login");
    else if (!isAdmin()) router.push("/dashboard");
  }, []);

  const createBirthday = async () => {
    const res = await fetch(
      "http://localhost:5000/api/admin/birthday",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId,
          date,
          contributionAmount: amount,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="glass p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          Admin · Create Birthday
        </h1>

        <input
          placeholder="Birthday User ID"
          className="w-full mb-4 p-2 text-black rounded"
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          type="date"
          className="w-full mb-4 p-2 text-black rounded"
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="number"
          className="w-full mb-6 p-2 text-black rounded"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />

        <button
          onClick={createBirthday}
          className="w-full py-2 bg-purple-600 rounded"
        >
          Create Birthday
        </button>
      </div>
    </div>
  );
}
