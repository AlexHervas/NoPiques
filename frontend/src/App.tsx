import { useEffect, useState } from "react";
import Header from "./components/Header";
import MessageInput from "./components/MessageInput";
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
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (loading) {
      document.title = "Analizando mensaje...";
    } else if (result) {
      document.title = "✅ Análisis completado | NoPiques";
    } else {
      document.title = "NoPiques - Detector de Phishing";
    }
  }, [loading, result]);

  useEffect(() => {
    const root = document.documentElement;
    console.log(document.documentElement.classList);
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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
      const res = await fetch("https://nopiques.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (res.status === 429) {
        const data = await res.json();
        setError(
          data.error ||
            "Has alcanzado el límite diario de análisis. Vuelve mañana."
        );
        return;
      }

      if (!res.ok) throw new Error("Error en el análisis");

      const data: Analysis = await res.json();
      setResult(data);
      setHistory((prev) => [{ message, ...data }, ...prev.slice(0, 9)]);
    } catch (err) {
      console.error(err);
      setError("Error al analizar el mensaje. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 relative overflow-hidden">
      {loading && <LoadingOverlay />}

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

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
          {error && (
            <div className="relative flex justify-center items-center gap-2 p-4 rounded-lg border border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-800/20 text-red-700 dark:text-red-200 shadow-sm">
              <span className="text-lg">⚠️</span>
              <span className="text-sm text-center">{error}</span>
              <button
                onClick={() => setError("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600 dark:hover:text-red-300 text-sm font-bold"
              >
                X
              </button>
            </div>
          )}
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
