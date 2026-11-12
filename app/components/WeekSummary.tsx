import { Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import StatCard from "~/components/StatCard";
import { useUserActivity } from "~/hooks/useUserActivity";
import { addDays, formatNumericDate, getMonday, getToday } from "~/utils/dates";
import { formatWeekSummary } from "~/utils/formatters/activityFormatter";

export default function WeekSummary() {
  const startDate = getMonday(getToday());
  const endDate = addDays(startDate, 6);
  const { data, loading, error } = useUserActivity(startDate, endDate, formatWeekSummary);

  return (
    <section>
      <h2>Cette semaine</h2>
      <p>Du {formatNumericDate(startDate)} au {formatNumericDate(endDate)}</p>

      {loading && <p>Chargement...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && data && (
        <div>
          <article>
            <h3>
              x{data.sessionsCount} <span>sur objectif de {data.goal}</span>
            </h3>
            <p>Courses hebdomadaire réalisées</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: `${data.sessionsCount} réalisées`, value: data.sessionsCount, fill: "#0B23F4" },
                    { name: `${data.remaining} restantes`, value: data.remaining, fill: "#B6BDFC" },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                />
                <Legend position="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </article>

          <StatCard label="Durée d'activité" value={data.totalDuration} unit="minutes" />
          <StatCard label="Distance" value={data.totalDistance} unit="kilomètres" />
        </div>
      )}
    </section>
  );
}
