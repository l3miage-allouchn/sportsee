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
    return <main className="page container"><p className="status">Chargement...</p></main>;
  }
  if (error) {
    return <main className="page container"><p role="alert" className="status status--error">{error}</p></main>;
  }
  if (!data) {
    return null;
  }

  return (
    <main className="page container profile">
      <div className="profile__left">
        <ProfileHeader profile={data} />
        <ProfileDetails profile={data} />
      </div>
      <ProfileStats profile={data} />
    </main>
  );
}
