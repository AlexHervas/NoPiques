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
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>NoPiques 🛡️</h1>
      <p>Introduce el mensaje sospechoso que quieras analizar:</p>

      <form onSubmit={handleSubmit}>
        <textarea
          rows={8}
          style={{ width: "100%", marginBottom: 10 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ejemplo: Estimado cliente, su cuenta ha sido bloqueada..."
        />
        <button type="submit" disabled={loading || !text}>
          {loading ? "Analizando..." : "Analizar"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Resultado del análisis:</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: 20, color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </main>
  );
}

export default App;
