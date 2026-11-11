import { useEffect, useState } from "react";
import { getUserActivity, type SessionApi } from "~/services/userService";

type Formatter<T> = (sessions: SessionApi[], startDate: string) => T;

export function useUserActivity<T>(startDate: string, endDate: string, format: Formatter<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const sessions = await getUserActivity(startDate, endDate);
        if (!ignore) setData(format(sessions, startDate));
      } catch (err) {
        if (!ignore) setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [startDate, endDate, format]);

  return { data, loading, error };
}
