import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Poem {
  id: number;
  title: string;
  content: string;
  theme: "coffee" | "roses" | "moon" | "clouds" | "black";
  urduLine?: string;
  translation?: string;
}

export function CustomPoem() {
  const [poemIndex, setPoemIndex] = useState(0);
  
  const poems: Poem[] = [
    {
      id: 1,
      title: "Coffee Conversations",
      content: `The rich aroma between us,
Steam rising like our whispered words,
Two cups, a table, endless stories,
Caffeine and friendship, perfectly brewed.
      
In each coffee bean, a memory stirs,
Of laughter shared and secrets told,
I miss these moments when we're apart,
Worth more than any cup of gold.`,
      theme: "coffee",
      urduLine: "ہر کپ کافی میں تمہاری یاد شامل ہے",
      translation: "Every cup of coffee includes memories of you"
    },
    {
      id: 2,
      title: "Roses Speak",
      content: `A single rose, crimson and bold,
Each petal a message, waiting to unfold,
Like my apology, sincere and true,
These flowers speak the words I couldn't tell you.
      
Their fragrance surrounds, a gentle embrace,
Like memories of you, your smile, your grace,
Accept these roses, both thorns and bloom,
As I hope our friendship will soon resume.`,
      theme: "roses",
      urduLine: "گلاب کی خوشبو جیسی تمھاری دوستی",
      translation: "Your friendship is like the fragrance of a rose"
    },
    {
      id: 3,
      title: "Midnight Whispers",
      content: `In darkness wrapped, the world at peace,
The moon our witness, stars release
Their gentle glow upon your face,
Illuminating every grace.
      
Black night holds secrets none can hear,
Your favorite shade brings you near,
In shadows deep our hearts connect,
The night sky's where our souls reflect.`,
      theme: "black",
      urduLine: "کالی رات میں چاند کی روشنی تمہاری یاد دلاتی ہے",
      translation: "The moonlight in the dark night reminds me of you"
    },
    {
      id: 4,
      title: "Drifting Clouds",
      content: `White wisps across an endless blue,
Shapes forming, changing, just like you,
Free-spirited, beautiful, wild and true,
Clouds drift as my thoughts drift to you.
      
Sometimes they bring rain, cleansing tears,
Washing away doubts, washing away fears,
Then parting to reveal sun's warm embrace,
Just as your smile lights up any place.`,
      theme: "clouds",
      urduLine: "بادلوں کی طرح آزاد ہے تمہاری روح",
      translation: "Your spirit is free like the clouds"
    },
    {
      id: 5,
      title: "Lunar Reflections",
      content: `Silver guardian of the night sky realm,
Your glow a beacon through darkness overwhelm,
Just as the moon pulls tides across deep seas,
Your absence pulls emotions deep in me.
      
Waxing, waning, yet always there,
A constant presence despite despair,
The moon reminds me of your gentle light,
That guides me through my darkest night.`,
      theme: "moon",
      urduLine: "چاند کی روشنی میں بھی تمہارا چہرہ نظر آتا ہے",
      translation: "I see your face even in the moonlight"
    }
  ];
  
  const currentPoem = poems[poemIndex];
  
  const nextPoem = () => {
    setPoemIndex((prev) => (prev + 1) % poems.length);
  };
  
  const prevPoem = () => {
    setPoemIndex((prev) => (prev - 1 + poems.length) % poems.length);
  };
  
  const copyPoem = () => {
    const poem = poems[poemIndex];
    const textToCopy = `${poem.title}\n\n${poem.content}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied!",
        description: "Poem copied to clipboard"
      });
    });
  };
  
  // Background styling based on theme
  const getThemeBackground = () => {
    switch(currentPoem.theme) {
      case "coffee":
        return "bg-gradient-to-br from-amber-800/20 to-amber-700/10";
      case "roses":
        return "bg-gradient-to-br from-red-100 to-pink-100";
      case "black":
        return "bg-gradient-to-br from-gray-900/90 to-gray-800/80 text-white";
      case "clouds":
        return "bg-gradient-to-br from-blue-100/80 to-white";
      case "moon":
        return "bg-gradient-to-br from-gray-800/80 to-blue-900/70 text-white";
      default:
        return "bg-warm-gray";
    }
  };
  
  const getThemeIcon = () => {
    switch(currentPoem.theme) {
      case "coffee": return "☕";
      case "roses": return "🌹";
      case "black": return "⬛";
      case "clouds": return "☁️";
      case "moon": return "🌙";
      default: return "📝";
    }
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6 mb-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-quicksand font-bold text-xl text-coral mb-4 flex items-center">
        <i className="fas fa-pen-fancy mr-2"></i> Poetry For You
      </h3>
      
      <div className={`poem-container p-6 rounded-lg ${getThemeBackground()}`}>
        <div className="flex justify-center mb-4">
          <span className="text-4xl">{getThemeIcon()}</span>
        </div>
        
        <h4 className={`font-quicksand font-bold text-2xl mb-4 text-center ${currentPoem.theme === 'black' || currentPoem.theme === 'moon' ? 'text-white' : 'text-coral'}`}>
          {currentPoem.title}
        </h4>
        
        <div className="poem-content mb-6">
          <p className={`whitespace-pre-line font-quicksand leading-relaxed ${currentPoem.theme === 'black' || currentPoem.theme === 'moon' ? 'text-gray-200' : 'text-gray-700'}`}>
            {currentPoem.content}
          </p>
        </div>
        
        {currentPoem.urduLine && (
          <div className={`mt-6 text-center p-3 rounded-lg ${
            currentPoem.theme === 'black' || currentPoem.theme === 'moon' 
              ? 'bg-white/10' 
              : 'bg-gray-100'
          }`}>
            <p className="font-urdu text-xl mb-1" style={{ direction: 'rtl' }}>
              {currentPoem.urduLine}
            </p>
            <p className={`text-xs italic ${
              currentPoem.theme === 'black' || currentPoem.theme === 'moon' 
                ? 'text-gray-300' 
                : 'text-gray-500'
            }`}>
              {currentPoem.translation}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={prevPoem}
          className="text-lavender hover:text-coral hover:bg-lavender/10"
        >
          <i className="fas fa-chevron-left mr-1"></i> Previous
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={copyPoem}
          className="text-coral hover:bg-soft-pink/10"
        >
          <i className="fas fa-copy mr-1"></i> Copy Poem
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={nextPoem}
          className="text-lavender hover:text-coral hover:bg-lavender/10"
        >
          Next <i className="fas fa-chevron-right ml-1"></i>
        </Button>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Words from the heart, inspired by things you love
        </p>
      </div>
    </motion.div>
  );
}