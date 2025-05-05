import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function MessageSection() {
  const [message, setMessage] = useState<string>("");
  const [displayMessage, setDisplayMessage] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // Load saved message from local storage on initial render
  useEffect(() => {
    const savedMessage = localStorage.getItem("zobiya-message");
    if (savedMessage) {
      setDisplayMessage(savedMessage);
      setMessage(savedMessage);
    } else {
      // Default message if none exists
      const defaultMessage = "Dear Zobiya, I'm truly sorry for making you sad. Your friendship means the world to me, and seeing you upset breaks my heart. I hope you can forgive me. You deserve all the happiness in the world.";
      setDisplayMessage(defaultMessage);
      setMessage(defaultMessage);
    }
  }, []);
  
  const handleSaveMessage = () => {
    if (message.trim() !== "") {
      setDisplayMessage(message);
      localStorage.setItem("zobiya-message", message);
      setIsEditing(false);
      
      toast({
        title: "Message saved!",
        description: "Your message to Zobiya has been saved.",
      });
    }
  };
  
  const handleEditMessage = () => {
    setIsEditing(true);
  };
  
  const handleShareMessage = () => {
    if (navigator.share) {
      navigator.share({
        title: "A Special Message for Zobiya",
        text: displayMessage
      }).catch(error => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(displayMessage).then(() => {
        toast({
          title: "Message copied!",
          description: "The message has been copied to your clipboard.",
        });
      });
    }
  };
  
  const addEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Message Display */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-6 overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-quicksand font-bold text-xl text-coral mb-4 flex items-center">
          <i className="fas fa-envelope-open-text mr-2"></i> My Message To You
        </h3>
        <div className="p-4 bg-warm-gray rounded-lg min-h-[200px] mb-4">
          <p className="text-lg italic text-gray-600">{displayMessage}</p>
        </div>
        <div className="flex justify-between">
          <button 
            onClick={handleEditMessage}
            className="text-lavender hover:text-coral transition-colors"
          >
            <i className="fas fa-pen mr-1"></i> Edit
          </button>
          <button 
            onClick={handleShareMessage}
            className="text-lavender hover:text-coral transition-colors"
          >
            <i className="fas fa-share-alt mr-1"></i> Share
          </button>
        </div>
      </motion.div>
      
      {/* Right: Message Editor */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="font-quicksand font-bold text-xl text-coral mb-4 flex items-center">
          <i className="fas fa-pencil-alt mr-2"></i> Customize Your Message
        </h3>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[150px] p-4 border border-lavender/50 rounded-lg focus:ring-2 focus:ring-soft-pink mb-4 resize-none"
          placeholder="Write your personal message here..."
        />
        <div className="flex space-x-3 mb-4">
          <button 
            onClick={() => addEmoji("❤️")}
            className="p-2 rounded-md hover:bg-warm-gray transition-colors"
          >
            ❤️
          </button>
          <button 
            onClick={() => addEmoji("✨")}
            className="p-2 rounded-md hover:bg-warm-gray transition-colors"
          >
            ✨
          </button>
          <button 
            onClick={() => addEmoji("🎵")}
            className="p-2 rounded-md hover:bg-warm-gray transition-colors"
          >
            🎵
          </button>
          <button 
            onClick={() => addEmoji("🌸")}
            className="p-2 rounded-md hover:bg-warm-gray transition-colors"
          >
            🌸
          </button>
          <button 
            onClick={() => addEmoji("😊")}
            className="p-2 rounded-md hover:bg-warm-gray transition-colors"
          >
            😊
          </button>
        </div>
        <Button 
          onClick={handleSaveMessage}
          className="w-full bg-gradient text-white font-quicksand font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transform transition duration-300 hover:-translate-y-1"
        >
          Save Message
        </Button>
      </motion.div>
    </div>
  );
}
