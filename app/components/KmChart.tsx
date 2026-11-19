import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartLegend from "~/components/ChartLegend";
import { useUserActivity } from "~/hooks/useUserActivity";
import { COLORS } from "~/utils/colors";
import { addDays, formatShortDate, getToday } from "~/utils/dates";
import { formatWeeklyDistances, getAverageDistance } from "~/utils/formatters/activityFormatter";

const AXIS_TICK = { fontSize: 12, fill: COLORS.grey };

export default function KmChart() {
  const today = getToday();
  const [endDate, setEndDate] = useState(today);
  const startDate = addDays(endDate, -27);
  const { data, loading, error } = useUserActivity(startDate, endDate, formatWeeklyDistances);

  function showPreviousPeriod() {
    setEndDate(addDays(endDate, -28));
  }

  function showNextPeriod() {
    setEndDate(addDays(endDate, 28));
  }

  return (
    <section className="chart-card card">
      <div className="chart-card__header">
        <h3 className="chart-card__title">
          {data ? `${getAverageDistance(data)}km en moyenne` : "-- km en moyenne"}
        </h3>
        <div className="chart-nav">
          <button type="button" className="chart-nav__button" onClick={showPreviousPeriod} aria-label="Période précédente">‹</button>
          <span>{formatShortDate(startDate)} - {formatShortDate(endDate)}</span>
          <button
            type="button"
            className="chart-nav__button"
            onClick={showNextPeriod}
            disabled={endDate >= today}
            aria-label="Période suivante"
          >›</button>
        </div>
      </div>
      <p className="chart-card__subtitle">Total des kilomètres 4 dernières semaines</p>

      {loading && <p className="status">Chargement...</p>}
      {error && <p role="alert" className="status status--error">{error}</p>}
      {!loading && !error && data && (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.grid} />
              <XAxis dataKey="week" tickLine={false} tick={AXIS_TICK} />
              <YAxis tickLine={false} tick={AXIS_TICK} width={30} />
              <Tooltip cursor={{ fill: COLORS.grid, opacity: 0.4 }} />
              <Bar dataKey="km" name="Km" fill={COLORS.primaryLight} radius={10} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
          <ChartLegend items={[{ label: "Km", color: COLORS.primaryLight }]} />
        </>
      )}
    </section>
  );
}
