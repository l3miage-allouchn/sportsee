const API_URL = import.meta.env.VITE_API_URL;
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

type LoginResponse = {
  token: string;
  userId: string;
};

export async function loginRequest(username: string, password: string): Promise<string> {
  if (USE_MOCK) {
    return "mock-token";
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  } catch {
    throw new Error("Impossible de contacter le serveur. Vérifiez qu'il est bien lancé.");
  }

  if (!response.ok) {
    throw new Error("Identifiant ou mot de passe incorrect");
  }

  const data: LoginResponse = await response.json();
  return data.token;
}
