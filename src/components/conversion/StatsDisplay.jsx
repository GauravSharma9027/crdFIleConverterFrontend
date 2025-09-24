import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-blue-500/10 rounded-xl p-4 text-center border border-blue-500/20"
  >
    <div className="text-2xl font-bold text-blue-400">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </motion.div>
);

const StatsDisplay = () => {
  const stats = [
    { value: "100K+", label: "Files Converted", delay: 0.1, colorClass: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
    { value: "50K+", label: "Happy Users", delay: 0.2, colorClass: "bg-purple-500/10 border-purple-500/20 text-purple-400" },
    { value: "99.9%", label: "Success Rate", delay: 0.3, colorClass: "bg-green-500/10 border-green-500/20 text-green-400" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map(stat => (
         <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: stat.delay }}
          className={`${stat.colorClass} rounded-xl p-4 text-center`}
        >
          <div className={`text-2xl font-bold`}>{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsDisplay;