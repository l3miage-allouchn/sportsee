import type { UserInfoApi } from "~/services/userService";

export type UserProfile = {
  firstName: string;
  fullName: string;
  profilePicture: string;
  createdAt: string;
  memberSince: string;
  age: number;
  height: string;
  weight: number;
  totalDistance: number;
  totalSessions: number;
  totalDuration: { hours: number; minutes: number };
};

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatHeight(heightInCm: number): string {
  const meters = Math.floor(heightInCm / 100);
  const centimeters = String(heightInCm % 100).padStart(2, "0");
  return `${meters}m${centimeters}`;
}

export function formatUserInfo(data: UserInfoApi): UserProfile {
  const { profile, statistics } = data;

  return {
    firstName: profile.firstName,
    fullName: `${profile.firstName} ${profile.lastName}`,
    profilePicture: profile.profilePicture,
    createdAt: profile.createdAt,
    memberSince: formatDate(profile.createdAt),
    age: profile.age,
    height: formatHeight(profile.height),
    weight: profile.weight,
    totalDistance: Math.round(Number(statistics.totalDistance)),
    totalSessions: statistics.totalSessions,
    totalDuration: {
      hours: Math.floor(statistics.totalDuration / 60),
      minutes: statistics.totalDuration % 60,
    },
  };
}
