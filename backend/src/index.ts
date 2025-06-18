import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { analyzeMessage } from "./ollamaService";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    const result = await analyzeMessage(text);
    res.json(result);
  } catch (error) {
    console.error("Error analyzing message:", error);
    res.status(500).json({ error: "Error al analizar el mensaje" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
