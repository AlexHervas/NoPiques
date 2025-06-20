import { Trash2, History } from "lucide-react";
import type { AnalysisWithMessage } from "../types";

type Props = {
  history: AnalysisWithMessage[];
  onClear: () => void;
};

const levelStyles: Record<AnalysisWithMessage["level"], string> = {
  danger: "border-red-300 bg-red-50 text-red-800",
  safe: "border-green-300 bg-green-50 text-green-800",
  neutral: "border-gray-300 bg-gray-50 text-gray-800",
  uncertain: "border-yellow-300 bg-yellow-50 text-yellow-800",
};

export default function AnalysisHistory({ history, onClear }: Props) {
  if (!history.length) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
          <History size={16} />
          Historial de análisis
        </h2>
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-red-500 transition"
          title="Borrar historial"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <ul className="space-y-2">
        {history.map((item, id) => (
          <li
            key={id}
            className={`border rounded-md px-3 py-2 text-sm ${
              levelStyles[item.level]
            }`}
          >
            <div className="font-semibold mb-1">“{item.message}”</div>
            <div className="text-xs text-gray-600">{item.result}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
