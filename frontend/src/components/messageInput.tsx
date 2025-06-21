type Props = {
  message: string;
  onChange: (value: string) => void;
};

export default function MessageInput({ message, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="message"
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        Mensaje a analizar:
      </label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border rounded-md text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
        placeholder="Pega aquí el mensaje que quieres analizar..."
      />
    </div>
  );
}
