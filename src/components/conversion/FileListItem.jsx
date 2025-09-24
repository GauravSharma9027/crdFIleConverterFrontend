import React from "react";
import { motion } from "framer-motion";
import { FileImage as FileIcon, Check, Trash2 } from 'lucide-react';

const FileListItem = ({ fileInfo, onRemoveFile }) => {
  return (
    <motion.div
      key={fileInfo.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center justify-between bg-gray-800/30 rounded-xl p-6 border border-gray-700/50"
    >
      <div className="flex items-center">
        <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
          <FileIcon className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <span className="font-medium">{fileInfo.file.name}</span>
          <span className="text-sm text-gray-400 ml-2">
            ({(fileInfo.file.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {fileInfo.status === 'converted' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-green-500/10 p-2 rounded-lg"
          >
            <Check className="w-5 h-5 text-green-400" />
          </motion.div>
        )}
        <button
          onClick={() => onRemoveFile(fileInfo.id)}
          className="bg-red-500/10 p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default FileListItem;