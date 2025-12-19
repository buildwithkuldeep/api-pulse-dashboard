export async function fetchGithubUsers() {
  const response = await fetch("https://api.github.com/users");

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub users");
  }

  return response.json();
}
