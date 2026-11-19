type LegendItem = {
  label: string;
  color: string;
};

type ChartLegendProps = {
  items: LegendItem[];
};

// Légende en HTML sous les graphiques : plus simple à placer à gauche (comme sur la maquette)
// que la légende de Recharts.
export default function ChartLegend({ items }: ChartLegendProps) {
  return (
    <ul className="chart-legend">
      {items.map((item) => (
        <li key={item.label} className="chart-legend__item">
          <span className="chart-legend__dot" style={{ backgroundColor: item.color }} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
