type Props = {
  result: string;
};

export default function AnalysisResult({ result }: Props) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm text-gray-700 min-h-[80px]">
      {result || "Aquí aparecerá el resultado del análisis."}
    </div>
  );
}
