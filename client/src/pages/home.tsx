import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { HeartsBackground } from "@/components/ui/hearts-background";
import { CardContainer } from "@/components/card-container";
import { TabContent } from "@/components/tab-content";
import { motion } from "framer-motion";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  
  // Load Font Awesome script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  const handleExplore = () => {
    setShowContent(true);
  };
  
  const handleBackToCard = () => {
    setShowContent(false);
  };
  
  return (
    <>
      <Helmet>
        <title>For Zobiya ♥</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      
      <HeartsBackground />
      
      <div className="container mx-auto p-4 md:p-6 relative z-10">
        {/* Header */}
        <motion.header 
          className="text-center mb-8 mt-4 md:mt-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-quicksand font-bold text-3xl md:text-4xl text-coral mb-2 floating">
            For Zobiya <span className="text-soft-pink">♥</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            A special gift to brighten your day
          </p>
        </motion.header>
        
        {/* Main Content */}
        {!showContent ? (
          <CardContainer onExplore={handleExplore} />
        ) : (
          <TabContent onBack={handleBackToCard} />
        )}
      </div>
    </>
  );
}
