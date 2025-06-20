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
];

const levelStyles: Record<AnalysisLevel, string> = {
  danger: "bg-red-100 text-red-800 border-red-200",
  safe: "bg-green-100 text-green-800 border-green-200",
  neutral: "bg-gray-100 text-gray-800 border-gray-300",
  uncertain: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const levelIcons: Record<AnalysisLevel, JSX.Element> = {
  danger: <AlertCircle size={16} />,
  safe: <CheckCircle size={16} />,
  neutral: <HelpCircle size={16} />,
  uncertain: <ShieldQuestion size={16} />,
};

export default function ExampleMessages({ onSelect }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h2 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
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
