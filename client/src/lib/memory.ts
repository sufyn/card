export interface Memory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

// Default memories if none are saved yet
export const defaultMemories: Memory[] = [
  {
    id: "1",
    title: "Coffee Shop Day",
    description: "Remember when we couldn't stop laughing?",
    imageUrl: "https://images.unsplash.com/photo-1516641051054-9df6a1aad654?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Movie Night",
    description: "That film we both loved!",
    imageUrl: "https://images.unsplash.com/photo-1534119428213-bd2626145178?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "3",
    title: "That One Adventure",
    description: "Still can't believe we did that!",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

// Utils to load and save memories
export const loadMemories = (): Memory[] => {
  const savedMemories = localStorage.getItem('zobiya-memories');
  return savedMemories ? JSON.parse(savedMemories) : defaultMemories;
};

export const saveMemories = (memories: Memory[]): void => {
  localStorage.setItem('zobiya-memories', JSON.stringify(memories));
};

export const addMemory = (memory: Omit<Memory, 'id'>): Memory[] => {
  const memories = loadMemories();
  const newMemory = {
    ...memory,
    id: Date.now().toString()
  };
  
  const updatedMemories = [...memories, newMemory];
  saveMemories(updatedMemories);
  return updatedMemories;
};
