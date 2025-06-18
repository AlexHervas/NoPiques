import { useState } from "react";
import Header from "./components/Header";
import MessageInput from "./components/messageInput";
import AnalyzeButton from "./components/AnalyzeButton";
import AnalysisResult from "./components/AnalysisResult";
import Footer from "./components/Footer";

type Analysis = {
  level: "danger" | "safe" | "neutral" | "uncertain";
  result: string;
};

export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:4000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Error en el análisis");

      const data: Analysis = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Error al analizar el mensaje. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-10 flex-grow">
        <div className="max-w-2xl mx-auto space-y-6">
          <MessageInput message={message} onChange={setMessage} />
          <AnalyzeButton
            onclick={handleAnalyze}
            disabled={!message.trim() || loading}
          />
          {loading && (
            <div className="text-center text-indigo-500 font-semibold animate-pulse">
              Analizando mensaje...
            </div>
          )}
          {error && <div className="text-red-500 font-semibold">{error}</div>}
          {result && (
            <AnalysisResult level={result.level} result={result.result} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
