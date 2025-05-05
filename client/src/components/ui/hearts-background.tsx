import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Heart {
  id: number;
  size: number;
  color: string;
  left: string;
  top: string;
  delay: number;
}

export function HeartsBackground() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  
  useEffect(() => {
    const colors = ['#FF6B6B', '#FFD166', '#A5B4FC', '#FFAFCC'];
    const sizes = [10, 15, 20, 25];
    
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5
    }));
    
    setHearts(newHearts);
  }, []);
  
  if (hearts.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: heart.left,
            top: heart.top,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut"
          }}
        >
          <div
            className="heart"
            style={{
              position: 'relative',
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              backgroundColor: heart.color,
              display: 'inline-block',
              opacity: 0.6,
            }}
          >
            <style jsx>{`
              .heart::before,
              .heart::after {
                content: "";
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: ${heart.color};
              }
              .heart::before {
                left: -50%;
              }
              .heart::after {
                top: -50%;
              }
            `}</style>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
