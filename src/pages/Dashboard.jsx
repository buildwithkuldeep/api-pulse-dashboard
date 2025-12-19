import { useEffect, useState } from "react";
import { fetchGithubUsers } from "../services/githubApi";
import Container from "../components/ui/Container";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import UserCard from "../components/UserCard";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const data = await fetchGithubUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  useEffect(() => {
    const result = users.filter((user) =>
      user.login.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
  }, [search, users]);

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <Container>
        <h2 className="text-2xl font-bold mb-4 text-center">
          GitHub Users
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search GitHub users"
        />

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && filteredUsers.length === 0 && (
          <p className="text-center text-gray-500">
            No users found.
          </p>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
