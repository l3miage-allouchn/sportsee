import { Pie, PieChart, ResponsiveContainer } from "recharts";
import StatCard from "~/components/StatCard";
import { useUserActivity } from "~/hooks/useUserActivity";
import { COLORS } from "~/utils/colors";
import { addDays, formatNumericDate, getMonday, getToday } from "~/utils/dates";
import { formatWeekSummary } from "~/utils/formatters/activityFormatter";

export default function WeekSummary() {
  const startDate = getMonday(getToday());
  const endDate = addDays(startDate, 6);
  const { data, loading, error } = useUserActivity(startDate, endDate, formatWeekSummary);

  return (
    <section className="dashboard__section">
      <div>
        <h2 className="section-title">Cette semaine</h2>
        <p className="section-subtitle">
          Du {formatNumericDate(startDate)} au {formatNumericDate(endDate)}
        </p>
      </div>

      {loading && <p className="status">Chargement...</p>}
      {error && <p role="alert" className="status status--error">{error}</p>}
      {!loading && !error && data && (
        <div className="week-summary__content">
          <article className="week-summary__goal card">
            <h3 className="week-summary__count">
              x{data.sessionsCount} <span>sur objectif de {data.goal}</span>
            </h3>
            <p className="week-summary__label">Courses hebdomadaire réalisées</p>
            <div className="week-summary__chart">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  {/* startAngle / endAngle : le donut démarre en haut et tourne dans le sens des aiguilles d'une montre */}
                  <Pie
                    data={[
                      { name: "réalisées", value: data.sessionsCount, fill: COLORS.primary },
                      { name: "restants", value: data.remaining, fill: COLORS.primaryLight },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Labels placés autour du donut, comme sur la maquette */}
              <p className="week-summary__legend week-summary__legend--remaining">
                <span className="chart-legend__dot" style={{ backgroundColor: COLORS.primaryLight }} />
                {data.remaining} restants
              </p>
              <p className="week-summary__legend week-summary__legend--done">
                <span className="chart-legend__dot" style={{ backgroundColor: COLORS.primary }} />
                {data.sessionsCount} réalisées
              </p>
            </div>
          </article>

          <div className="week-summary__stats">
            <StatCard label="Durée d'activité" value={data.totalDuration} unit="minutes" />
            <StatCard label="Distance" value={data.totalDistance} unit="kilomètres" color="red" />
          </div>
        </div>
      )}
    </section>
  );
}
