import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { db } from "./db";

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded: any = verifyToken(token);
    return db.users.find(u => u.id === decoded.id) || null;
  } catch {
    return null;
  }
}