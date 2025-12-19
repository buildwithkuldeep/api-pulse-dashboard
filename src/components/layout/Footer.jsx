export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-3 mt-10">
      <p className="text-center">
        © {new Date().getFullYear()} API Pulse Dashboard
      </p>
    </footer>
  );
}
