import React from "react";
import { motion } from "framer-motion";

const Disclaimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-3xl font-bold mb-8">Disclaimer</h1>
      
      <div className="space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold mb-4">General Information</h2>
          <p>The information and services provided on https://cdrconverter.com are for general information purposes only.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">No Guarantees</h2>
          <p>We do not guarantee the accuracy, completeness, or suitability of the converted files.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Responsibility</h2>
          <p>Users are responsible for ensuring the output meets their needs.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p>We are not liable for any loss or damage incurred from using the website.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">File Safety</h2>
          <p>Always backup your original files before using our services.</p>
        </section>
      </div>
    </motion.div>
  );
};

export default Disclaimer;