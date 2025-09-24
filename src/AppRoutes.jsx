import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import Disclaimer from "@/pages/Disclaimer";
import Contact from "@/pages/Contact";
import AboutPage from "@/pages/AboutPage";
import ImageUpscalerPage from "@/pages/ImageUpscalerPage";
import BackgroundRemoverPage from "@/pages/BackgroundRemoverPage";
import FileUploader from "./components/FileUploader";
import CDRConverter from "./pages/CDRConverter";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/image-upscaler" element={<ImageUpscalerPage />} />
    <Route path="/background-remover" element={<BackgroundRemoverPage />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<Terms />} />
    <Route path="/disclaimer" element={<Disclaimer />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/conversion" element={<FileUploader />} />
    <Route path="/CDRConverter" element={<CDRConverter />} />
  </Routes>
);

export default AppRoutes;