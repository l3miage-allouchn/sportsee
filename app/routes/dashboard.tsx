import ProfileHeader from "~/components/ProfileHeader";
import { useUserInfo } from "~/hooks/useUserInfo";

export function meta() {
  return [{ title: "Dashboard - SportSee" }];
}

export default function Dashboard() {
  const { data, loading, error } = useUserInfo();

  if (loading) {
    return <main><p>Chargement...</p></main>;
  }
  if (error) {
    return <main><p role="alert">{error}</p></main>;
  }
  if (!data) {
    return null;
  }

  return (
    <main>
      <ProfileHeader profile={data} />
    </main>
  );
}
