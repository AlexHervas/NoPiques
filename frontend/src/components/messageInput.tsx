type Props = {
  message: string;
  onChange: (value: string) => void;
};

export default function MessageInput({ message, onChange }: Props) {
  return (
    <textarea
      value={message}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
      placeholder="Pega aquí el mensaje que quieres analizar..."
    />
  );
}
