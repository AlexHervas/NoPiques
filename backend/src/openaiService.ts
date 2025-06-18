import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

export const analyzeMessage = async (text: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content:
          "Eres un experto en ciberseguridad. Analiza el siguiente texto y dime si puede ser phishing. Da una evaluación clara y consejos",
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return (
    completion.choices[0].message.content || "No se pudo obtener respuesta"
  );
};
