import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Favorite {
  id: number;
  name: string;
  icon: string;
  description: string;
  message: string;
}

export function FavoritesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const favorites: Favorite[] = [
    {
      id: 1,
      name: "Coffee",
      icon: "☕",
      description: "Your love for coffee reminds me of all our café conversations. Remember when we talked for hours over those lattes?",
      message: "Just like coffee, you bring warmth and energy to my days. I miss our coffee dates and deep discussions."
    },
    {
      id: 2,
      name: "Roses",
      icon: "🌹",
      description: "Roses are special, just like you. The beauty and delicacy of roses always reminds me of your graceful presence.",
      message: "For every rose that blooms, I'm reminded of the beauty you bring to this world. Hope to gift you your favorite roses soon."
    },
    {
      id: 3,
      name: "Black",
      icon: "⬛",
      description: "Your love for black shows your sophisticated style. Always elegant, always timeless - just like your fashion sense.",
      message: "Black isn't just a color; it's an expression of depth and mystery. Like the layers of your personality I'm still discovering."
    },
    {
      id: 4,
      name: "Moon",
      icon: "🌙",
      description: "The moon shines brightest in darkness, just like your smile even in difficult times. Your fascination with the moon shows your dreamy nature.",
      message: "When I look at the moon, I wonder if you're looking at it too. A silent connection between us, even when we're apart."
    },
    {
      id: 5,
      name: "Clouds",
      icon: "☁️",
      description: "Clouds that drift across the sky remind me of your free spirit. Always changing, always beautiful.",
      message: "Like clouds that bring rain to nurture life, you've nurtured our friendship with your care and kindness."
    }
  ];
  
  const next = () => {
    setActiveIndex((prev) => (prev + 1) % favorites.length);
  };
  
  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + favorites.length) % favorites.length);
  };
  
  const current = favorites[activeIndex];
  
  const sendVirtualGift = () => {
    toast({
      title: `Sent: ${current.name}`,
      description: "Your virtual gift has been noted!",
    });
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 mb-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-quicksand font-bold text-xl text-coral mb-4 flex items-center">
        <i className="fas fa-star mr-2"></i> Things You Love
      </h3>
      
      <div className="favorite-carousel relative mb-6 pt-6">
        {/* Background decoration */}
        {current.name === "Moon" && (
          <div className="absolute inset-0 overflow-hidden opacity-10 rounded-xl">
            <div className="stars absolute inset-0 bg-black"></div>
          </div>
        )}
        
        {current.name === "Clouds" && (
          <div className="absolute inset-0 overflow-hidden opacity-10 rounded-xl">
            <div className="clouds-bg absolute inset-0 bg-blue-100"></div>
          </div>
        )}
        
        {current.name === "Coffee" && (
          <div className="absolute inset-0 overflow-hidden opacity-10 rounded-xl">
            <div className="coffee-bg absolute inset-0 bg-amber-800"></div>
          </div>
        )}
        
        {current.name === "Roses" && (
          <div className="absolute inset-0 overflow-hidden opacity-10 rounded-xl">
            <div className="roses-bg absolute inset-0 bg-red-100"></div>
          </div>
        )}
        
        {current.name === "Black" && (
          <div className="absolute inset-0 overflow-hidden opacity-10 rounded-xl">
            <div className="black-bg absolute inset-0 bg-gray-900"></div>
          </div>
        )}
        
        <motion.div 
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm relative z-10"
        >
          <div className="favorite-icon text-6xl md:text-7xl mr-6 mb-4 md:mb-0 flex-shrink-0">
            {current.icon}
          </div>
          <div className="favorite-content">
            <h4 className="font-quicksand font-bold text-xl mb-2 text-coral">{current.name}</h4>
            <p className="text-gray-700 mb-3">{current.description}</p>
            <div className="bg-warm-gray p-3 rounded-lg">
              <p className="text-gray-600 italic">"{current.message}"</p>
            </div>
          </div>
        </motion.div>
        
        <div className="flex justify-between absolute top-1/2 left-0 right-0 -mt-4 px-2">
          <button 
            onClick={prev}
            className="bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-lavender hover:text-coral transition-colors z-20"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            onClick={next}
            className="bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-lavender hover:text-coral transition-colors z-20"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {favorites.map((item, index) => (
          <button 
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className={`rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-sm transition-all ${
              index === activeIndex 
                ? 'bg-gradient text-white scale-110' 
                : 'bg-warm-gray text-gray-600 hover:bg-lavender/20'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={sendVirtualGift}
          className="bg-gradient text-white font-quicksand font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transform transition duration-300 hover:-translate-y-1"
        >
          <i className="fas fa-gift mr-2"></i> Send Virtual {current.name}
        </Button>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">I pay attention to the things that bring you joy</p>
        <p className="font-urdu text-sm mt-1" style={{ direction: 'rtl' }}>
          تمھاری خوشی میری خوشی ہے
        </p>
        <p className="text-xs italic text-gray-400">(Your happiness is my happiness)</p>
      </div>
    </motion.div>
  );
}