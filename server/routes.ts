import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertMemorySchema, insertSongSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create API routes
  const apiRouter = express.Router();
  
  // Messages routes
  apiRouter.get("/messages", async (req, res) => {
    const messages = await storage.getAllMessages();
    res.json(messages);
  });
  
  apiRouter.post("/messages", async (req, res) => {
    try {
      const data = insertMessageSchema.parse(req.body);
      const newMessage = await storage.createMessage(data);
      res.status(201).json(newMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create message" });
      }
    }
  });
  
  // Memories routes
  apiRouter.get("/memories", async (req, res) => {
    const memories = await storage.getAllMemories();
    res.json(memories);
  });
  
  apiRouter.post("/memories", async (req, res) => {
    try {
      const data = insertMemorySchema.parse(req.body);
      const newMemory = await storage.createMemory(data);
      res.status(201).json(newMemory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid memory data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create memory" });
      }
    }
  });
  
  // Songs routes
  apiRouter.get("/songs", async (req, res) => {
    const songs = await storage.getAllSongs();
    res.json(songs);
  });
  
  apiRouter.post("/songs", async (req, res) => {
    try {
      const data = insertSongSchema.parse(req.body);
      const newSong = await storage.createSong(data);
      res.status(201).json(newSong);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid song data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create song" });
      }
    }
  });
  
  // Mount the API router
  app.use("/api", apiRouter);
  
  const httpServer = createServer(app);
  return httpServer;
}
