import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error || "Error inesperado");
      }
    } catch (err) {
      setError("Error de red o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 shadow">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">NoPiques 🛡️</h1>
          <p className="text-sm text-indigo-200">
            Detecta mensajes sospechosos de phishing
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-10 flex-grow">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Textarea */}
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            placeholder="Pega aquí el mensaje que quieres analizar..."
          />

          {/* Botón */}
          <button className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition">
            Analizar mensaje
          </button>

          {/* Resultado (placeholder por ahora) */}
          <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm text-gray-700">
            Aquí aparecerá el resultado del análisis.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} NoPiques — Protegiendo a los usuarios del
          phishing.
        </div>
      </footer>
    </div>
  );
}

export default App;
