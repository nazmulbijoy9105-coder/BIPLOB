import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Service Setup
  const apiKey = process.env.GEMINI_API_KEY || "";
  // @ts-ignore - The SDK type definitions can vary between versions
  const genAI = new GoogleGenAI(apiKey);
  // @ts-ignore
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", version: "1.2.0-fullstack" });
  });

  // Knowledge retrieval endpoint
  app.get("/api/knowledge", async (req, res) => {
    try {
      const knowledgeDir = path.join(process.cwd(), "knowledge");
      const files = await fs.readdir(knowledgeDir);
      const content = await Promise.all(
        files.map(async (file) => {
          const text = await fs.readFile(path.join(knowledgeDir, file), "utf-8");
          return { name: file, content: text };
        })
      );
      res.json(content);
    } catch (err) {
      res.status(500).json({ error: "Failed to load knowledge base" });
    }
  });

  // Chat endpoint (Server-side AI with grounding)
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    
    try {
      const knowledgeDir = path.join(process.cwd(), "knowledge");
      let context = "";
      try {
        const files = await fs.readdir(knowledgeDir);
        const fileContents = await Promise.all(
          files.map(f => fs.readFile(path.join(knowledgeDir, f), "utf-8"))
        );
        context = fileContents.join("\n\n");
      } catch (e) {
        console.error("No knowledge files found");
      }

      const systemInstruction = `You are Biplob (বিপ্লব), the ultimate Digital Companion for Bangladeshi Migrant Workers. 
      Your mission is to protect, guide, and empower workers throughout their journey.

      CRITICAL GUIDELINES:
      1. KNOWLEDGE GROUNDING: Use the provided Knowledge Base below as your primary source of truth.
      2. BILINGUAL RESPONSE: Respond in a mix of simple English and clear Bangla (Unicode). 
      3. PROTECTIVE TONE: Always warn workers against scams, middlemen (Dalals), and unauthorized payments.
      4. COMPREHENSIVE ANSWERS: Provide detailed, broad, and deep explanations for labor rights, visa processes, and safety. Don't provide short one-liners.
      5. EMERGENCY: If a worker is in danger or hasn't been paid, give specific steps (Contact Embassy, BMET, or Legal Aid).

      KNOWLEDGE BASE:
      ---
      ${context}
      ---
      
      Begin your response addressing the worker as "Bhai" (Brother).`;

      const chatAction = model.startChat({
        history: history.map((h: any) => ({
          role: h.role,
          parts: [{ text: h.text }],
        })),
        generationConfig: {
          maxOutputTokens: 2000,
          temperature: 0.7,
        },
      });

      const result = await chatAction.sendMessage(message);
      const response = await result.response;
      res.json({ text: response.text() });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Chat processing failed. Please try again." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Biplob Server running on http://localhost:${PORT}`);
  });
}

startServer();
