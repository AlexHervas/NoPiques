import { ShieldAlert } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 bg-white/60 dark:bg-gray-900/70 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
      <ShieldAlert className="w-10 h-10 text-indigo-500 animate-spin" />
      <p className="mt-4 text-indigo-700 dark:text-indigo-300 font-semibold">
        Analizando mensaje…
      </p>
    </div>
  );
}
