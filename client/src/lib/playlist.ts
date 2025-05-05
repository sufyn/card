export interface Song {
  id: string;
  title: string;
  artist: string;
  url?: string;
}

// Default playlist if none is saved yet
export const defaultPlaylist: Song[] = [
  {
    id: "1",
    title: "Perfect",
    artist: "Ed Sheeran",
    url: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v"
  },
  {
    id: "2",
    title: "Just the Way You Are",
    artist: "Bruno Mars",
    url: "https://open.spotify.com/track/7BqBn9nzAq8spo5e7cZ0dJ"
  },
  {
    id: "3",
    title: "Count On Me",
    artist: "Bruno Mars",
    url: "https://open.spotify.com/track/6a8XUHxfOaMvnBx4dweiHR"
  }
];

// Utils to load and save playlist
export const loadPlaylist = (): Song[] => {
  const savedPlaylist = localStorage.getItem('zobiya-playlist');
  return savedPlaylist ? JSON.parse(savedPlaylist) : defaultPlaylist;
};

export const savePlaylist = (playlist: Song[]): void => {
  localStorage.setItem('zobiya-playlist', JSON.stringify(playlist));
};

export const addSong = (song: Omit<Song, 'id'>): Song[] => {
  const playlist = loadPlaylist();
  const newSong = {
    ...song,
    id: Date.now().toString()
  };
  
  const updatedPlaylist = [...playlist, newSong];
  savePlaylist(updatedPlaylist);
  return updatedPlaylist;
};

// Handle creating a Spotify playlist
export const createSpotifyPlaylist = (songs: Song[]): void => {
  const songUrls = songs.map(song => song.url).filter(Boolean);
  
  if (songUrls.length > 0) {
    const spotifyPlaylistUrl = `https://open.spotify.com/add/${songUrls.join(',')}`;
    window.open(spotifyPlaylistUrl, '_blank');
  } else {
    alert('No Spotify URLs available for these songs');
  }
};
