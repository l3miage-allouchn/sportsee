import { useState, type SubmitEvent } from "react";
import { Navigate, useNavigate } from "react-router";
import Logo from "~/components/Logo";
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
    <main className="login">
      <div className="login__column">
        <Logo />

        <section className="login__card">
          <h1 className="login__title">Transformez vos stats en résultats</h1>
          <h2 className="login__subtitle">Se connecter</h2>

          <form onSubmit={handleSubmit} className="login__form">
            <div className="login__field">
              <label htmlFor="username" className="login__label">Identifiant</label>
              <input
                id="username"
                type="text"
                className="login__input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="login__field">
              <label htmlFor="password" className="login__label">Mot de passe</label>
              <input
                id="password"
                type="password"
                className="login__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p role="alert" className="login__error">{error}</p>}

            <button type="submit" className="button" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </section>
      </div>

      <div className="login__picture">
        <p className="login__caption">
          Analysez vos performances en un clin d'œil, suivez vos progrès et atteignez vos objectifs.
        </p>
      </div>
    </main>
  );
}
