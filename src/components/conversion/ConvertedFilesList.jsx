import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConvertedFileListItem from "./ConvertedFileListItem";

const ConvertedFilesList = ({ convertedFiles, onDownload }) => {
  return (
    <AnimatePresence>
      {convertedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <h3 className="text-xl font-semibold mb-6">Converted Files</h3>
          <div className="space-y-3">
            {convertedFiles.map((convertedFile) => (
              <ConvertedFileListItem
                key={convertedFile.id}
                convertedFile={convertedFile}
                onDownload={onDownload}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConvertedFilesList;