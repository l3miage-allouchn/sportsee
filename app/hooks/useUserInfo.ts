import { useEffect, useState } from "react";
import { getUserInfo } from "~/services/userService";
import { formatUserInfo, type UserProfile } from "~/utils/formatters/userInfoFormatter";

export function useUserInfo() {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const rawData = await getUserInfo();
        setData(formatUserInfo(rawData));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { data, loading, error };
}
