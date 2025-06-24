import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

if (
  !process.env.REDIS_HOST ||
  !process.env.REDIS_PORT ||
  !process.env.REDIS_PASSWORD
) {
  throw new Error(
    "Missing required environment variables for Redis connection"
  );
}

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "0"),
  },
  password: process.env.REDIS_PASSWORD,
});

client.on("error", (err) => console.error("Redis Client Error", err));

export default client;
