import React from "react";
import { motion } from "framer-motion";
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";

const UploadArea = ({ 
  isDragging, 
  onDragOver, 
  onDragEnter, 
  onDragLeave, 
  onDrop, 
  onBrowseFiles, 
  fileInputRef, 
  onFileSelect 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative border-2 border-dashed rounded-xl p-12 text-center mb-12 transition-all duration-300 ${
        isDragging 
          ? "border-blue-500 bg-blue-500/10" 
          : "border-gray-600 hover:border-gray-500"
      }`}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        className="hidden"
        multiple
        accept=".cdr,.eps"
      />
      
      <motion.div
        animate={{
          scale: isDragging ? 1.1 : 1,
          rotate: isDragging ? 5 : 0
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <Upload className="w-16 h-16 text-blue-400 mx-auto mb-6" />
      </motion.div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {isDragging ? "Drop your files here" : "Drag and drop your files here"}
      </h3>
      <p className="text-gray-400 text-sm mb-6">or</p>
      <Button 
        onClick={onBrowseFiles}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
      >
        Browse Files
      </Button>
      
      <p className="text-gray-400 text-sm mt-4">
        Supported formats: CDR, EPS (Max 500MB)
      </p>
    </motion.div>
  );
};

export default UploadArea;