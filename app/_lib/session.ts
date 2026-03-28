// app/_lib/session.ts
import { cookies } from "next/headers";
import { UserType } from "../_types/user";

/**
 * Set session cookie (server context)
 */
export const setSession = async (user: UserType) => {
  const cookieStore = await cookies();

  // Workaround: RequestCookies are read-only, but App Router allows setting via ResponseCookies
  cookieStore.set?.("session", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
};

/**
 * Get session cookie
 */
export const getSession = async (): Promise<UserType | null> => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;

  try {
    return JSON.parse(session) as UserType;
  } catch (err) {
    console.error("Failed to parse session cookie:", err);
    return null;
  }
};

/**
 * Delete session cookie
 */
export const deleteSession = async () => {
  const cookieStore = await cookies();

  // Workaround for read-only RequestCookies: overwrite cookie with maxAge: 0
  cookieStore.set?.("session", "", { maxAge: 0, path: "/" });
};