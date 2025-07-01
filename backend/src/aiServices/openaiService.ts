import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

// Extraemos los dominios de cualquier enlace presente en el mensaje
const extractDomains = (text: string): string[] => {
  const regex = /https?:\/\/([^/\s]+)/g;
  const domains: string[] = [];
  let match;
  while ((match = regex.exec(text))) {
    domains.push(match[1]);
  }
  return domains;
};

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

  const domains = extractDomains(message);
  const domainInfo = domains.length
    ? `El mensaje contiene los siguientes dominios: ${domains.join(
        ", "
      )}. Evalúalos también.`
    : "El mensaje no contiene enlaces.";

  const prompt = `Eres un experto en ciberseguridad. Evalúa el siguiente mensaje y responde exclusivamente con un JSON como este:

{
  "level": "danger" | "safe" | "neutral" | "uncertain",
  "result": "explicación breve en español"
}

Ten en cuenta:
- El simple hecho de mencionar bancos, buzones o servicios NO implica que sea phishing.
- Considera el tono general, urgencia injustificada, faltas ortográficas o gramaticales, y enlaces sospechosos.
- Si no hay señales claras, considera el mensaje como 'neutral' o 'uncertain'.
- Si el mensaje parece legítimo pero no se puede verificar con certeza, clasifícalo como 'uncertain'.

${domainInfo}

Mensaje:
"""${message}"""`;

  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  const content = completion.choices[0].message.content || "";

  try {
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
