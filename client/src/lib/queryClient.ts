import { QueryClient } from "@tanstack/react-query";
import { loadMemories, saveMemories, Memory } from "./memory";
import { loadPlaylist, savePlaylist, Song } from "./playlist";

// Simple mock API for client-side only operations
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  // Handle different endpoints
  if (url.includes('/api/memories')) {
    if (method === 'GET') {
      return { json: () => Promise.resolve(loadMemories()) };
    } else if (method === 'POST' && data) {
      const memories = loadMemories();
      const newMemory: Memory = {
        title: (data as any).title || "Untitled Memory",
        description: (data as any).description || "No description",
        imageUrl: (data as any).imageUrl || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        id: Date.now().toString()
      };
      const updatedMemories = [...memories, newMemory];
      saveMemories(updatedMemories);
      return { json: () => Promise.resolve(newMemory) };
    }
  } 
  
  else if (url.includes('/api/playlist')) {
    if (method === 'GET') {
      return { json: () => Promise.resolve(loadPlaylist()) };
    } else if (method === 'POST' && data) {
      const playlist = loadPlaylist();
      const newSong: Song = {
        title: (data as any).title || "Untitled Song",
        artist: (data as any).artist || "Unknown Artist",
        url: (data as any).url,
        id: Date.now().toString()
      };
      const updatedPlaylist = [...playlist, newSong];
      savePlaylist(updatedPlaylist);
      return { json: () => Promise.resolve(newSong) };
    }
  }
  
  // Default response if no matching endpoint
  return { json: () => Promise.resolve({}) };
}

// Client-side data handler for React Query
const clientDataHandler = ({ queryKey }: { queryKey: any }) => {
  const endpoint = queryKey[0] as string;
  
  if (endpoint.includes('/api/memories')) {
    return loadMemories();
  } 
  
  else if (endpoint.includes('/api/playlist')) {
    return loadPlaylist();
  }
  
  // Default empty response
  return {};
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: clientDataHandler,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
