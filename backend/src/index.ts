import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { analyzeMessageOpenAI } from "./openaiService";
import client from "./redisClient";
import { rateLimiter } from "./middlewares/rateLimiter";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

(async () => {
  try {
    await client.connect();
    console.log("Redis connected successfully");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error while connecting with Redis:", error);
    process.exit(1);
  }
})();

app.post("/api/analyze", rateLimiter, async (req, res) => {
  try {
    const { message } = req.body;
    const result = await analyzeMessageOpenAI(message);
    res.json(result);
  } catch (error) {
    console.error("Error analyzing message:", error);
    res.status(500).json({ error: "Error al analizar el mensaje" });
  }
});
