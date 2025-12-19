import { useEffect, useState } from "react";
import { fetchGithubUsers } from "../services/githubApi";
import Container from "../components/ui/Container";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import UserCard from "../components/UserCard";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [since, setSince] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const data = await fetchGithubUsers(since);
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [since]);

  useEffect(() => {
    const result = users.filter((user) =>
      user.login.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
  }, [search, users]);

  function nextPage() {
    setHistory((prev) => [...prev, since]);
    setSince(users[users.length - 1].id);
  }

  function prevPage() {
    const prev = history[history.length - 1];
    setHistory((prevHist) => prevHist.slice(0, -1));
    setSince(prev);
  }

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
          className="w-full mb-6 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && filteredUsers.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevPage}
                disabled={history.length === 0}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={nextPage}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}
