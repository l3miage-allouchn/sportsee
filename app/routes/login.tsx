import { useState, type SubmitEvent } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import { loginRequest } from "~/services/authService";

export function meta() {
  return [{ title: "Connexion - SportSee" }];
}

export default function Login() {
  const { token, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (token) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const newToken = await loginRequest(username, password);
      login(newToken);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Identifiant</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}
