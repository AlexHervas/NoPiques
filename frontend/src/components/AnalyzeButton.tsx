import { ShieldCheck } from "lucide-react";

type Props = {
  onclick: () => void;
  disabled?: boolean;
};

export default function AnalyzeButton({ onclick, disabled }: Props) {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-2 h-12 px-6 py-3 rounded-xl text-sm font-medium transition-transform duration-200
        bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
        text-white shadow-md active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <ShieldCheck size={25} />
      Analizar mensaje
    </button>
  );
}
