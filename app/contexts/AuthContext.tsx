import { createContext, useContext, useState, type ReactNode } from "react";
import { getToken, removeToken, setToken } from "~/utils/cookies";

type AuthContextValue = {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => getToken());

  function login(newToken: string) {
    setToken(newToken);
    setTokenState(newToken);
  }

  function logout() {
    removeToken();
    setTokenState(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur de AuthProvider");
  }
  return context;
}
