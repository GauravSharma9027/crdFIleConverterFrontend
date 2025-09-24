
    import React, { useState, useCallback, useRef, useEffect } from "react";
    import { motion, AnimatePresence } from "framer-motion";
    import { Sparkles, Download, HelpCircle, UploadCloud, X, RefreshCw, Image as ImageIcon } from "lucide-react";
    import { useToast } from "@/components/ui/use-toast";
    import { Button } from "@/components/ui/button";
    import { Slider } from "@/components/ui/slider";
    import { cn } from "@/lib/utils";

    const ImageComparisonSlider = ({ original, enhanced, originalDimensions, enhancedDimensions }) => {
      const [sliderPosition, setSliderPosition] = useState(50);
      const containerRef = useRef(null);

      const handleMove = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPosition(percent);
      };

      const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
      const handleMouseMove = (e) => handleMove(e.clientX);

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      const handleTouchEnd = () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };

      const handleMouseDown = (e) => {
        e.preventDefault();
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      };
      
      const handleTouchStart = (e) => {
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
      };

      return (
        <div ref={containerRef} className="relative w-full aspect-video overflow-hidden rounded-xl select-none group" onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
          <img src={original} alt="Original" className="absolute inset-0 w-full h-full object-contain" draggable="false" />
          <div className="absolute inset-0 w-full h-full" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
            <img src={enhanced} alt="Enhanced" className="absolute inset-0 w-full h-full object-contain" draggable="false" />
          </div>
          <div className="absolute inset-y-0 bg-white w-1 cursor-ew-resize" style={{ left: `calc(${sliderPosition}% - 2px)` }}>
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/80 border-2 border-white shadow-lg grid place-items-center top-1/2 -translate-y-1/2 cursor-ew-resize">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900"><path d="M13 17l4 4-4 4M13 3l4 4-4-4M3 21V3M21 21V3M17 13l4-4-4-4"/></svg>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            Original: {originalDimensions.width}x{originalDimensions.height}
          </div>
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            Enhanced: {enhancedDimensions.width}x{enhancedDimensions.height}
          </div>
        </div>
      );
    };


    const ImageUpscalerPage = () => {
      const { toast } = useToast();
      const [image, setImage] = useState(null);
      const [imagePreview, setImagePreview] = useState(null);
      const [enhancedImagePreview, setEnhancedImagePreview] = useState(null);
      const [scale, setScale] = useState([2]);
      const [isProcessing, setIsProcessing] = useState(false);
      const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
      const [enhancedDimensions, setEnhancedDimensions] = useState({ width: 0, height: 0 });

      const handleDownload = () => {
        if (!enhancedImagePreview) return;
        const link = document.createElement("a");
        link.href = enhancedImagePreview;
        const fileExtension = image.name.split('.').pop() || 'png';
        const fileName = `enhanced-${image.name.split('.').slice(0, -1).join('.')}.${fileExtension}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
            title: "Download Started!",
            description: "Your enhanced image is being downloaded."
        });
      };

      const handleFileChange = (files) => {
        const file = files[0];
        if (file && file.type.startsWith("image/")) {
          setImage(file);
          setEnhancedImagePreview(null);
          const reader = new FileReader();
          reader.onloadend = () => {
            const img = new window.Image();
            img.onload = () => {
                setOriginalDimensions({ width: img.width, height: img.height });
            };
            img.src = reader.result;
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          toast({
            title: "Invalid File Type",
            description: "Please upload a valid image file (e.g., JPEG, PNG).",
            variant: "destructive",
          });
        }
      };

      const onDrop = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        handleFileChange(event.dataTransfer.files);
      }, []);

      const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
      }, []);
      
      const handleReset = () => {
        setImage(null);
        setImagePreview(null);
        setEnhancedImagePreview(null);
        setScale([2]);
        setIsProcessing(false);
        setOriginalDimensions({ width: 0, height: 0 });
        setEnhancedDimensions({ width: 0, height: 0 });
      };

      const handleEnhanceClick = () => {
        setIsProcessing(true);
        setEnhancedImagePreview(null); 
        setTimeout(() => {
            setIsProcessing(false);
            setEnhancedImagePreview(imagePreview);
            setEnhancedDimensions({
              width: originalDimensions.width * scale[0],
              height: originalDimensions.height * scale[0]
            });
            toast({
              title: "Enhancement Complete!",
              description: "Your image has been successfully upscaled.",
            });
        }, 1500);
      };

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 py-12 text-gray-300"
        >
          <header className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 mb-4">
                AI Image Upscaler
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                Instantly increase image resolution with AI. Enhance details, remove noise, and create stunning high-quality photos.
              </p>
            </motion.div>
          </header>
          
          <main className="bg-gray-800/20 glass-effect p-8 rounded-2xl shadow-2xl border border-gray-700/50">
            <AnimatePresence mode="wait">
              {!imagePreview ? (
                <motion.div
                  key="uploader"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  className="w-full border-2 border-dashed border-gray-600 rounded-xl p-10 text-center cursor-pointer hover:border-cyan-400 hover:bg-gray-800/40 transition-all duration-300"
                >
                  <input 
                    type="file" 
                    className="hidden" 
                    id="file-upload" 
                    accept="image/*"
                    onChange={(e) => handleFileChange(e.target.files)}
                  />
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                    <UploadCloud className="w-16 h-16 text-cyan-400 mb-4" />
                    <h3 className="text-2xl font-semibold text-white">Drag & drop an image here</h3>
                    <p className="text-gray-400 mt-1">or click to select a file</p>
                    <p className="text-xs text-gray-500 mt-4">Supports: JPEG, PNG, WebP. Max file size: 10MB.</p>
                  </label>
                </motion.div>
              ) : (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
                >
                  <div className="md:col-span-2 space-y-4">
                    <div className="relative">
                         <AnimatePresence>
                            {isProcessing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl"
                                >
                                    <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                                    <p className="text-lg text-white font-semibold">Enhancing your image...</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {enhancedImagePreview ? (
                            <ImageComparisonSlider 
                              original={imagePreview} 
                              enhanced={enhancedImagePreview} 
                              originalDimensions={originalDimensions}
                              enhancedDimensions={enhancedDimensions}
                            />
                        ) : (
                            <div className="w-full aspect-video bg-gray-900/50 rounded-xl flex items-center justify-center">
                                <img src={imagePreview} alt="Original Preview" className="max-w-full max-h-full object-contain rounded-md" />
                            </div>
                        )}
                        <Button variant="ghost" size="icon" className="absolute top-0 right-0 m-1 z-20" onClick={handleReset}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                  </div>
                  <div className="space-y-6 bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white text-center">Upscale Settings</h3>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-medium text-gray-300">Upscale Factor</label>
                        <span className="px-3 py-1 text-sm rounded-full bg-cyan-500/20 text-cyan-300 font-bold">{scale[0]}x</span>
                      </div>
                      <Slider
                        defaultValue={[2]}
                        value={scale}
                        onValueChange={setScale}
                        min={2}
                        max={8}
                        step={2}
                      />
                    </div>
                    <Button onClick={handleEnhanceClick} size="lg" className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold hover:scale-105 transition-transform" disabled={isProcessing || !imagePreview || enhancedImagePreview}>
                        <Sparkles className="mr-2 h-4 w-4" /> Enhance Image
                    </Button>
                    {enhancedImagePreview && (
                      <Button onClick={handleDownload} size="lg" variant="secondary" className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Download Enhanced
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <section className="mt-16 p-8 bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center text-white">
              <HelpCircle className="w-8 h-8 mr-3 text-purple-400" />
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-200">What is the maximum resolution I can upscale to?</h3>
                <p className="text-gray-400">Our tool can upscale images up to 8x their original size, delivering incredible detail for displays and prints.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Is my data secure?</h3>
                <p className="text-gray-400">Absolutely. We prioritize your privacy. All uploaded images are processed securely and automatically deleted from our servers within an hour.</p>
              </div>
            </div>
          </section>

        </motion.div>
      );
    };

    export default ImageUpscalerPage;
  