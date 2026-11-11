import { NavLink } from "react-router";
import { useAuth } from "~/contexts/AuthContext";

export default function Header() {
  const { logout } = useAuth();

  return (
    <header>
      <NavLink to="/">SportSee</NavLink>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/profil">Mon profil</NavLink>
        <button type="button" onClick={logout}>Se déconnecter</button>
      </nav>
    </header>
  );
}
