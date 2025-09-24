import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, FileQuestion, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const Support = () => {
  const { toast } = useToast();

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: () => {
        window.open('https://cdrconverter.com/chat', '_blank');
        toast({
          title: "Opening live chat",
          description: "Connecting you to our support team"
        });
      }
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your questions anytime",
      action: () => {
        window.location.href = 'mailto:support@cdrconverter.com';
        toast({
          title: "Opening email client",
          description: "You can email us at support@cdrconverter.com"
        });
      }
    },
    {
      icon: FileQuestion,
      title: "FAQ",
      description: "Find answers to common questions",
      action: () => {
        window.open('/faq', '_blank');
        toast({
          title: "Opening FAQ",
          description: "Redirecting to frequently asked questions"
        });
      }
    },
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Detailed guides and tutorials",
      action: () => {
        window.open('/docs', '_blank');
        toast({
          title: "Opening documentation",
          description: "Redirecting to our comprehensive guides"
        });
      }
    }
  ];

  return (
    <section id="support" className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Support</h2>
        <p className="text-center text-gray-400 mb-8">
          Need help? Our support team is here to assist you 24/7. Choose your preferred way to get in touch.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-xl p-6"
            >
              <option.icon className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
              <p className="text-gray-400 mb-4">{option.description}</p>
              <Button 
                variant="outline" 
                className="w-full hover:bg-blue-600 hover:text-white transition-colors"
                onClick={option.action}
              >
                {option.title}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;