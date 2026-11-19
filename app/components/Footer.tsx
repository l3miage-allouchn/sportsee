import Logo from "~/components/Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__group">
        <span>©Sportsee</span>
        <span>Tous droits réservés</span>
      </p>
      <p className="footer__group">
        <span>Conditions générales</span>
        <span>Contact</span>
        <Logo showText={false} />
      </p>
    </footer>
  );
}
