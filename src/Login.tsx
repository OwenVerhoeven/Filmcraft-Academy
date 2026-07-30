import { useState, type FormEvent } from "react";
import { Aperture, Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "./auth";

export function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (!(await login(username.trim(), password)))
        setError("Username or password is incorrect.");
    } catch {
      setError(
        "This device could not verify the account. Reload and try again.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <main className="login-screen">
      <div className="login-atmosphere" />
      <form className="login-panel" onSubmit={submit}>
        <div className="login-mark">
          <Aperture />
          <span>
            FILMCRAFT<small>ACADEMY</small>
          </span>
        </div>
        <div>
          <h1>Enter the Academy</h1>
          <p>Two filmmakers. Two independent journeys.</p>
        </div>
        <label>
          Account
          <input
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </label>
        <label>
          Password
          <div className="password-field">
            <input
              autoComplete="current-password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </label>
        {error && (
          <div className="login-error" role="alert">
            {error}
          </div>
        )}
        <button className="button major" disabled={busy}>
          <LogIn />
          {busy ? "Verifying…" : "Enter journey"}
        </button>
        <small className="login-note">
          Progress and evidence remain isolated per account on this device.
        </small>
      </form>
    </main>
  );
}
