import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Info } from 'lucide-react';

const highlights = [
  { icon: Shield, title: "Secure Conversion", description: "End-to-end encrypted file processing", color: "blue" },
  { icon: Zap, title: "Lightning Fast", description: "Convert files in seconds", color: "purple" },
  { icon: Info, title: "24/7 Support", description: "Professional assistance anytime", color: "pink" }
];

const PremiumHighlightsDisplay = () => {
  const getColorClasses = (color) => {
    switch(color) {
      case "blue": return "from-blue-500/10 to-purple-500/10 border-blue-500/20 text-blue-400";
      case "purple": return "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400";
      case "pink": return "from-pink-500/10 to-red-500/10 border-pink-500/20 text-pink-400";
      default: return "";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {highlights.map((highlight, index) => (
        <div key={index} className={`bg-gradient-to-br rounded-xl p-6 border ${getColorClasses(highlight.color).split(' text-')[0]}`}>
          <highlight.icon className={`w-8 h-8 mb-4 ${getColorClasses(highlight.color).split(' ')[2]}`} />
          <h3 className="font-semibold mb-2 text-white">{highlight.title}</h3>
          <p className="text-sm text-gray-400">{highlight.description}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default PremiumHighlightsDisplay;