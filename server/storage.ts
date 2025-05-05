import { 
  users, 
  messages, 
  memories, 
  songs,
  type User, 
  type InsertUser,
  type Message,
  type InsertMessage,
  type Memory,
  type InsertMemory,
  type Song,
  type InsertSong
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Message methods
  getMessage(id: number): Promise<Message | undefined>;
  getAllMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Memory methods
  getMemory(id: number): Promise<Memory | undefined>;
  getAllMemories(): Promise<Memory[]>;
  createMemory(memory: InsertMemory): Promise<Memory>;
  
  // Song methods
  getSong(id: number): Promise<Song | undefined>;
  getAllSongs(): Promise<Song[]>;
  createSong(song: InsertSong): Promise<Song>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private memories: Map<number, Memory>;
  private songs: Map<number, Song>;
  
  private userIdCounter: number;
  private messageIdCounter: number;
  private memoryIdCounter: number;
  private songIdCounter: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.memories = new Map();
    this.songs = new Map();
    
    this.userIdCounter = 1;
    this.messageIdCounter = 1;
    this.memoryIdCounter = 1;
    this.songIdCounter = 1;
    
    // Initialize with some default data
    this.initializeDefaultData();
  }
  
  private initializeDefaultData() {
    // Default message
    const defaultMessage: InsertMessage = {
      content: "Dear Zobiya, I'm truly sorry for making you sad. Your friendship means the world to me, and seeing you upset breaks my heart. I hope you can forgive me. You deserve all the happiness in the world.",
      createdAt: new Date().toISOString()
    };
    this.createMessage(defaultMessage);
    
    // Default memories
    const defaultMemories: InsertMemory[] = [
      {
        title: "Coffee Shop Day",
        description: "Remember when we couldn't stop laughing?",
        imageUrl: "https://images.unsplash.com/photo-1516641051054-9df6a1aad654?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Movie Night",
        description: "That film we both loved!",
        imageUrl: "https://images.unsplash.com/photo-1534119428213-bd2626145178?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "That One Adventure",
        description: "Still can't believe we did that!",
        imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ];
    
    defaultMemories.forEach(memory => {
      this.createMemory(memory);
    });
    
    // Default songs
    const defaultSongs: InsertSong[] = [
      {
        title: "Perfect",
        artist: "Ed Sheeran",
        url: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v"
      },
      {
        title: "Just the Way You Are",
        artist: "Bruno Mars",
        url: "https://open.spotify.com/track/7BqBn9nzAq8spo5e7cZ0dJ"
      },
      {
        title: "Count On Me",
        artist: "Bruno Mars",
        url: "https://open.spotify.com/track/6a8XUHxfOaMvnBx4dweiHR"
      }
    ];
    
    defaultSongs.forEach(song => {
      this.createSong(song);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Message methods
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }
  
  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const message: Message = { ...insertMessage, id };
    this.messages.set(id, message);
    return message;
  }
  
  // Memory methods
  async getMemory(id: number): Promise<Memory | undefined> {
    return this.memories.get(id);
  }
  
  async getAllMemories(): Promise<Memory[]> {
    return Array.from(this.memories.values());
  }
  
  async createMemory(insertMemory: InsertMemory): Promise<Memory> {
    const id = this.memoryIdCounter++;
    const memory: Memory = { ...insertMemory, id };
    this.memories.set(id, memory);
    return memory;
  }
  
  // Song methods
  async getSong(id: number): Promise<Song | undefined> {
    return this.songs.get(id);
  }
  
  async getAllSongs(): Promise<Song[]> {
    return Array.from(this.songs.values());
  }
  
  async createSong(insertSong: InsertSong): Promise<Song> {
    const id = this.songIdCounter++;
    const song: Song = { ...insertSong, id };
    this.songs.set(id, song);
    return song;
  }
}

export const storage = new MemStorage();
