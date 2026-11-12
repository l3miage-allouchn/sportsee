import ProfileDetails from "~/components/ProfileDetails";
import ProfileHeader from "~/components/ProfileHeader";
import ProfileStats from "~/components/ProfileStats";
import { useUserInfo } from "~/hooks/useUserInfo";

export function meta() {
  return [{ title: "Mon profil - SportSee" }];
}

export default function Profil() {
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
      <div>
        <ProfileHeader profile={data} />
        <ProfileDetails profile={data} />
      </div>
      <ProfileStats profile={data} />
    </main>
  );
}
