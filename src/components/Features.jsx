
import React from "react";
import { motion } from "framer-motion";
import { FileUp, Shield, Zap, Clock, Users, Download } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: FileUp,
      title: "Free CDR Convert Tool",
      description: "Best online CDR converter with support for all versions"
    },
    {
      icon: Shield,
      title: "CDR to EPS Converter",
      description: "Convert CDR files to EPS format instantly"
    },
    {
      icon: Zap,
      title: "Fast Online Conversion",
      description: "Convert CDR online with our high-speed engine"
    },
    {
      icon: Clock,
      title: "CorelDRAW Converter",
      description: "Convert between any CorelDRAW version (3 to 14)"
    },
    {
      icon: Users,
      title: "Batch Processing",
      description: "Convert multiple CDR files at once"
    },
    {
      icon: Download,
      title: "Instant Downloads",
      description: "Get your converted files immediately"
    }
  ];

  return (
    <section id="features" className="py-16 bg-gradient-to-br from-gray-900 to-blue-950 border-t border-b border-blue-800/50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">Best Online CDR Converter</h2>
        <p className="text-center text-gray-300 mb-12 text-lg">
          Convert CDR files online with our free CDR converter. Whether you need to convert between CorelDRAW versions or use our CDR to EPS converter, we've got you covered.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gray-800/70 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 ease-in-out"
            >
              <feature.icon className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
