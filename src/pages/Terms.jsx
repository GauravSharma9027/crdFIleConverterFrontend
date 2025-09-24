import React from "react";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
      
      <div className="space-y-6 text-gray-300">
        <section>
          <p className="mb-4">Effective Date: {new Date().toLocaleDateString()}</p>
          <p>Please read these Terms and Conditions carefully before using CDR Converter (https://cdrconverter.com).</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using our website, you agree to comply with these terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Services Provided</h2>
          <p>We offer online CDR file conversion tools. You are responsible for using the tool lawfully.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <ul className="list-disc pl-6 mt-2">
            <li>Do not upload illegal or copyrighted material</li>
            <li>Use the service as intended</li>
            <li>You must be at least 18 years old to use this service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
          <p>We are not responsible for any loss or damage resulting from using our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p>All content on this site, including the tool, is the property of CDR Converter.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Modifications</h2>
          <p>We reserve the right to update these terms at any time.</p>
        </section>
      </div>
    </motion.div>
  );
};

export default Terms;