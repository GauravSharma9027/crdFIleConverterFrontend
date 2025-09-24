import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Smith",
      position: "Creative Director",
      company: "Design Studio Pro",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5,
      text: "The best CDR converter I've ever used. It's fast, reliable, and the output quality is exceptional. A must-have tool for any design professional."
    },
    {
      name: "Sarah Johnson",
      position: "Art Director",
      company: "Creative Solutions Inc",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5,
      text: "This converter has saved our team countless hours. The enterprise features are exactly what we needed for our large-scale projects."
    },
    {
      name: "Michael Chen",
      position: "Production Manager",
      company: "Print Masters Ltd",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5,
      text: "The batch conversion feature is a game-changer. We process hundreds of files daily, and this tool handles them flawlessly."
    }
  ];

  const trustedCompanies = [
    "Adobe Systems",
    "Design Corp",
    "Creative Cloud",
    "Print Solutions",
    "Digital Arts Inc",
    "Studio Pro"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-4"
        >
          What Our Users Say
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg"
        >
          Learn from the feedback of our satisfied enterprise clients
        </motion.p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl p-8 border border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <p className="text-gray-400 text-sm">{testimonial.position}</p>
                <p className="text-blue-400 text-sm">{testimonial.company}</p>
              </div>
            </div>

            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>

            <div className="relative">
              <Quote className="w-8 h-8 text-blue-500/20 absolute -top-4 -left-2" />
              <p className="text-gray-300 italic relative z-10 pl-6">
                "{testimonial.text}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trusted Companies */}
      <div className="text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold mb-8"
        >
          Trusted by Industry Leaders
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {trustedCompanies.map((company, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center border border-gray-700/30"
            >
              <span className="text-gray-400 font-semibold">{company}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mt-16"
      >
        <p className="text-gray-400 mb-4">
          Join thousands of satisfied businesses using our converter
        </p>
        <div className="flex items-center justify-center space-x-4">
          <div className="bg-blue-500/10 rounded-lg px-4 py-2">
            <span className="text-2xl font-bold text-blue-400">100K+</span>
            <p className="text-sm text-gray-400">Files Converted</p>
          </div>
          <div className="bg-blue-500/10 rounded-lg px-4 py-2">
            <span className="text-2xl font-bold text-blue-400">50K+</span>
            <p className="text-sm text-gray-400">Happy Users</p>
          </div>
          <div className="bg-blue-500/10 rounded-lg px-4 py-2">
            <span className="text-2xl font-bold text-blue-400">99.9%</span>
            <p className="text-sm text-gray-400">Success Rate</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Testimonials;