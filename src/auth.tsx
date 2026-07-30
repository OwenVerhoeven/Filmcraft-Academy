import { createContext, useContext, useState, type ReactNode } from "react";
import { cloudLogin, cloudLogout } from "./lib/cloud";

export type AccountName = "SinbodWayne" | "KyanWayne";
const ACCOUNT_KEY = "filmcraft-active-account";
const TOKEN_KEY = "filmcraft-cloud-token";
const EXPIRY_KEY = "filmcraft-cloud-token-expiry";

type AuthContext = {
  user: AccountName | null;
  token: string | null;
  cloudConnected: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};
const Context = createContext<AuthContext | null>(null);

function savedSession() {
  const user = localStorage.getItem(ACCOUNT_KEY);
  const token = localStorage.getItem(TOKEN_KEY);
  const expiresAt = Number(localStorage.getItem(EXPIRY_KEY) ?? "0");
  if (
    (user !== "SinbodWayne" && user !== "KyanWayne") ||
    !token ||
    expiresAt <= Date.now()
  ) {
    localStorage.removeItem(ACCOUNT_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    return null;
  }
  return { user, token } as { user: AccountName; token: string };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = useState(savedSession)[0];
  const [token, setToken] = useState<string | null>(initial?.token ?? null);
  const [user, setUser] = useState<AccountName | null>(initial?.user ?? null);

  const login = async (username: string, password: string) => {
    if (username !== "SinbodWayne" && username !== "KyanWayne") return false;
    try {
      const cloud = await cloudLogin(username, password);
      localStorage.setItem(ACCOUNT_KEY, cloud.user);
      localStorage.setItem(TOKEN_KEY, cloud.token);
      localStorage.setItem(EXPIRY_KEY, String(cloud.expiresAt));
      setToken(cloud.token);
      setUser(cloud.user);
      return true;
    } catch (error) {
      const status = (error as { status?: number }).status;
      if (status === 401 || status === 429) return false;
      throw error;
    }
  };

  const logout = () => {
    if (token) void cloudLogout(token).catch(() => undefined);
    localStorage.removeItem(ACCOUNT_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <Context.Provider
      value={{ user, token, cloudConnected: Boolean(token), login, logout }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAuth() {
  const value = useContext(Context);
  if (!value) throw new Error("Auth provider missing");
  return value;
}
