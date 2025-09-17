export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Server error ${response.status}: ${errorText}`);
  }

  return response.json();
}
