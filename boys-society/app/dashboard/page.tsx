"use client";

import { motion } from "framer-motion";

const announcements = [
  {
    title: "🎉 Birthday Today",
    description: "Rahul’s birthday today. Contribution: ₹100",
    type: "birthday",
  },
  {
    title: "🧳 Upcoming Trip",
    description: "Manali Trip – Contribute ₹2000",
    type: "trip",
  },
  {
    title: "📢 Notice",
    description: "Meeting tonight at 9 PM",
    type: "notice",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-10"
      >
        Welcome, Brother 👋
      </motion.h1>

      {/* Announcement Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 cursor-pointer hover:scale-[1.02] transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {item.title}
            </h2>
            <p className="text-gray-300 text-sm">
              {item.description}
            </p>

            {item.type !== "notice" && (
              <button className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold">
                Contribute
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
