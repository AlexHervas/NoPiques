export default function Footer() {
  return (
    <footer className="bg-gray-200 py-4">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} NoPiques — Protegiendo a los usuarios del
        phishing.
      </div>
    </footer>
  );
}
