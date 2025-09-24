import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Image Upscaler", href: "/image-upscaler" },
    { name: "Background Remover", href: "/background-remover" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="text-xl font-bold text-white">CDR Converter</span>
            <p className="text-gray-400 text-sm mt-2">
              Fast and secure file conversion tools. From CDR files to AI-powered image enhancement.
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold text-white mb-4">Quick Links</p>
            <ul className="space-y-2">
              {mainLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-lg font-semibold text-white mb-4">Legal</p>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p className="mb-2">Developed by CDR Converter Team</p>
          <p>© {currentYear} CDRConverter.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;