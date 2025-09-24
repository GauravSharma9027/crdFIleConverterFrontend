import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileListItem from "./FileListItem";

const UploadedFilesList = ({ files, onRemoveFile }) => {
  return (
    <AnimatePresence>
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-6">Selected Files</h3>
          <div className="space-y-3">
            {files.map((fileInfo) => (
              <FileListItem 
                key={fileInfo.id}
                fileInfo={fileInfo}
                onRemoveFile={onRemoveFile}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadedFilesList;