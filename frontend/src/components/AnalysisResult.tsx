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
    "p-4 rounded-xl transition-all duration-300 min-h-[80px] text-sm animate-fade-in";

  const styles: Record<Status, string> = {
    danger: "bg-red-100 border-red-300 text-red-800 shadow-red-200",
    safe: "bg-green-100 border-green-300 text-green-800 shadow-green-200",
    neutral: "bg-gray-100 border-gray-300 text-gray-700 shadow-gray-200",
  };

  const icons: Record<Status, string> = {
    danger: "🚨",
    safe: "🛡️",
    neutral: "ℹ️",
  };

  const titles: Record<Status, string> = {
    danger: "Posible amenaza detectada",
    safe: "Mensaje considerado seguro",
    neutral: "Análisis neutral o sin determinar",
  };

  return (
    <div className={`${baseClasses} border shadow-sm ${styles[status]}`}>
      <div className="flex items-start gap-2">
        <span className="text-xl">{icons[status]}</span>
        <span>{titles[status]}</span>
      </div>
      <div className="pl-8 text-sm leading-relaxed">{result}</div>
    </div>
  );
}
