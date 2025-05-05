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
import { Song, loadPlaylist, addSong, createSpotifyPlaylist } from "@/lib/playlist";
import { toast } from "@/hooks/use-toast";

export function PlaylistSection() {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSong, setNewSong] = useState<Omit<Song, 'id'>>({
    title: "",
    artist: "",
    url: ""
  });
  
  useEffect(() => {
    setPlaylist(loadPlaylist());
  }, []);
  
  const handleAddSong = () => {
    if (!newSong.title || !newSong.artist) {
      toast({
        title: "Cannot add song",
        description: "Please fill in the required fields",
        variant: "destructive"
      });
      return;
    }
    
    const updatedPlaylist = addSong(newSong);
    setPlaylist(updatedPlaylist);
    setIsAddDialogOpen(false);
    setNewSong({ title: "", artist: "", url: "" });
    
    toast({
      title: "Song added",
      description: `${newSong.title} by ${newSong.artist} has been added to the playlist.`
    });
  };
  
  const handleCreatePlaylist = () => {
    createSpotifyPlaylist(playlist);
    toast({
      title: "Creating playlist",
      description: "Opening Spotify to create your playlist."
    });
  };
  
  const handlePlaySong = (song: Song) => {
    if (song.url) {
      window.open(song.url, '_blank');
    } else {
      toast({
        title: `Playing: ${song.title}`,
        description: `By ${song.artist}`,
      });
    }
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md p-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-quicksand font-bold text-xl text-coral mb-4 flex items-center">
        <i className="fas fa-headphones mr-2"></i> Songs That Remind Me of You
      </h3>
      
      <div className="space-y-4">
        {playlist.map((song, index) => (
          <motion.div 
            key={song.id}
            className="flex items-center p-3 bg-warm-gray rounded-lg hover:bg-lavender/10 transition-colors group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-coral to-soft-pink rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
              <i className="fas fa-music"></i>
            </div>
            <div className="flex-grow">
              <h4 className="font-quicksand font-semibold">{song.title}</h4>
              <p className="text-sm text-gray-600">{song.artist}</p>
            </div>
            <button 
              onClick={() => handlePlaySong(song)}
              className="text-lavender opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <i className="fas fa-play"></i>
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center space-x-4">
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-lavender text-white font-quicksand font-semibold py-2 px-6 rounded-full shadow-sm hover:shadow-md"
        >
          <i className="fas fa-plus mr-2"></i> Add Song
        </Button>
        
        <Button 
          onClick={handleCreatePlaylist}
          className="bg-soft-pink text-white font-quicksand font-semibold py-2 px-6 rounded-full shadow-sm hover:shadow-md transform transition duration-300 hover:-translate-y-1"
        >
          <i className="fas fa-list-music mr-2"></i> Create Spotify Playlist
        </Button>
      </div>
      
      {/* Add Song Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-quicksand text-coral">Add a New Song</DialogTitle>
            <DialogDescription>
              Add a song that reminds you of Zobiya
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Song Title</label>
              <Input 
                value={newSong.title}
                onChange={(e) => setNewSong({...newSong, title: e.target.value})}
                placeholder="Enter song title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Artist</label>
              <Input 
                value={newSong.artist}
                onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
                placeholder="Enter artist name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Spotify URL (optional)</label>
              <Input 
                value={newSong.url || ""}
                onChange={(e) => setNewSong({...newSong, url: e.target.value})}
                placeholder="Paste a Spotify song link"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient" onClick={handleAddSong}>
              Add Song
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
