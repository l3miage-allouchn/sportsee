import userInfoMock from "~/mocks/user-info.json";
import userActivityMock from "~/mocks/user-activity.json";
import { getToken, removeToken } from "~/utils/cookies";

const API_URL = import.meta.env.VITE_API_URL;
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export type UserInfoApi = {
  profile: {
    firstName: string;
    lastName: string;
    createdAt: string;
    age: number;
    weight: number;
    height: number;
    profilePicture: string;
  };
  statistics: {
    totalDistance: string;
    totalSessions: number;
    totalDuration: number;
  };
};

export type SessionApi = {
  date: string;
  distance: number;
  duration: number;
  heartRate: { min: number; max: number; average: number };
  caloriesBurned: number;
};

async function fetchWithToken<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  } catch {
    throw new Error("Impossible de contacter le serveur. Vérifiez qu'il est bien lancé.");
  }

  // Token absent (401), invalide ou expiré (403) : on déconnecte l'utilisateur
  if (response.status === 401 || response.status === 403) {
    removeToken();
    window.location.assign("/login");
    throw new Error("Votre session a expiré, veuillez vous reconnecter.");
  }

  if (!response.ok) {
    throw new Error(`Erreur ${response.status} lors du chargement des données`);
  }

  return response.json();
}

export async function getUserInfo(): Promise<UserInfoApi> {
  if (USE_MOCK) {
    return userInfoMock;
  }
  return fetchWithToken<UserInfoApi>("/api/user-info");
}

export async function getUserActivity(startWeek: string, endWeek: string): Promise<SessionApi[]> {
  if (USE_MOCK) {
    return userActivityMock.filter(
      (session) => session.date >= startWeek && session.date <= endWeek
    );
  }
  return fetchWithToken<SessionApi[]>(
    `/api/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`
  );
}
