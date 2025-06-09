const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/auth";
 
export async function fetchWithRefresh(
  input: RequestInfo,
  init: RequestInit = {}
) {
  let res = await fetch(input, {
    ...init,
    credentials: "include", // Send cookies
  });

  if (res.status === 401) {
    // Try to refresh token
    const refreshRes = await fetch(`${API_BASE_URL}/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      // Retry original request
      res = await fetch(input, {
        ...init,
        credentials: "include",
      });
    } else {
      throw new Error("Session expired. Please log in again.");
    }
  }

  return res;
}
