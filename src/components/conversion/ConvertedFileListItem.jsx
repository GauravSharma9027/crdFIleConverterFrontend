import React from "react";
import { motion } from "framer-motion";
import { FileImage as FileIcon, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ConvertedFileListItem = ({ convertedFile, onDownload }) => {
  return (
    <motion.div
      key={convertedFile.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center justify-between bg-gray-800/30 rounded-xl p-6 border border-gray-700/50"
    >
      <div className="flex items-center">
        <div className="bg-green-500/10 p-3 rounded-lg mr-4">
          <FileIcon className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <span className="font-medium">{convertedFile.name}</span>
          <span className="text-sm text-gray-400 block">
            Converted from {convertedFile.originalName}
          </span>
        </div>
      </div>
      <Button
        onClick={() => onDownload(convertedFile)}
        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
      >
        <Download className="w-5 h-5 mr-2" />
        Download
      </Button>
    </motion.div>
  );
};

export default ConvertedFileListItem;