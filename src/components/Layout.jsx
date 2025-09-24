import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;