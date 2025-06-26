import {
  AlertCircle,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  ShieldQuestion,
} from "lucide-react";
import type { JSX } from "react";
import type { AnalysisLevel, Example } from "../types";

type Props = {
  onSelect: (message: string) => void;
};

const examples: Example[] = [
  {
    text: "Estimado cliente, su cuenta será suspendida si no verifica su información aquí: http://verifica-tu-cuenta.com",
    level: "danger",
  },
  {
    text: "Hola, soy María del equipo de soporte. ¿Pudiste resolver el problema?",
    level: "uncertain",
  },
  {
    text: "La nueva versión de la aplicación está disponible en la tienda oficial. Actualiza para seguir disfrutando del servicio.",
    level: "safe",
  },
  {
    text: "Hola soy Antonio, ¿Cómo estás, qué tal te va todo? Un saludo.",
    level: "neutral",
  },
];

const levelStyles: Record<AnalysisLevel, string> = {
  danger:
    "bg-red-100 dark:bg-red-800/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-600",
  safe: "bg-green-100 dark:bg-green-800/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-600",
  neutral:
    "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600",
  uncertain:
    "bg-yellow-100 dark:bg-yellow-800/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-600",
};

const levelIcons: Record<AnalysisLevel, JSX.Element> = {
  danger: <AlertCircle size={16} />,
  safe: <CheckCircle size={16} />,
  neutral: <HelpCircle size={16} />,
  uncertain: <ShieldQuestion size={16} />,
};

export default function ExampleMessages({ onSelect }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-200 mb-3 flex items-center gap-2">
        <MessageSquare size={16} />
        Prueba con un mensaje rápido:
      </h2>
      <div className="flex flex-wrap gap-2">
        {examples.map((example, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(example.text)}
            className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-full transition-colors border ${
              levelStyles[example.level]
            }`}
          >
            {levelIcons[example.level]}
            {example.text.length > 70
              ? example.text.slice(0, 70) + "..."
              : example.text}
          </button>
        ))}
      </div>
    </div>
  );
}
