export default function UserCard({ user }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl hover:-translate-y-1 transition-all">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-20 h-20 rounded-full mx-auto"
      />
      <h3 className="text-center mt-3 font-semibold">
        {user.login}
      </h3>
      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="block text-center text-blue-600 text-sm mt-1 hover:underline"
      >
        View Profile
      </a>
    </div>
  );
}
