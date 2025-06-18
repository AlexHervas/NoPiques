type AnalysisResultProps = {
  level: string;
  result: string;
};

type Status = "danger" | "safe" | "neutral";

function getStatus(level: string): Status {
  switch (level) {
    case "danger":
      return "danger";
    case "safe":
      return "safe";
    default:
      return "neutral";
  }
}

export default function AnalysisResult({ level, result }: AnalysisResultProps) {
  const status = getStatus(level);

  const baseClasses =
    "p-4 rounded-lg shadow-sm border transition-all min-h-[80px] text-sm";

  const styles: Record<Status, string> = {
    danger: "bg-red-100 border-red-400 text-red-700",
    safe: "bg-green-100 border-green-400 text-green-700",
    neutral: "bg-gray-100 border-gray-300 text-gray-700",
  };

  const icons: Record<Status, string> = {
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
