import { useMutation } from "@tanstack/react-query";
import { signup, login, refreshToken } from "@/api/auth";
import type { User } from "@/types";
import { logout } from "@/api/auth";
// Signup hook
export function useSignup() {
  return useMutation({
    mutationFn: (user: User) => signup(user),
  });
}

// Login hook
export function useLogin() {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      login(credentials),
  });
}

// Refresh token hook
export function useRefreshToken() {
  return useMutation({
    mutationFn: (refreshRequest: string) => refreshToken(refreshRequest),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
  });
}
