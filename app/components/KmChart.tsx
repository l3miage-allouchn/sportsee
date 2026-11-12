import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useUserActivity } from "~/hooks/useUserActivity";
import { addDays, formatShortDate, getToday } from "~/utils/dates";
import { formatWeeklyDistances, getAverageDistance } from "~/utils/formatters/activityFormatter";

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
    <section>
      <div>
        {data && <h3>{getAverageDistance(data)}km en moyenne</h3>}
        <button type="button" onClick={showPreviousPeriod} aria-label="Période précédente">‹</button>
        <span>{formatShortDate(startDate)} - {formatShortDate(endDate)}</span>
        <button
          type="button"
          onClick={showNextPeriod}
          disabled={endDate >= today}
          aria-label="Période suivante"
        >›</button>
      </div>
      <p>Total des kilomètres 4 dernières semaines</p>

      {loading && <p>Chargement...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && data && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend position="bottom" iconType="circle" />
            <Bar dataKey="km" name="Km" fill="#B6BDFC" radius={10} barSize={14} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
