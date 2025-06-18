export const analyzeMessage = async (text: string): Promise<string> => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral",
      prompt:
        "Eres un experto en ciberseguridad. Analiza el siguiente texto y dime si puede ser phishing. Da una evaluación clara y consejos:\n\n" +
        text,
      stream: false,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Error al analizar el mensaje");
  }
  return data.response || "No se pudo obtener respuesta";
};
