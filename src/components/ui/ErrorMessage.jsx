export default function ErrorMessage({ message }) {
  return (
    <p className="text-center text-red-500 font-medium">
      {message}
    </p>
  );
}
