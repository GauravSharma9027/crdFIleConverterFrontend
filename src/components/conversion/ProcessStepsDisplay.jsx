import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';

const ProcessStepsDisplay = () => {
  const steps = ['Upload Files', 'Choose Format', 'Convert & Download'];
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 mb-2">
                <span className="text-blue-400 font-semibold">{index + 1}</span>
              </div>
              <span className="text-sm text-gray-400">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-gray-600 mx-4" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessStepsDisplay;