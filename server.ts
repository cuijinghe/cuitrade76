import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API/health route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  let distPath = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(path.join(distPath, 'index.html'))) {
    distPath = path.resolve(__dirname);
  }
  const isProd = fs.existsSync(path.join(distPath, 'index.html'));

  if (!isProd) {
    console.log("Starting in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log(`Starting in production mode serving static files from ${distPath}...`);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
