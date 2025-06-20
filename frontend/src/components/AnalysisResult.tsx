import type { AnalysisLevel } from "../types";

type AnalysisResultProps = {
  level: AnalysisLevel;
  result: string;
};

const baseClasses =
  "p-4 rounded-xl transition-all duration-300 min-h-[80px] text-sm animate-fade-in";

const styles: Record<AnalysisLevel, string> = {
  danger: "bg-red-100 border-red-300 text-red-800 shadow-red-200",
  safe: "bg-green-100 border-green-300 text-green-800 shadow-green-200",
  neutral: "bg-gray-100 border-gray-300 text-gray-700 shadow-gray-200",
  uncertain:
    "bg-yellow-100 border-yellow-300 text-yellow-800 shadow-yellow-200",
};

const icons: Record<AnalysisLevel, string> = {
  danger: "🚨",
  safe: "🛡️",
  neutral: "ℹ️",
  uncertain: "❓",
};

const titles: Record<AnalysisLevel, string> = {
  danger: "Posible amenaza detectada",
  safe: "Mensaje considerado seguro",
  neutral: "Análisis neutral o sin determinar",
  uncertain: "El resultado no es concluyente",
};

export default function AnalysisResult({ level, result }: AnalysisResultProps) {
  return (
    <div className={`${baseClasses} border shadow-sm ${styles[level]}`}>
      <div className="flex items-start gap-2">
        <span className="text-xl">{icons[level]}</span>
        <span>{titles[level]}</span>
      </div>
      <div className="pl-8 text-sm leading-relaxed">{result}</div>
    </div>
  );
}
