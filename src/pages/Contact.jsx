import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "../components/ui/button";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-300 mb-6">
            We're here to help! Send us your questions or feedback, and we'll get back to you as soon as possible.
          </p>
          
          <div className="flex items-center gap-2 text-gray-300">
            <Mail className="w-5 h-5" />
            <a href="mailto:support@cdrconverter.com" className="hover:text-blue-400">
              support@cdrconverter.com
            </a>
          </div>
        </section>

        <section className="bg-gray-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                placeholder="Your message..."
              ></textarea>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Send Message
            </Button>
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Response Time</h2>
          <p className="text-gray-300">
            We typically respond within 24 hours during business days. For urgent matters, please include "URGENT" in your subject line.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Contact;