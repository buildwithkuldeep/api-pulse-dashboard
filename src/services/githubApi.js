export async function fetchGithubUsers(since = 0) {
  const response = await fetch(
    `https://api.github.com/users?since=${since}&per_page=12`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub users");
  }

  return response.json();
}
