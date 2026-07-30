import { createContext, useContext, useState, type ReactNode } from "react";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, utf8ToBytes } from "@noble/hashes/utils.js";
export type AccountName = "SinbodWayne" | "KyanWayne";
const accountHashes: Record<AccountName, string> = {
  SinbodWayne:
    "db5b765f020b9af7aa788267e0eb9cb6e2c5a0d5a9de6d431aae322fff151ade",
  KyanWayne: "84160d8d352acd9b2fc575dfa6cd5bde13c6a2d1f9a7c0779b76ccca73f2bb89",
};
const SESSION_KEY = "filmcraft-active-account";
// Plain-http LAN origins do not expose SubtleCrypto. This deterministic SHA-256
// implementation works on localhost, LAN addresses and installed PWAs alike.
export function digest(value: string) {
  return bytesToHex(sha256(utf8ToBytes(value)));
}
type AuthContext = {
  user: AccountName | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};
const Context = createContext<AuthContext | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AccountName | null>(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    return saved === "SinbodWayne" || saved === "KyanWayne" ? saved : null;
  });
  const login = async (username: string, password: string) => {
    if (!(username in accountHashes)) return false;
    const name = username as AccountName;
    if (digest(`filmcraft-v1.1:${name}:${password}`) !== accountHashes[name])
      return false;
    sessionStorage.setItem(SESSION_KEY, name);
    setUser(name);
    return true;
  };
  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };
  return (
    <Context.Provider value={{ user, login, logout }}>
      {children}
    </Context.Provider>
  );
}
export function useAuth() {
  const value = useContext(Context);
  if (!value) throw new Error("Auth provider missing");
  return value;
}
