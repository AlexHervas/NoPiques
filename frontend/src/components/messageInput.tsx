type Props = {
  message: string;
  onChange: (value: string) => void;
};

export default function MessageInput({ message, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="message"
        className="block text-sm font-medium text-gray-700"
      >
        Mensaje a analizar:
      </label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-40 p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-white"
        placeholder="Pega aquí el mensaje que quieres analizar..."
      />
    </div>
  );
}
