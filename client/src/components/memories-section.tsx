import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Memory, loadMemories, addMemory } from "@/lib/memory";
import { toast } from "@/hooks/use-toast";

export function MemoriesSection() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMemory, setNewMemory] = useState<Omit<Memory, 'id'>>({
    title: "",
    description: "",
    imageUrl: ""
  });
  
  useEffect(() => {
    setMemories(loadMemories());
  }, []);
  
  const handleAddMemory = () => {
    if (!newMemory.title || !newMemory.description || !newMemory.imageUrl) {
      toast({
        title: "Cannot add memory",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedMemories = addMemory(newMemory);
    setMemories(updatedMemories);
    setIsAddDialogOpen(false);
    setNewMemory({ title: "", description: "", imageUrl: "" });
    
    toast({
      title: "Memory added",
      description: "Your special memory has been saved."
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
        <i className="fas fa-camera-retro mr-2"></i> Our Special Moments
      </h3>
      
      <div className="memories-container overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-max">
          {memories.map((memory) => (
            <motion.div 
              key={memory.id}
              className="memory-card w-72 relative rounded-lg overflow-hidden shadow-md group"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <img 
                src={memory.imageUrl} 
                alt={memory.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-3 bg-white">
                <h4 className="font-quicksand font-semibold text-lg">{memory.title}</h4>
                <p className="text-sm text-gray-600">{memory.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <span className="text-white font-quicksand">Our special memory</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-lavender text-white font-quicksand font-semibold py-2 px-6 rounded-full shadow-sm hover:shadow-md transform transition duration-300 hover:-translate-y-1"
        >
          <i className="fas fa-plus mr-2"></i> Add New Memory
        </Button>
      </div>
      
      {/* Add Memory Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-quicksand text-coral">Add a New Memory</DialogTitle>
            <DialogDescription>
              Add a special moment you shared with Zobiya
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                value={newMemory.title}
                onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
                placeholder="What would you call this memory?"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input 
                value={newMemory.description}
                onChange={(e) => setNewMemory({...newMemory, description: e.target.value})}
                placeholder="What makes this memory special?"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input 
                value={newMemory.imageUrl}
                onChange={(e) => setNewMemory({...newMemory, imageUrl: e.target.value})}
                placeholder="Paste a link to an image"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient" onClick={handleAddMemory}>
              Add Memory
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
