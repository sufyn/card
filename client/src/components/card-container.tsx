import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CardContainerProps {
  onExplore: () => void;
}

export function CardContainer({ onExplore }: CardContainerProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(true);
  };

  return (
    <div className="card-container max-w-lg mx-auto mb-10">
      <div className={`card relative w-full ${isFlipped ? 'is-flipped' : ''}`}>
        {/* Card Front */}
        <div className="card-face card-front bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
          <div className="mb-6">
            <div className="floating inline-block">
              <span className="text-6xl md:text-7xl">✨</span>
            </div>
          </div>
          <h2 className="font-quicksand font-bold text-2xl md:text-3xl text-coral mb-2">Hey Zobiya!</h2>
          <p className="font-urdu text-2xl mb-2" style={{ direction: 'rtl' }}>
            ناراض مت رہو
          </p>
          <p className="text-xs italic text-gray-500 mb-4">(Please don't stay upset)</p>
          <p className="text-lg mb-6">I've made something special just for you</p>
          <Button 
            onClick={handleFlip}
            className="bg-gradient font-quicksand font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transform transition duration-300 hover:-translate-y-1"
          >
            Open Your Gift
          </Button>
        </div>
        
        {/* Card Back */}
        <div className="card-face card-back bg-white rounded-xl shadow-lg p-6 md:p-8 text-center absolute inset-0">
          <div className="mb-4">
            <motion.div 
              className="inline-block"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-6xl md:text-7xl">🎁</span>
            </motion.div>
          </div>
          <h2 className="font-quicksand font-bold text-2xl md:text-3xl text-coral mb-2">I'm Sorry</h2>
          <p className="font-urdu text-2xl mb-2" style={{ direction: 'rtl' }}>
            معافی چاہتا ہوں
          </p>
          <p className="text-xs italic text-gray-500 mb-3">(I seek forgiveness)</p>
          <p className="text-lg mb-4">I've created this to show you how much I care</p>
          
          <div className="flex flex-col items-center justify-center mb-4 p-3 bg-lavender/10 rounded-lg">
            <p className="font-urdu text-lg" style={{ direction: 'rtl' }}>
              دوستی قیمتی ہے، ناراضگی نہیں
            </p>
            <p className="text-xs italic text-gray-500">
              (Friendship is precious, not anger)
            </p>
          </div>
          
          <Button 
            onClick={onExplore}
            className="bg-gradient-to-r from-lavender to-soft-pink text-white font-quicksand font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transform transition duration-300 hover:-translate-y-1"
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
}
