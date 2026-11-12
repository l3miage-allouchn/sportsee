import { useState } from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useUserActivity } from "~/hooks/useUserActivity";
import { addDays, formatShortDate, getMonday, getToday } from "~/utils/dates";
import { formatDailyHeartRates, getAverageHeartRate } from "~/utils/formatters/activityFormatter";

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
    <section>
      <div>
        <h3>{average !== null ? `${average} BPM` : "-- BPM"}</h3>
        <button type="button" onClick={showPreviousWeek} aria-label="Semaine précédente">‹</button>
        <span>{formatShortDate(startDate)} - {formatShortDate(endDate)}</span>
        <button
          type="button"
          onClick={showNextWeek}
          disabled={startDate >= currentMonday}
          aria-label="Semaine suivante"
        >›</button>
      </div>
      <p>Fréquence cardiaque moyenne</p>

      {loading && <p>Chargement...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && average === null && <p>Aucune course cette semaine.</p>}
      {!loading && !error && data && average !== null && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
            <Tooltip />
            <Legend position="bottom" iconType="circle" />
            <Bar dataKey="min" name="Min" fill="#FCC1B6" radius={10} barSize={14} />
            <Bar dataKey="max" name="Max BPM" fill="#F4320B" radius={10} barSize={14} />
            <Line
              dataKey="average"
              name="BPM moyen"
              type="monotone"
              stroke="#B6BDFC"
              strokeWidth={3}
              dot={{ fill: "#0B23F4", r: 4 }}
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
