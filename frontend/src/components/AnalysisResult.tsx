type Props = {
  result: string;
};

function getStatus(result: string) {
  if (!result) return "neutral";

  const lowerResult = result.toLowerCase();

  if (
    lowerResult.includes("phishing") ||
    lowerResult.includes("fraude") ||
    lowerResult.includes("sospechoso")
  ) {
    return "danger";
  }
  if (
    lowerResult.includes("parece seguro") ||
    lowerResult.includes("legítimo") ||
    lowerResult.includes("confiable") ||
    lowerResult.includes("no es sospechoso")
  ) {
    return "safe";
  }

  return "neutral";
}

export default function AnalysisResult({ result }: Props) {
  const status = getStatus(result);

  const baseClasses =
    "p-4 rounded-lg shadow-sm border transition-all min-h-[80px] text-sm";

  const styles = {
    danger: "bg-red-100 border-red-400 text-red-700",
    safe: "bg-green-100 border-green-400 text-green-700",
    neutral: "bg-gray-100 border-gray-300 text-gray-700",
  };

  const icons = {
    danger: "⚠️",
    safe: "✅",
    neutral: "ℹ️",
  };

  return (
    <div className={`${baseClasses} ${styles[status]}`}>
      <div className="flex items-center gap-2">
        <span className="text-xl">{icons[status]}</span>
        <span>{result || "Aquí aparecerá el resultado del análisis."}</span>
      </div>
    </div>
  );
}
