import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Image Upscaler", href: "/image-upscaler" },
    { name: "Background Remover", href: "/background-remover" },
    { name: "CRD Converter", href: "/CDRConverter" }
  ];

  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-950 shadow-lg backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              CDR Converter
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;