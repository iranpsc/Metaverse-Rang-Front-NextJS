// utils/getAuthData.ts
import Cookies from "js-cookie";

export default function getAuthData(propName: string): string | null {
  const authCookie = Cookies.get("auth");
  if (!authCookie) return null;

  const parsed = new URLSearchParams(authCookie);
  return parsed.get(propName);
}
