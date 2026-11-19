import { Link } from "react-router";

export function meta() {
  return [{ title: "Page introuvable - SportSee" }];
}

export default function NotFound() {
  return (
    <main className="not-found">
      <h1 className="not-found__code">404</h1>
      <p>Oups ! La page que vous demandez n'existe pas.</p>
      <Link to="/" className="not-found__link">Retour à l'accueil</Link>
    </main>
  );
}
