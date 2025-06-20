import { useEffect, useState } from "react";
import Header from "./components/Header";
import MessageInput from "./components/messageInput";
import AnalyzeButton from "./components/AnalyzeButton";
import AnalysisResult from "./components/AnalysisResult";
import Footer from "./components/Footer";
import ExampleMessages from "./components/ExamplesMessages";
import LoadingOverlay from "./components/LoadingOverlay";
import AnalysisHistory from "./components/AnalysisHistory";
import type { Analysis, AnalysisWithMessage } from "./types";

export default function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<AnalysisWithMessage[]>(() => {
    const savedHistory = localStorage.getItem("analysisHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "analysisHistory",
      JSON.stringify(history.slice(0, 10))
    );
  }, [history]);

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
      console.log("Resultado del análisis:", data);
      setHistory((prev) => [{ message, ...data }, ...prev.slice(0, 9)]);
    } catch (err) {
      console.error(err);
      setError("Error al analizar el mensaje. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 relative overflow-hidden">
      {loading && <LoadingOverlay />}

      <Header />

      <main className="flex-grow px-4 py-10 sm:px-6 md:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <ExampleMessages onSelect={(msg) => setMessage(msg)} />
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
          {history.length > 0 && (
            <AnalysisHistory history={history} onClear={() => setHistory([])} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
