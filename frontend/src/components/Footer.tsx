export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-center text-sm py-4 transition-colors">
      <div className="container mx-auto px-4">
        © {new Date().getFullYear()} <strong>NoPiques</strong> - Protegiendo a
        los usuarios del phishing.
      </div>
    </footer>
  );
}
