import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Zap, Image as ImageIcon, ShoppingCart, Users, Palette, CheckCircle, HelpCircle, Download, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { removeBackground } from "@/lib/backgroundRemover";

const BackgroundRemoverPage = () => {
  const { toast } = useToast();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [processedImagePreview, setProcessedImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalFileName, setOriginalFileName] = useState("");

  const handleFileChange = (files) => {
    const file = files[0];
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/webp"];

    if (!file) return;

    if (!SUPPORTED_FORMATS.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PNG, JPEG, or WebP image.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setImage(file);
    setOriginalFileName(file.name);
    setProcessedImagePreview(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleDownload = () => {
    if (!processedImagePreview) return;
    const link = document.createElement("a");
    link.href = processedImagePreview;
    const fileName = `bg-removed-${originalFileName.split('.').slice(0, -1).join('.')}.png`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
        title: "Download Started!",
        description: "Your background-removed image is being downloaded."
    });
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
    setProcessedImagePreview(null);
    setIsProcessing(false);
    setOriginalFileName("");
  };
  
  const handleProcessImage = async () => {
    if (!image) return;
    setIsProcessing(true);
    setProcessedImagePreview(null);
    try {
      const processedUrl = await removeBackground(image);
      setProcessedImagePreview(processedUrl);
      toast({
        title: "Background Removed!",
        description: "Your image is ready for download.",
      });
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: error.message || "Could not remove background. Please try another image.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const benefits = [
    {
      icon: ShoppingCart,
      title: "E-commerce Product Photos",
      description: "Create clean, professional product images with a uniform background for your online store, boosting sales and consistency.",
    },
    {
      icon: Users,
      title: "Social Media Profiles",
      description: "Make your profile picture pop by removing distracting backgrounds. Perfect for LinkedIn, Instagram, and Facebook.",
    },
    {
      icon: Palette,
      title: "Graphic Design Projects",
      description: "Easily isolate subjects from their background to use in collages, banners, presentations, and other creative work.",
    },
  ];

  const steps = [
    {
      title: "1. Upload Your Image",
      description: "Click the upload button and select the image you want to edit. Our tool supports PNG, JPEG, and WebP formats.",
    },
    {
      title: "2. AI-Powered Removal",
      description: "Our smart AI automatically detects the main subject and precisely removes the background in just a few seconds.",
    },
    {
      title: "3. Download Your New Image",
      description: "Your new image with a transparent background is ready! Download it in high-resolution PNG format for free.",
    },
  ];

  const faqs = [
    {
      question: "Is this background remover tool free to use?",
      answer: "Yes, our online background remover is completely free for everyone. You can process as many images as you like without any hidden charges or subscriptions.",
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Absolutely! Our tool is fully responsive and works seamlessly on all devices, including smartphones and tablets. You can remove backgrounds on the go.",
    },
    {
      question: "What file formats are supported?",
      answer: "We support the most popular image formats, including PNG, JPEG, and WebP. For the best results with a transparent background, we recommend downloading your final image as a PNG.",
    },
    {
      question: "Is my data secure?",
      answer: "We take your privacy very seriously. All uploaded images are processed securely and are automatically deleted from our servers within one hour of processing.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-12 text-gray-300"
    >
      <header className="text-center mb-16">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4"
        >
          AI Background Remover
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Erase image backgrounds instantly with our free, AI-powered tool. Create transparent backgrounds in one click.
        </motion.p>
      </header>
      
      <main className="bg-gray-800/20 glass-effect p-8 rounded-2xl shadow-2xl border border-gray-700/50 mb-16">
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
                    className="w-full border-2 border-dashed border-gray-600 rounded-xl p-10 text-center cursor-pointer hover:border-pink-400 hover:bg-gray-800/40 transition-all duration-300"
                >
                    <input type="file" className="hidden" id="file-upload-bg" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileChange(e.target.files)} />
                    <label htmlFor="file-upload-bg" className="flex flex-col items-center justify-center cursor-pointer">
                        <UploadCloud className="w-16 h-16 text-pink-400 mb-4" />
                        <h3 className="text-2xl font-semibold text-white">Drag & drop your image</h3>
                        <p className="text-gray-400 mt-1">or click to upload</p>
                        <p className="text-xs text-gray-500 mt-4">Supports: PNG, JPEG, WebP. Max 10MB.</p>
                    </label>
                </motion.div>
            ) : (
                <motion.div
                    key="editor"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-white mb-2">Original</h3>
                            <div className="w-full aspect-video bg-gray-900/50 rounded-xl flex items-center justify-center">
                                <img src={imagePreview} alt="Original Preview" className="max-w-full max-h-full object-contain rounded-md" />
                            </div>
                        </div>
                        <div className="text-center relative">
                            <h3 className="text-lg font-bold text-white mb-2">Background Removed</h3>
                            <div className="w-full aspect-video bg-gray-900/50 rounded-xl flex items-center justify-center bg-grid-white" style={{ backgroundSize: '20px 20px' }}>
                                {isProcessing && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl"
                                    >
                                        <RefreshCw className="w-12 h-12 text-pink-400 animate-spin mb-4" />
                                        <p className="text-lg text-white font-semibold">Removing background...</p>
                                    </motion.div>
                                )}
                                {processedImagePreview ? (
                                    <img src={processedImagePreview} alt="Processed Preview" className="max-w-full max-h-full object-contain rounded-md" />
                                ) : (
                                    !isProcessing && <div className="flex flex-col items-center text-gray-500">
                                        <ImageIcon size={48} />
                                        <p>Processed image will appear here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                     <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
                        <Button onClick={handleProcessImage} size="lg" className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold hover:scale-105 transition-transform" disabled={isProcessing || !imagePreview || processedImagePreview}>
                            <Zap className="mr-2 h-5 w-5" /> Remove Background
                        </Button>
                        {processedImagePreview && (
                            <Button onClick={handleDownload} size="lg" variant="secondary" className="w-full md:w-auto">
                                <Download className="mr-2 h-5 w-5" /> Download Image
                            </Button>
                        )}
                    </div>
                    <Button variant="ghost" size="icon" className="absolute top-0 right-0 m-1 z-20" onClick={handleReset}>
                        <X className="w-5 h-5" />
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
      </main>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Why Remove Image Backgrounds?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="bg-gray-800/30 p-6 rounded-xl text-center"
            >
              <div className="flex justify-center mb-4">
                <benefit.icon className="w-12 h-12 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">How It Works: A Simple 3-Step Guide</h2>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-700" aria-hidden="true"></div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center bg-gray-800/50 p-6 rounded-xl z-10">
                <h3 className="text-2xl font-bold text-pink-400 mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-800/30 p-6 rounded-xl">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center"><ImageIcon className="mr-3 text-pink-400" /> Supported Formats</h3>
          <p className="text-gray-400 mb-4">Our AI background remover works with the most common image file types. For best results, upload a high-quality image.</p>
          <div className="flex space-x-4">
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">PNG</span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">JPEG</span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">WebP</span>
          </div>
          <p className="text-sm text-gray-500 mt-4">Maximum file size: 10MB.</p>
        </div>
        <div className="bg-gray-800/30 p-6 rounded-xl">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center"><CheckCircle className="mr-3 text-pink-400" /> Tips for Best Results</h3>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Use images where the subject has clear edges.</li>
            <li>Good contrast between the subject and background helps.</li>
            <li>Avoid blurry or low-resolution photos.</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">What is an AI Background Remover?</h2>
        <div className="max-w-3xl mx-auto text-gray-400 space-y-4 text-lg">
            <p>An AI background remover is a sophisticated tool that uses artificial intelligence to automatically identify and isolate the main subject of a photo from its background. Unlike traditional manual editing tools that require complex selections with a lasso or magic wand, an AI tool does all the heavy lifting for you. It analyzes the pixels, understands the context of the image, and intelligently separates the foreground from the background with remarkable precision.</p>
            <p>This technology, often referred to as "semantic segmentation," allows our tool to handle tricky details like hair, fur, and complex edges that are notoriously difficult to edit by hand. The result is a clean, professional cutout with a transparent background that you can use in any project. Whether you want to erase the background from an image for a product catalog or create a stunning profile picture, our AI background remover online makes the process fast, easy, and accessible to everyone, regardless of their technical skill.</p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center justify-center text-white">
          <HelpCircle className="w-8 h-8 mr-3 text-pink-400" />
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-gray-800/30 p-4 rounded-lg cursor-pointer">
              <summary className="font-semibold text-lg text-white">{faq.question}</summary>
              <p className="text-gray-400 mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default BackgroundRemoverPage;