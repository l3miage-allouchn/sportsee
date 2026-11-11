const TOKEN_COOKIE = "sportsee_token";

export function setToken(token: string): void {
  const maxAge = 60 * 60 * 24; // 24 h, la même durée que le JWT
  document.cookie = `${TOKEN_COOKIE}=${token}; max-age=${maxAge}; path=/; SameSite=Strict`;
}

export function getToken(): string | null {
  const cookies = document.cookie.split("; ");
  const found = cookies.find((cookie) => cookie.startsWith(`${TOKEN_COOKIE}=`));

  if (!found) {
    return null;
  }
  return found.split("=")[1];
}

export function removeToken(): void {
  document.cookie = `${TOKEN_COOKIE}=; max-age=0; path=/`;
}
