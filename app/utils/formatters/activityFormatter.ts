import type { SessionApi } from "~/services/userService";
import { addDays, getToday } from "~/utils/dates";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

// Objectif de courses par semaine.
// Il n'est pas renvoyé par l'API (seulement présent dans data.json du backend) : valeur à confirmer.
const WEEKLY_GOAL = 2;

/* ---------- Graphique Km : total de km par semaine sur 4 semaines ---------- */

export type WeeklyDistance = {
  week: string;
  km: number;
};

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

/* ---------- Graphique BPM : fréquence cardiaque par jour, du lundi au dimanche ---------- */

export type DailyHeartRate = {
  day: string;
  min: number | null;
  max: number | null;
  average: number | null;
};

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export function formatDailyHeartRates(sessions: SessionApi[], startDate: string): DailyHeartRate[] {
  return DAY_LABELS.map((day, index) => {
    const date = addDays(startDate, index);
    const session = sessions.find((s) => s.date === date);

    return {
      day,
      min: session ? session.heartRate.min : null,
      max: session ? session.heartRate.max : null,
      average: session ? session.heartRate.average : null,
    };
  });
}

export function getAverageHeartRate(days: DailyHeartRate[]): number | null {
  let total = 0;
  let count = 0;

  for (const day of days) {
    if (day.average !== null) {
      total += day.average;
      count++;
    }
  }

  return count === 0 ? null : Math.round(total / count);
}

/* ---------- Cette semaine : nombre de courses, durée et distance ---------- */

export type WeekSummaryData = {
  sessionsCount: number;
  goal: number;
  remaining: number;
  totalDuration: number;
  totalDistance: number;
};

export function formatWeekSummary(sessions: SessionApi[]): WeekSummaryData {
  const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
  const totalDistance = sessions.reduce((sum, s) => sum + s.distance, 0);

  return {
    sessionsCount: sessions.length,
    goal: WEEKLY_GOAL,
    remaining: Math.max(WEEKLY_GOAL - sessions.length, 0),
    totalDuration,
    totalDistance: Math.round(totalDistance * 10) / 10,
  };
}

/* ---------- Page Profil : calories et jours de repos depuis l'inscription ---------- */

export type ActivityTotals = {
  totalCalories: number;
  restDays: number;
};

export function formatActivityTotals(sessions: SessionApi[], startDate: string): ActivityTotals {
  const totalCalories = sessions.reduce((sum, s) => sum + s.caloriesBurned, 0);

  const start = new Date(startDate).getTime();
  const today = new Date(getToday()).getTime();
  const daysSinceStart = Math.round((today - start) / ONE_DAY_IN_MS) + 1;
  const daysWithSession = new Set(sessions.map((s) => s.date)).size;

  return {
    totalCalories,
    restDays: daysSinceStart - daysWithSession,
  };
}
