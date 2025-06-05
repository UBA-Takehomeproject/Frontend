type User = {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER" ;
};

export type AuthContextType = {
  user: User | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
