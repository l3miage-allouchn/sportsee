import type { UserProfile } from "~/utils/formatters/userInfoFormatter";

type ProfileHeaderProps = {
  profile: UserProfile;
  showDistance?: boolean;
};

export default function ProfileHeader({ profile, showDistance = false }: ProfileHeaderProps) {
  return (
    <section className="profile-header card">
      <div className="profile-header__identity">
        <img
          src={profile.profilePicture}
          alt={`Photo de ${profile.fullName}`}
          width={104}
          height={117}
          className="profile-header__picture"
        />
        <div>
          <h1 className="profile-header__name">{profile.fullName}</h1>
          <p className="profile-header__since">Membre depuis le {profile.memberSince}</p>
        </div>
      </div>

      {showDistance && (
        <div className="profile-header__distance">
          <p>Distance totale parcourue</p>
          <p className="profile-header__badge">{profile.totalDistance} km</p>
        </div>
      )}
    </section>
  );
}
