import React from "react";
import { motion } from "framer-motion";
import { Star } from 'lucide-react';

const PremiumFeaturesBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-4 right-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full px-4 py-1 border border-blue-500/30"
    >
      <div className="flex items-center space-x-2">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-sm font-medium text-blue-400">Professional Version</span>
      </div>
    </motion.div>
  );
};

export default PremiumFeaturesBanner;