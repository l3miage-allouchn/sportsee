type LogoProps = {
  showText?: boolean;
};

// Logo dessiné en SVG (barres) + texte. À remplacer par l'export Figma si besoin.
export default function Logo({ showText = true }: LogoProps) {
  return (
    <span className="logo">
      <svg width="19" height="21" viewBox="0 0 19 21" aria-hidden="true">
        <rect x="0" y="6" width="2.5" height="10" rx="1.25" fill="#F4320B" />
        <rect x="4" y="2" width="2.5" height="17" rx="1.25" fill="#E0306A" />
        <rect x="8" y="0" width="2.5" height="21" rx="1.25" fill="#9B2BB0" />
        <rect x="12" y="3" width="2.5" height="15" rx="1.25" fill="#4A27D6" />
        <rect x="16" y="5" width="2.5" height="11" rx="1.25" fill="#0B23F4" />
      </svg>
      {showText && <span className="logo__text">SPORTSEE</span>}
    </span>
  );
}
