import type { UserProfile } from "~/utils/formatters/userInfoFormatter";

type ProfileHeaderProps = {
  profile: UserProfile;
};

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <section>
      <img
        src={profile.profilePicture}
        alt={`Photo de ${profile.fullName}`}
        width={104}
        height={117}
      />
      <div>
        <h1>{profile.fullName}</h1>
        <p>Membre depuis le {profile.memberSince}</p>
      </div>
      <div>
        <p>Distance totale parcourue</p>
        <p>{profile.totalDistance} km</p>
      </div>
    </section>
  );
}
