import type { UserProfile } from "~/utils/formatters/userInfoFormatter";

type ProfileDetailsProps = {
  profile: UserProfile;
};

// Le genre de la maquette n'est pas affiché : l'API ne le renvoie pas.
export default function ProfileDetails({ profile }: ProfileDetailsProps) {
  return (
    <section>
      <h2>Votre profil</h2>
      <ul>
        <li>Âge : {profile.age}</li>
        <li>Taille : {profile.height}</li>
        <li>Poids : {profile.weight}kg</li>
      </ul>
    </section>
  );
}
