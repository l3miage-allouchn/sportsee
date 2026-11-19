import HeartRateChart from "~/components/HeartRateChart";
import KmChart from "~/components/KmChart";
import ProfileHeader from "~/components/ProfileHeader";
import WeekSummary from "~/components/WeekSummary";
import { useUserInfo } from "~/hooks/useUserInfo";

export function meta() {
  return [{ title: "Dashboard - SportSee" }];
}

export default function Dashboard() {
  const { data, loading, error } = useUserInfo();

  if (loading) {
    return <main className="page container"><p className="status">Chargement...</p></main>;
  }
  if (error) {
    return <main className="page container"><p role="alert" className="status status--error">{error}</p></main>;
  }
  if (!data) {
    return null;
  }

  return (
    <main className="page container dashboard">
      <ProfileHeader profile={data} showDistance />

      <section className="dashboard__section">
        <h2 className="section-title">Vos dernières performances</h2>
        <div className="dashboard__charts">
          <KmChart />
          <HeartRateChart />
        </div>
      </section>

      <WeekSummary />
    </main>
  );
}
