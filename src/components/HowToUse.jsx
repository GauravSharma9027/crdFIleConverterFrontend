import React from "react";
import { motion } from "framer-motion";
import { FileUp, ArrowRight, Download, Shield, CheckCircle, AlertTriangle } from "lucide-react";

const HowToUse = () => {
  const steps = [
    {
      icon: FileUp,
      title: "Upload Your CDR File",
      description: "Drag and drop your CorelDRAW file or click 'Browse Files' to select"
    },
    {
      icon: ArrowRight,
      title: "Choose Output Format",
      description: "Select your desired output format (CDR version or EPS)"
    },
    {
      icon: Download,
      title: "Download Converted File",
      description: "Click 'Download' to save your converted file"
    }
  ];

  const supportedFormats = [
    "CorelDRAW X3 (13)",
    "CorelDRAW X4 (14)",
    "CorelDRAW X5 (15)",
    "CorelDRAW X6 (16)",
    "CorelDRAW X7 (17)",
    "CorelDRAW X8 (18)",
    "CorelDRAW 2017-2022",
    "EPS Format"
  ];

  const tips = [
    "Make sure your CDR file is not corrupted",
    "Files should be under 500MB",
    "Keep original files as backup",
    "Check output format compatibility",
    "Use latest CDR version for best results"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-8 text-center">How to Convert CDR Files</h2>

        {/* Step by Step Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-lg p-6"
            >
              <div className="flex items-center mb-4">
                <step.icon className="w-8 h-8 text-blue-500 mr-3" />
                <h3 className="text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Supported Formats */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
            <h3 className="text-xl font-semibold">Supported Formats</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {supportedFormats.map((format, index) => (
              <div
                key={index}
                className="bg-gray-800/30 rounded-lg p-4 text-center text-sm"
              >
                {format}
              </div>
            ))}
          </div>
        </div>

        {/* Important Tips */}
        <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
            <h3 className="text-lg font-semibold">Important Tips</h3>
          </div>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Troubleshooting */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Common Issues & Solutions</h3>
          <div className="space-y-4">
            <div className="bg-gray-800/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">File Not Converting?</h4>
              <p className="text-gray-400">Make sure your file is a valid CDR file and not corrupted. Try saving it in a different CDR version first.</p>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Conversion Taking Too Long?</h4>
              <p className="text-gray-400">Large files may take longer to process. Try reducing file size or simplifying complex designs.</p>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Need More Help?</h4>
              <p className="text-gray-400">Contact our support team at support@cdrconverter.com for assistance.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HowToUse;