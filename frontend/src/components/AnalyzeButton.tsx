type Props = {
  onclick: () => void;
  disabled?: boolean;
};

export default function AnalyzeButton({ onclick, disabled }: Props) {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`w-full h-12 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Analizar mensaje
    </button>
  );
}
