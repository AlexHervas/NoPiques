import { Moon, ShieldCheck, Sun } from "lucide-react";

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export default function Header({ darkMode, toggleDarkMode }: Props) {
  return (
    <header className="relative bg-indigo-600 dark:bg-indigo-700 text-white py-6 shadow transition-colors">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <ShieldCheck className="w-8 h-8" />
            NoPiques
          </h1>
          <p className="text-sm text-indigo-200 dark:text-indigo-100">
            Detecta mensajes sospechosos de phishing
          </p>
        </div>

        <button
          onClick={toggleDarkMode}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
          title="Alternar modo oscuro"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
