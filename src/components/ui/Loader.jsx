export default function Loader() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-40 bg-gray-300 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}
