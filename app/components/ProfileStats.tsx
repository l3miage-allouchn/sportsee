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
      <h2 className="section-title">Vos statistiques</h2>
      <p className="section-subtitle">depuis le {profile.memberSince}</p>

      {loading && <p className="status">Chargement...</p>}
      {error && <p role="alert" className="status status--error">{error}</p>}

      <div className="profile-stats__grid">
        <StatCard
          label="Temps total couru"
          value={`${profile.totalDuration.hours}h`}
          unit={`${profile.totalDuration.minutes}min`}
          color="blue"
        />
        {data && <StatCard label="Calories brûlées" value={data.totalCalories} unit="cal" color="blue" />}
        <StatCard label="Distance totale parcourue" value={profile.totalDistance} unit="km" color="blue" />
        {data && <StatCard label="Nombre de jours de repos" value={data.restDays} unit="jours" color="blue" />}
        <StatCard label="Nombre de sessions" value={profile.totalSessions} unit="sessions" color="blue" />
      </div>
    </section>
  );
}
