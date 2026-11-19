import { Link, NavLink } from "react-router";
import Logo from "~/components/Logo";
import { useAuth } from "~/contexts/AuthContext";

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="header container">
      <Link to="/" aria-label="SportSee - Accueil">
        <Logo />
      </Link>
      <nav className="menu">
        <NavLink to="/" end className="menu__link">Dashboard</NavLink>
        <NavLink to="/profil" className="menu__link">Mon profil</NavLink>
        <button type="button" onClick={logout} className="menu__logout">Se déconnecter</button>
      </nav>
    </header>
  );
}
