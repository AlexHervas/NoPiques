export const analyzeMessage = async (
  message: string
): Promise<{ level: string; result: string }> => {
  const prompt = `
Eres un experto en ciberseguridad. Tu tarea es analizar mensajes y decidir si podrían ser intentos de phishing.

Responde *solo* en este formato JSON válido:

{
  "level": "danger" | "safe" | "neutral" | "uncertain",
  "result": "una explicación breve del análisis"
}

Ejemplos:

Mensaje: "Haz clic aquí para verificar tu cuenta bancaria: http://fakebank.com"
Respuesta:
{
  "level": "danger",
  "result": "El mensaje contiene un enlace sospechoso y lenguaje urgente típico del phishing."
}

Mensaje: "Hola, ¿puedes ayudarme con este documento?"
Respuesta:
{
  "level": "neutral",
  "result": "El mensaje no parece malicioso pero no se puede confirmar su seguridad sin más contexto."
}

Mensaje: "Hola, soy Ana del soporte técnico. ¿Sigues teniendo el problema?"
Respuesta:
{
  "level": "safe",
  "result": "El mensaje parece ser legítimo, no contiene enlaces ni solicitudes sospechosas."
}

Ahora analiza este mensaje:

"${message}"

Respuesta:
`;

  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral",
      prompt,
      stream: false,
    }),
  });

  const data = await res.json();
  console.log("Respuesta cruda del modelo:", data.response);

  try {
    const jsonMatch = data.response.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      return {
        level: "uncertain",
        result: "No se pudo analizar el mensaje correctamente.",
      };
    }
    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("Error al parsear la respuesta:", err, data.response);
    return {
      level: "uncertain",
      result: "No se pudo analizar el mensaje correctamente.",
    };
  }
};
