
import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { convertFile } from "@/lib/fileConverter";

import PremiumFeaturesBanner from "@/components/conversion/PremiumFeaturesBanner";
import StatsDisplay from "@/components/conversion/StatsDisplay";
import ProcessStepsDisplay from "@/components/conversion/ProcessStepsDisplay";
import UploadArea from "@/components/conversion/UploadArea";
import SettingsPanel from "@/components/conversion/SettingsPanel";
import UploadedFilesList from "@/components/conversion/UploadedFilesList";
import ConvertedFilesList from "@/components/conversion/ConvertedFilesList";
import PremiumHighlightsDisplay from "@/components/conversion/PremiumHighlightsDisplay";

const corelVersionsData = [
  { value: '13', label: 'CorelDRAW X3 (13)' }, { value: '14', label: 'CorelDRAW X4 (14)' },
  { value: '15', label: 'CorelDRAW X5 (15)' }, { value: '16', label: 'CorelDRAW X6 (16)' },
  { value: '17', label: 'CorelDRAW X7 (17)' }, { value: '18', label: 'CorelDRAW X8 (18)' },
  { value: '19', label: 'CorelDRAW 2017' }, { value: '20', label: 'CorelDRAW 2018' },
  { value: '21', label: 'CorelDRAW 2019' }, { value: '22', label: 'CorelDRAW 2020' },
  { value: '23', label: 'CorelDRAW 2021' }, { value: '24', label: 'CorelDRAW 2022' },
  { value: '25', label: 'CorelDRAW 2023' }, { value: '26', label: 'CorelDRAW 2024' },
  { value: '27', label: 'CorelDRAW 2025' }
];

const MAX_FILE_SIZE_MB = 1; // 1MB for display
const MAX_FILE_SIZE_BYTES = 1000000; // 1 million bytes

const ConversionOptions = () => {
  const [files, setFiles] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [converting, setConverting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('cdr');
  const [targetVersion, setTargetVersion] = useState('13');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback((incomingFiles) => {
    const validFiles = incomingFiles.filter(file => {
      const isValidType = file.name.toLowerCase().endsWith('.cdr') || file.name.toLowerCase().endsWith('.eps');
      const isValidSize = file.size <= MAX_FILE_SIZE_BYTES;

      if (!isValidType) {
        toast({ title: "Invalid file type", description: `${file.name} is not a CDR or EPS file.`, variant: "destructive" });
        return false;
      }
      if (!isValidSize) {
        toast({ title: "File too large", description: `${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit.`, variant: "destructive" });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const fileObjects = validFiles.map(file => ({
      id: `${file.name}-${file.size}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...fileObjects]);
    toast({ title: "Files added", description: `Added ${validFiles.length} file(s).`, variant: "default" });
  }, [toast]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFiles(Array.from(e.dataTransfer.files));
  }, [processFiles]);

  const handleBrowseFiles = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback((e) => {
    processFiles(Array.from(e.target.files || []));
    e.target.value = null; 
  }, [processFiles]);

  const handleRemoveFile = useCallback((id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setConvertedFiles(prev => prev.filter(f => f.id !== id));
    toast({ title: "File removed", description: "File has been removed from the list.", variant: "default" });
  }, [toast]);

  const handleDownload = useCallback((convertedFile) => {
    const url = URL.createObjectURL(convertedFile.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = convertedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Download started", description: `Downloading ${convertedFile.name}.`, variant: "default" });
  }, [toast]);

  const handleConvert = async () => {
    const filesToConvert = files.filter(f => f.status === 'pending');
    if (filesToConvert.length === 0) {
      toast({ title: "No files to convert", description: "Please add new files or all files are already converted.", variant: "destructive" });
      return;
    }

    setConverting(true);
    let newConvertedItems = [];
    let filesSuccessfullyConvertedCount = 0;

    for (const fileInfo of filesToConvert) {
      try {
        toast({ title: "Converting...", description: `Processing ${fileInfo.file.name}...` });
        const convertedBlob = await convertFile(fileInfo.file, selectedFormat, targetVersion);
        
        const baseName = fileInfo.file.name.substring(0, fileInfo.file.name.lastIndexOf('.'));
        const newFileName = selectedFormat === 'eps' 
          ? `${baseName}.eps`
          : `${baseName}_${targetVersion}.${selectedFormat}`;

        const convertedItem = {
          id: fileInfo.id, name: newFileName, originalName: fileInfo.file.name,
          size: convertedBlob.size, blob: convertedBlob, status: 'converted'
        };
        newConvertedItems.push(convertedItem);
        filesSuccessfullyConvertedCount++;
        
        setFiles(prev => prev.map(f => f.id === fileInfo.id ? { ...f, status: 'converted' } : f));
        toast({ title: "File Converted", description: `Successfully converted ${fileInfo.file.name}.` });

      } catch (error) {
        console.error('Conversion error for file:', fileInfo.file.name, error);
        setFiles(prev => prev.map(f => f.id === fileInfo.id ? { ...f, status: 'failed' } : f));
        toast({
          title: "Conversion Failed",
          description: `Failed to convert ${fileInfo.file.name}: ${error.message}`,
          variant: "destructive"
        });
      }
    }
    
    if (newConvertedItems.length > 0) {
       setConvertedFiles(prev => [...prev, ...newConvertedItems]);
    }

    if (filesSuccessfullyConvertedCount > 0) {
        toast({ title: "Conversion Complete", description: `Successfully converted ${filesSuccessfullyConvertedCount} file(s).` });
    } else if (filesToConvert.length > 0) {
        toast({ title: "Conversion Process Finished", description: "No files were successfully converted in this batch.", variant: "destructive" });
    }

    setConverting(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl relative overflow-hidden"
      >
        <PremiumFeaturesBanner />
        <StatsDisplay />
        <ProcessStepsDisplay />
        
        <UploadArea
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onBrowseFiles={handleBrowseFiles}
          fileInputRef={fileInputRef}
          onFileSelect={handleFileSelect}
        />

        <SettingsPanel
          selectedFormat={selectedFormat}
          onFormatChange={(e) => setSelectedFormat(e.target.value)}
          targetVersion={targetVersion}
          onVersionChange={(e) => setTargetVersion(e.target.value)}
          corelVersions={corelVersionsData}
        />

        <UploadedFilesList files={files} onRemoveFile={handleRemoveFile} />

        <div className="flex justify-center mb-8">
          <Button
            onClick={handleConvert}
            disabled={converting || files.filter(f => f.status === 'pending').length === 0}
            className={`
              min-w-[200px] py-6 text-lg font-semibold
              ${(converting || files.filter(f => f.status === 'pending').length === 0)
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }
              transition-all duration-300
            `}
          >
            {converting ? (
              <div className="flex items-center justify-center">
                <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                Converting...
              </div>
            ) : (
              'Convert Files'
            )}
          </Button>
        </div>

        <ConvertedFilesList convertedFiles={convertedFiles} onDownload={handleDownload} />
        <PremiumHighlightsDisplay />
      </motion.div>
    </div>
  );
};

export default ConversionOptions;
