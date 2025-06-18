import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

export const analyzeMessageOpenAI = async (
  message: string
): Promise<{
  level: "danger" | "safe" | "neutral" | "uncertain";
  result: string;
}> => {
  if (!message.trim()) {
    return {
      level: "uncertain",
      result: "El mensaje está vacío o no contiene texto relevante.",
    };
  }

  if (message.length > 1000) {
    return {
      level: "uncertain",
      result: "El mensaje es demasiado largo. Por favor, reduce el texto.",
    };
  }

  const prompt = `Eres un experto en ciberseguridad. Evalúa el siguiente mensaje y responde exclusivamente con un JSON como este:

{
  "level": "danger" | "safe" | "neutral" | "uncertain",
  "result": "explicación breve en español"
}

Mensaje: """${message}"""`;

  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  const content = completion.choices[0].message.content || "";

  try {
    // Extrae solo el JSON de la respuesta
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}") + 1;
    const jsonString = content.slice(jsonStart, jsonEnd);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error al parsear respuesta de OpenAI:", content);
    return {
      level: "uncertain",
      result: "No se pudo analizar el mensaje correctamente.",
    };
  }
};
