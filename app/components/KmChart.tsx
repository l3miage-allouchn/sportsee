import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useUserActivity } from "~/hooks/useUserActivity";
import { addDays, getToday } from "~/utils/dates";
import { formatWeeklyDistances, getAverageDistance } from "~/utils/formatters/activityFormatter";

export default function KmChart() {
  const endDate = getToday();
  const startDate = addDays(endDate, -27);
  const { data, loading, error } = useUserActivity(startDate, endDate, formatWeeklyDistances);

  if (loading) {
    return <section><p>Chargement...</p></section>;
  }
  if (error || !data) {
    return <section><p role="alert">{error ?? "Aucune donnée"}</p></section>;
  }

  return (
    <section>
      <h3>{getAverageDistance(data)}km en moyenne</h3>
      <p>Total des kilomètres 4 dernières semaines</p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="km" name="Km" fill="#B6BDFC" radius={10} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
