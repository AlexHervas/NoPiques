import { Request, Response, NextFunction } from "express";
import client from "../redisClient";

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() || req.ip;
    const redisKey = `analyze_count:${ip}`;

    const current = await client.get(redisKey);
    const count = current ? parseInt(current) : 0;

    if (count >= 5) {
      res.status(429).json({
        error: "Límite diario de análisis alcanzado. Inténtalo mañana.",
      });
      return;
    }

    if (count === 0) {
      await client.set(redisKey, "1", { EX: 86400 });
    } else {
      await client.incr(redisKey);
    }

    next();
  } catch (error) {
    console.error("Error en rateLimiter:", error);
    res.status(500).json({ error: "Error interno en el control del límite" });
  }
};
