import { checkAuth } from "@/api/auth";
import { useLogin, useLogout, useSignup } from "@/hooks/use-auth";
import type { AuthContextType, User } from "@/types";
import { createContext, useContext, useEffect, useRef, useState } from "react";

// AuthContext.tsx
const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: async (_user: User) => {
    throw new Error("signup function not implemented");
  },
  login: async (_email: string, _password: string) => {
    throw new Error("login function not implemented");
  },
  loginLoading: false,
  signupLoading: false,
  loginError: null,
  signupError: null,
  loginHasError: false,
  signupHasError: false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkUserAuth = async () => {
      const currentUser = await checkAuth();
      if (currentUser) {
        setUser(currentUser);
      }
    };
    checkUserAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await loginMutation.mutateAsync({ email, password });
      setUser(result);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const result = await logoutMutation.mutateAsync();
      setUser(null);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (user: User) => {
    try {
      const result = await signupMutation.mutateAsync(user);
      setUser(result);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        loginLoading: loginMutation.isPending,
        signupLoading: signupMutation.isPending,
        loginError: loginMutation.error,
        signupError: signupMutation.error,
        loginHasError: loginMutation.isError,
        signupHasError: signupMutation.isError,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

/**
 * useOnUserAvailable
 * 
 * Calls the provided callback immediately when the user becomes available (i.e., not null).
 * The callback will only be called once per user session (when user transitions from null to a value).
 * 
 * Usage:
 *   useOnUserAvailable((user) => { ... });
 */
export function useOnUserAvailable(callback: (user: User) => void) {
  const { user } = useAuth();
  const callbackRef = useRef(callback);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (user) {
      callbackRef.current(user);
    }
  }, [user]);
}
