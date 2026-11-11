import type { SessionApi } from "~/services/userService";

export type WeeklyDistance = {
  week: string;
  km: number;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export function formatWeeklyDistances(sessions: SessionApi[], startDate: string): WeeklyDistance[] {
  const weeks = [0, 0, 0, 0];
  const start = new Date(startDate).getTime();

  for (const session of sessions) {
    const daysSinceStart = (new Date(session.date).getTime() - start) / ONE_DAY_IN_MS;
    const weekIndex = Math.floor(daysSinceStart / 7);

    if (weekIndex >= 0 && weekIndex < 4) {
      weeks[weekIndex] += session.distance;
    }
  }

  return weeks.map((km, index) => ({
    week: `S${index + 1}`,
    km: Math.round(km * 10) / 10,
  }));
}

export function getAverageDistance(weeks: WeeklyDistance[]): number {
  const total = weeks.reduce((sum, week) => sum + week.km, 0);
  return Math.round(total / weeks.length);
}
