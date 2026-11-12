type StatCardProps = {
  label: string;
  value: number | string;
  unit: string;
};

export default function StatCard({ label, value, unit }: StatCardProps) {
  return (
    <article>
      <p>{label}</p>
      <p>
        <strong>{value}</strong> {unit}
      </p>
    </article>
  );
}
