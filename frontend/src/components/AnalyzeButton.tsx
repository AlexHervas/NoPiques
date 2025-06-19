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
      className={`cursor-pointer w-full flex items-center justify-center gap-2 h-12 px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl shadow-md transition-transform duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98] ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <ShieldCheck size={25} />
      Analizar mensaje
    </button>
  );
}
