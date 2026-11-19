type StatCardProps = {
  label: string;
  value: number | string;
  unit: string;
  color?: "default" | "red" | "blue";
};

export default function StatCard({ label, value, unit, color = "default" }: StatCardProps) {
  return (
    <article className={`stat-card stat-card--${color}`}>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">
        <strong>{value}</strong> {unit}
      </p>
    </article>
  );
}
