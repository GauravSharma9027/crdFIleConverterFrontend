import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 py-16 text-gray-200"
    >
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4">
          About CDR Converter
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Your trusted partner for seamless CorelDRAW file conversions. We empower designers and businesses by making file compatibility effortless.
        </p>
      </header>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-lg text-gray-300 mb-4">
              At CDR Converter, our mission is to provide a fast, reliable, and user-friendly solution for converting CorelDRAW files. We understand the challenges of file format incompatibilities and strive to eliminate these barriers, allowing you to focus on your creative work.
            </p>
            <p className="text-lg text-gray-300">
              We are dedicated to continuous improvement, ensuring our tool supports the latest CorelDRAW versions and offers the highest quality conversions.
            </p>
          </div>
          <div className="flex justify-center">
            <Target className="w-48 h-48 text-blue-500 opacity-80" />
          </div>
        </div>
      </section>

      <section className="mb-16 bg-gray-800/30 backdrop-blur-md p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Zap className="w-16 h-16 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">Speed & Efficiency</h3>
            <p className="text-gray-400">
              Convert your files in seconds. Our optimized process ensures quick turnarounds without compromising quality.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Users className="w-16 h-16 text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-white">User-Friendly</h3>
            <p className="text-gray-400">
              An intuitive interface makes file conversion simple for everyone, regardless of technical expertise.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
            <h3 className="text-xl font-semibold mb-2 text-white">Secure & Reliable</h3>
            <p className="text-gray-400">
              Your files are processed securely, and we ensure the integrity of your data throughout the conversion.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Join Our Community</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
          We're more than just a tool; we're a community of creators. Stay updated with our latest features and tips.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        >
          Contact Us
        </Link>
      </section>
    </motion.div>
  );
};

export default AboutPage;