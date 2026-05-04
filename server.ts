import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Knowledge retrieval endpoint
  app.get("/api/knowledge", async (req, res) => {
    try {
      const knowledgeDir = path.join(process.cwd(), "knowledge");
      await fs.access(knowledgeDir); // Check if it exists
      const files = await fs.readdir(knowledgeDir);
      const mdFiles = files.filter(f => f.endsWith(".md"));
      const content = await Promise.all(
        mdFiles.map(async (file) => {
          const text = await fs.readFile(path.join(knowledgeDir, file), "utf-8");
          return { name: file, content: text };
        })
      );
      res.json(content);
    } catch (err) {
      console.error("Knowledge retrieval error:", err);
      // Return empty array if knowledge dir is missing or inaccessible
      res.json([]);
    }
  });

  // Chat endpoint removed - moved to frontend to follow skill guidelines

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
