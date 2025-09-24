import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Welcome to CDR Converter</h2>
          <p>We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 mt-2">
            <li>Personal Information (Name, Email Address)</li>
            <li>Usage Data (Browser type, IP address, pages visited)</li>
            <li>Uploaded Files (for conversion purposes only)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 mt-2">
            <li>To provide and improve our file conversion services</li>
            <li>To communicate with you</li>
            <li>To comply with legal obligations</li>
            <li>For website analytics and security purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies & Tracking</h2>
          <p>We use cookies and similar technologies to enhance your experience and for analytics purposes.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p>We may use trusted third-party services like payment gateways and analytics providers.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Data Rights</h2>
          <p>You have the right to access, correct, or delete your personal information.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>For questions, contact us at: support@cdrconverter.com</p>
        </section>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;