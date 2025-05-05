import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Shayari {
  id: number;
  text: string;
  translation?: string;
  author?: string;
}

export function ShayariSection() {
  const [currentShayari, setCurrentShayari] = useState<number>(0);
  
  const shayariCollection: Shayari[] = [
    {
      id: 1,
      text: "ناراضگی تیری مجھے منظور ہے لیکن، یہ دوری تیری میں کیسے برداشت کروں",
      translation: "I accept your anger, but how do I bear this distance from you?",
      author: "Anonymous"
    },
    {
      id: 2,
      text: "ہم تو آپکے ساتھ ہیں یہ زمانہ کیا چیز ہے، آپ مان جائیں تو تقدیر بدل سکتی ہے",
      translation: "I am with you, what is this world? If you forgive me, destiny can change.",
      author: "Anonymous"
    },
    {
      id: 3,
      text: "روٹھنا تمہارا حق ہے، مگر یاد رکھنا، منانا ہماری فطرت ہے",
      translation: "You have the right to be upset, but remember, reconciliation is in my nature.",
      author: "Anonymous"
    },
    {
      id: 4, 
      text: "ناراضگی میں بھی تمہاری محبت ہے، بس میری غلطی کو معاف کر دو",
      translation: "There is love even in your anger, just forgive my mistake.",
      author: "Anonymous"
    },
    {
      id: 5,
      text: "میرے پاس الفاظ نہیں ہیں معافی مانگنے کے لیے، بس آپکی مسکراہٹ دیکھنا چاہتا ہوں",
      translation: "I don't have words to apologize, I just want to see your smile.",
      author: "Anonymous"
    }
  ];
  
  const nextShayari = () => {
    setCurrentShayari((prev) => 
      prev === shayariCollection.length - 1 ? 0 : prev + 1
    );
    
    toast({
      title: "Shayari Changed",
      description: "Enjoying the poetry? There's more!"
    });
  };
  
  const prevShayari = () => {
    setCurrentShayari((prev) => 
      prev === 0 ? shayariCollection.length - 1 : prev - 1
    );
  };
  
  const copyShayari = () => {
    const shayari = shayariCollection[currentShayari];
    const textToCopy = `${shayari.text}\n\n${shayari.translation}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied!",
        description: "Shayari copied to clipboard"
      });
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
        <i className="fas fa-feather-alt mr-2"></i> Shayari For You
      </h3>
      
      <div className="relative">
        <div className="bg-warm-gray p-5 rounded-lg mb-4">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-3 -left-3 text-coral opacity-30 text-3xl">❝</div>
            <div className="absolute -bottom-3 -right-3 text-coral opacity-30 text-3xl">❞</div>
            
            {/* Shayari */}
            <p className="font-urdu text-2xl text-right leading-loose mb-4" style={{ direction: 'rtl' }}>
              {shayariCollection[currentShayari].text}
            </p>
            
            {/* Translation */}
            <p className="text-gray-600 italic text-sm">
              {shayariCollection[currentShayari].translation}
            </p>
            
            {/* Author */}
            {shayariCollection[currentShayari].author && (
              <p className="text-right text-gray-500 text-sm mt-2">
                - {shayariCollection[currentShayari].author}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={prevShayari}
            className="text-lavender hover:text-coral hover:bg-lavender/10"
          >
            <i className="fas fa-chevron-left mr-1"></i> Previous
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyShayari}
            className="text-coral hover:bg-soft-pink/10"
          >
            <i className="fas fa-copy mr-1"></i> Copy
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={nextShayari}
            className="text-lavender hover:text-coral hover:bg-lavender/10"
          >
            Next <i className="fas fa-chevron-right ml-1"></i>
          </Button>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Share these beautiful words with Zobiya to express your feelings
        </p>
      </div>
    </motion.div>
  );
}