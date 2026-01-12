"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getTodaysBirthday,
  getContributions,
  payContribution,
} from "@/lib/api";

export default function DashboardPage() {
  const [birthday, setBirthday] = useState<any>(null);
  const [contributions, setContributions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getTodaysBirthday();

        if (data.hidden) {
          setBirthday(null);
          setLoading(false);
          return;
        }

        setBirthday(data.birthday);

        const contribs = await getContributions(
          data.birthday._id
        );
        setContributions(contribs);
      } catch (err) {
        console.log("No birthday today");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handlePay = async () => {
    if (!birthday) return;

    try {
      setPaying(true);
      await payContribution(
        birthday._id,
        birthday.contributionAmount
      );

      const updated = await getContributions(
        birthday._id
      );
      setContributions(updated);
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-10"
        >
          Dashboard
        </motion.h1>

        {/* 🎂 Birthday Card */}
        {birthday && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 mb-10"
          >
            <h2 className="text-2xl font-semibold mb-2">
              🎉 {birthday.user.name}’s Birthday
            </h2>
            <p className="text-gray-300 mb-4">
              Contribution Amount: ₹
              {birthday.contributionAmount}
            </p>

            <button
              onClick={handlePay}
              disabled={paying}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 font-semibold disabled:opacity-50"
            >
              {paying ? "Processing..." : "Pay Now"}
            </button>
          </motion.div>
        )}

        {/* 👥 Contributions List */}
        {birthday && (
          <div className="glass p-6">
            <h3 className="text-xl font-semibold mb-4">
              Contributions
            </h3>

            <ul className="space-y-3">
              {contributions.map((c) => (
                <li
                  key={c._id}
                  className="flex justify-between items-center border-b border-gray-700 pb-2"
                >
                  <span>{c.user.name}</span>
                  <span
                    className={
                      c.status === "paid"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {c.status === "paid"
                      ? "✔ Paid"
                      : "✖ Not Paid"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!birthday && (
          <p className="text-gray-400">
            No birthday contribution for you today 🎈
          </p>
        )}
      </div>
    </div>
  );
}
