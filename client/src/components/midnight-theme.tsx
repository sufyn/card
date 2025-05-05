import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function MidnightTheme() {
  const [isNightMode, setIsNightMode] = useState(false);
  const [moonPhase, setMoonPhase] = useState<number>(0);
  const [starCount, setStarCount] = useState<number>(20);
  const [stars, setStars] = useState<{ id: number; size: number; top: string; left: string; delay: number }[]>([]);
  
  // Create stars for the night sky
  useEffect(() => {
    if (isNightMode) {
      const newStars = Array.from({ length: starCount }, (_, i) => ({
        id: i,
        size: Math.random() * 2 + 1,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5
      }));
      setStars(newStars);
    }
  }, [isNightMode, starCount]);
  
  // Moon phase options
  const moonPhases = [
    { name: "New Moon", icon: "🌑", description: "A new beginning, a clean slate between us." },
    { name: "Waxing Crescent", icon: "🌒", description: "Our friendship is growing stronger again." },
    { name: "First Quarter", icon: "🌓", description: "We're halfway to resolving our issues." },
    { name: "Waxing Gibbous", icon: "🌔", description: "Almost back to the fullness of our friendship." },
    { name: "Full Moon", icon: "🌕", description: "Our bond is complete and strong once more." },
    { name: "Waning Gibbous", icon: "🌖", description: "Letting go of past hurts." },
    { name: "Last Quarter", icon: "🌗", description: "Reflecting on what's important to us." },
    { name: "Waning Crescent", icon: "🌘", description: "Preparing for a new chapter in our story." }
  ];
  
  const handleNightModeToggle = () => {
    setIsNightMode(!isNightMode);
    
    if (!isNightMode) {
      toast({
        title: "Night Mode Activated",
        description: "Experience the beauty of the night, just for you."
      });
    } else {
      toast({
        title: "Day Mode Restored",
        description: "Back to the light."
      });
    }
  };
  
  const cycleMoonPhase = () => {
    setMoonPhase((prev) => (prev + 1) % moonPhases.length);
    
    toast({
      title: moonPhases[(moonPhase + 1) % moonPhases.length].name,
      description: moonPhases[(moonPhase + 1) % moonPhases.length].description
    });
  };
  
  const addMoreStars = () => {
    if (starCount < 100) {
      setStarCount(prev => Math.min(prev + 10, 100));
      toast({
        title: "Stars Added",
        description: "The night sky grows brighter."
      });
    } else {
      toast({
        title: "Maximum Stars",
        description: "The sky is already filled with stars."
      });
    }
  };
  
  return (
    <motion.div 
      className={`rounded-xl shadow-md p-6 mb-6 relative overflow-hidden transition-colors duration-700 ${
        isNightMode ? 'bg-gray-900 text-white' : 'bg-white'
      }`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Night sky with stars */}
      {isNightMode && (
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: star.top,
                left: star.left,
                opacity: 0.7
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: star.delay
              }}
            />
          ))}
          
          {/* Clouds */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-900/80 to-transparent opacity-50"></div>
          <div className="cloud absolute opacity-20" style={{ top: '20%', left: '15%', transform: 'scale(0.6)' }}></div>
          <div className="cloud absolute opacity-30" style={{ top: '40%', left: '80%', transform: 'scale(0.8)' }}></div>
        </div>
      )}
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className={`font-quicksand font-bold text-xl ${isNightMode ? 'text-white' : 'text-coral'} flex items-center`}>
            <i className={`fas ${isNightMode ? 'fa-moon' : 'fa-sun'} mr-2`}></i> 
            {isNightMode ? 'Midnight Theme' : 'Day Theme'}
          </h3>
          
          <Button 
            onClick={handleNightModeToggle}
            variant="outline"
            className={`rounded-full ${
              isNightMode 
                ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
                : 'bg-white text-lavender hover:bg-lavender/10'
            }`}
          >
            <i className={`fas ${isNightMode ? 'fa-sun' : 'fa-moon'} mr-2`}></i>
            {isNightMode ? 'Switch to Day' : 'Switch to Night'}
          </Button>
        </div>
        
        <div className={`p-5 rounded-lg mb-6 ${isNightMode ? 'bg-gray-800' : 'bg-warm-gray'}`}>
          <div className="text-center mb-4">
            <span className="text-6xl">{moonPhases[moonPhase].icon}</span>
            <h4 className={`font-quicksand font-semibold text-xl mt-2 ${isNightMode ? 'text-white' : 'text-gray-700'}`}>
              {moonPhases[moonPhase].name}
            </h4>
          </div>
          
          <p className={`text-center italic ${isNightMode ? 'text-gray-300' : 'text-gray-600'}`}>
            "{moonPhases[moonPhase].description}"
          </p>
          
          {isNightMode && (
            <div className="mt-4 text-center">
              <p className="font-urdu text-xl" style={{ direction: 'rtl' }}>
                چاند کی روشنی میں یادیں تازہ ہوتی ہیں
              </p>
              <p className="text-xs italic text-gray-400 mt-1">
                (Memories are refreshed in the moonlight)
              </p>
            </div>
          )}
        </div>
        
        {isNightMode && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button 
              onClick={cycleMoonPhase}
              className="bg-gray-800 text-white hover:bg-gray-700"
            >
              <i className="fas fa-sync-alt mr-2"></i> Change Moon Phase
            </Button>
            
            <Button 
              onClick={addMoreStars}
              className="bg-gray-800 text-white hover:bg-gray-700"
            >
              <i className="fas fa-star mr-2"></i> Add More Stars
            </Button>
          </div>
        )}
        
        <div className="text-center">
          <p className={`text-sm ${isNightMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {isNightMode 
              ? "Like your love for the night sky, my care for you never fades." 
              : "Toggle to night mode to experience the beauty of the moon and stars."
            }
          </p>
          
          {isNightMode && (
            <div className="mt-4 flex justify-center">
              <div className="inline-block text-center px-4 py-2 rounded-lg bg-black/30">
                <span className="text-lg">☕ + 🌙 + 🌹</span>
                <p className="text-xs text-gray-400 mt-1">Coffee under the moonlight with roses</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}