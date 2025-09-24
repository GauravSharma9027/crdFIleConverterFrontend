import React from "react";
import ConversionOptions from "@/components/ConversionOptions";
import HowToUse from "@/components/HowToUse";
import Testimonials from "@/components/Testimonials";
import SEOContent from "@/components/SEOContent";
import CdrArticle from "@/components/CdrArticle";

const HomePage = () => {
  return (
    <>
      <div id="conversion-tool">
        <ConversionOptions />
      </div>
      <HowToUse />
      <CdrArticle />
      <Testimonials />
      <SEOContent />
    </>
  );
};

export default HomePage;