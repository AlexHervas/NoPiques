import { Trash2, History } from "lucide-react";
import type { AnalysisWithMessage } from "../types";

type Props = {
  history: AnalysisWithMessage[];
  onClear: () => void;
};

const levelStyles: Record<AnalysisWithMessage["level"], string> = {
  danger:
    "bg-red-50 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-500/30",
  safe: "bg-green-50 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-500/30",
  neutral:
    "bg-gray-50 text-gray-800 border-gray-300 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700",
  uncertain:
    "bg-yellow-50 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-500/30",
};

export default function AnalysisHistory({ history, onClear }: Props) {
  if (!history.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-100 flex items-center gap-2">
          <History size={16} />
          Historial de análisis
        </h2>
        <button
          onClick={onClear}
          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
          title="Borrar historial"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {history.map((item, id) => (
          <li
            key={id}
            className={`border rounded-md px-3 py-2 text-sm ${
              levelStyles[item.level]
            }`}
          >
            <div className="font-semibold mb-1 break-words">
              “{item.message}”
            </div>
            <div className="text-xs opacity-80">{item.result}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
