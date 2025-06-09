// Auth API methods for signup, login, and refresh

import type { User } from "@/types";
import { fetchWithRefresh } from "./service";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/auth";

/**
 * Signup a new user
 * @param {Object} user - { fname, lname, email, password }
 * @returns {Promise<Object>} AuthResultDto or error
 */
export async function signup(user: User): Promise<User> {
  const response = await fetchWithRefresh(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Signup failed");
  }
  return response.json();
}

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} AuthResultDto or error
 */
export async function login(credentials: {
  email: string;
  password: string;
}): Promise<User> {
  const response = await fetchWithRefresh(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Login failed");
  }
  return response.json();
}

/**
 * Refresh authentication token
 * @param {Object} refreshRequest - { refreshToken }
 * @returns {Promise<Object>} AuthResultDto or error
 */
export async function refreshToken(refreshRequest: string) {
  const response = await fetchWithRefresh(`${API_BASE_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: refreshRequest,
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Token refresh failed");
  }
  return response.json();
}

export async function checkAuth(): Promise<User | null> {
  try {
    const res = await fetchWithRefresh(`${API_BASE_URL}/me`, {
      credentials: "include",
    });

    if (res.ok) {
      const user = await res.json();
      if (user.isAuthenticated) {
        console.log("User is logged in:", user);
        return user.user;
      }
      console.log("User is not logged in");
      return null;
    } else {
      console.log("User is not logged in");
      return null;
    }
  } catch (err) {
    console.error("Error checking auth:", err);
    return null;
  }
}
/**
 * Logout the current user by calling the backend logout endpoint.
 * This will also clear the access and refresh tokens on the server.
 * @returns {Promise<{ message: string }>} Logout result
 */
export async function logout(): Promise<{ message: string }> {
  const response = await fetchWithRefresh(`${API_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Logout failed");
  }

  return response.json();
}
