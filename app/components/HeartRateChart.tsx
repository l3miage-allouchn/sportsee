import { useState } from "react";
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartLegend from "~/components/ChartLegend";
import { useUserActivity } from "~/hooks/useUserActivity";
import { COLORS } from "~/utils/colors";
import { addDays, formatShortDate, getMonday, getToday } from "~/utils/dates";
import { formatDailyHeartRates, getAverageHeartRate } from "~/utils/formatters/activityFormatter";

const AXIS_TICK = { fontSize: 12, fill: COLORS.grey };

export default function HeartRateChart() {
  const currentMonday = getMonday(getToday());
  const [startDate, setStartDate] = useState(currentMonday);
  const endDate = addDays(startDate, 6);
  const { data, loading, error } = useUserActivity(startDate, endDate, formatDailyHeartRates);

  const average = data ? getAverageHeartRate(data) : null;

  function showPreviousWeek() {
    setStartDate(addDays(startDate, -7));
  }

  function showNextWeek() {
    setStartDate(addDays(startDate, 7));
  }

  return (
    <section className="chart-card card">
      <div className="chart-card__header">
        <h3 className="chart-card__title chart-card__title--red">
          {average !== null ? `${average} BPM` : "-- BPM"}
        </h3>
        <div className="chart-nav">
          <button type="button" className="chart-nav__button" onClick={showPreviousWeek} aria-label="Semaine précédente">‹</button>
          <span>{formatShortDate(startDate)} - {formatShortDate(endDate)}</span>
          <button
            type="button"
            className="chart-nav__button"
            onClick={showNextWeek}
            disabled={startDate >= currentMonday}
            aria-label="Semaine suivante"
          >›</button>
        </div>
      </div>
      <p className="chart-card__subtitle">Fréquence cardiaque moyenne</p>

      {loading && <p className="status">Chargement...</p>}
      {error && <p role="alert" className="status status--error">{error}</p>}
      {!loading && !error && average === null && <p className="status">Aucune course cette semaine.</p>}
      {!loading && !error && data && average !== null && (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.grid} />
              <XAxis dataKey="day" tickLine={false} tick={AXIS_TICK} />
              <YAxis domain={["dataMin - 10", "dataMax + 10"]} tickLine={false} tick={AXIS_TICK} width={30} />
              <Tooltip cursor={{ fill: COLORS.grid, opacity: 0.4 }} />
              <Bar dataKey="min" name="Min" fill={COLORS.redLight} radius={10} barSize={14} />
              <Bar dataKey="max" name="Max BPM" fill={COLORS.red} radius={10} barSize={14} />
              <Line
                dataKey="average"
                name="BPM moyen"
                type="monotone"
                stroke={COLORS.primaryLight}
                strokeWidth={3}
                dot={{ fill: COLORS.primary, r: 4 }}
                connectNulls
              />
            </ComposedChart>
          </ResponsiveContainer>
          <ChartLegend
            items={[
              { label: "Min", color: COLORS.redLight },
              { label: "Max BPM", color: COLORS.red },
              { label: "BPM moyen", color: COLORS.primary },
            ]}
          />
        </>
      )}
    </section>
  );
}
