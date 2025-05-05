import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function ForgivenessNote() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleCopy = () => {
    const noteText = `
      Dear Zobiya,
      
      میں آپ سے معافی مانگتا ہوں
      (I sincerely apologize to you)
      
      I understand you're upset with me, and you have every right to be. Your friendship means the world to me, and I never intended to hurt you. I hope you can find it in your heart to forgive me.
      
      دوستی میں ناراضگی معمول ہے، مگر دوری ہم دونوں کو تکلیف دیتی ہے
      (Being upset is normal in friendship, but the distance between us hurts both of us)
      
      I promise to be more thoughtful and considerate in the future. Please give me a chance to make things right.
      
      With love and hope for your forgiveness,
      Your friend
    `;
    
    navigator.clipboard.writeText(noteText.trim()).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "You can now paste and send this note to Zobiya"
      });
    });
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 mb-6 relative overflow-hidden"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <div className="absolute top-2 right-2 text-lavender/30 text-4xl">✿</div>
      <div className="absolute bottom-2 left-2 text-coral/30 text-4xl">♥</div>
      
      <h3 className="font-quicksand font-bold text-xl text-coral mb-4 flex items-center">
        <i className="fas fa-heart-broken mr-2"></i> Forgiveness Note
      </h3>
      
      <div className={`bg-gradient-to-br from-warm-gray to-white p-5 rounded-lg mb-4 transition-all duration-300 ${isExpanded ? 'max-h-full' : 'max-h-64 overflow-hidden relative'}`}>
        <p className="mb-3">Dear Zobiya,</p>
        
        <p className="font-urdu text-xl text-right mb-3" style={{ direction: 'rtl' }}>
          میں آپ سے معافی مانگتا ہوں
        </p>
        <p className="text-sm text-gray-600 mb-4 italic">(I sincerely apologize to you)</p>
        
        <p className="mb-3">
          I understand you're upset with me, and you have every right to be. Your friendship means the world to me, and I never intended to hurt you. I hope you can find it in your heart to forgive me.
        </p>
        
        <p className="font-urdu text-xl text-right mb-3" style={{ direction: 'rtl' }}>
          دوستی میں ناراضگی معمول ہے، مگر دوری ہم دونوں کو تکلیف دیتی ہے
        </p>
        <p className="text-sm text-gray-600 mb-4 italic">(Being upset is normal in friendship, but the distance between us hurts both of us)</p>
        
        <p className="mb-3">
          I promise to be more thoughtful and considerate in the future. Please give me a chance to make things right.
        </p>
        
        <p className="text-right mb-2">With love and hope for your forgiveness,</p>
        <p className="text-right">Your friend</p>
        
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-lavender hover:text-coral"
        >
          {isExpanded ? (
            <>
              <i className="fas fa-chevron-up mr-2"></i> Show Less
            </>
          ) : (
            <>
              <i className="fas fa-chevron-down mr-2"></i> Read More
            </>
          )}
        </Button>
        
        <Button 
          onClick={handleCopy}
          className="bg-gradient text-white"
        >
          <i className="fas fa-copy mr-2"></i> Copy Note
        </Button>
      </div>
    </motion.div>
  );
}