import express from "express";

const app = express();
const PORT = 3001;

let serverCount = 0;

app.use(express.json());

app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from the server!", timestamp: Date.now() });
});

app.get("/api/count", (_req, res) => {
  serverCount++;
  res.json({ count: serverCount });
});

app.post("/api/greet", (req, res) => {
  const { name } = req.body as { name?: string };
  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }
  res.json({ greeting: `Hello, ${name}!`, timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
