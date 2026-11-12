import StatCard from "~/components/StatCard";
import { useUserActivity } from "~/hooks/useUserActivity";
import { getToday } from "~/utils/dates";
import { formatActivityTotals } from "~/utils/formatters/activityFormatter";
import type { UserProfile } from "~/utils/formatters/userInfoFormatter";

type ProfileStatsProps = {
  profile: UserProfile;
};

export default function ProfileStats({ profile }: ProfileStatsProps) {
  const { data, loading, error } = useUserActivity(profile.createdAt, getToday(), formatActivityTotals);

  return (
    <section>
      <h2>Vos statistiques</h2>
      <p>depuis le {profile.memberSince}</p>

      {loading && <p>Chargement...</p>}
      {error && <p role="alert">{error}</p>}

      <div>
        <StatCard
          label="Temps total couru"
          value={`${profile.totalDuration.hours}h`}
          unit={`${profile.totalDuration.minutes}min`}
        />
        {data && <StatCard label="Calories brûlées" value={data.totalCalories} unit="cal" />}
        <StatCard label="Distance totale parcourue" value={profile.totalDistance} unit="km" />
        {data && <StatCard label="Nombre de jours de repos" value={data.restDays} unit="jours" />}
        <StatCard label="Nombre de sessions" value={profile.totalSessions} unit="sessions" />
      </div>
    </section>
  );
}
