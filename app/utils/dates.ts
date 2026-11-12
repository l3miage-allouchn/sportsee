export function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(isoDate: string, days: number): string {
  const date = new Date(isoDate);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function formatShortDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function formatNumericDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", { timeZone: "UTC" });
}

export function getMonday(isoDate: string): string {
  const dayOfWeek = new Date(isoDate).getUTCDay();
  const daysSinceMonday = (dayOfWeek + 6) % 7;
  return addDays(isoDate, -daysSinceMonday);
}
