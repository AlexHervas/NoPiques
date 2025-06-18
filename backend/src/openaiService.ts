import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeMessage = async (text: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
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
