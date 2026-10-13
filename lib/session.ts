import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { requireEnv } from "@/lib/env";
import type { Role } from "@/types";
const COOKIE = "campuscare_session";
const secret = () => new TextEncoder().encode(requireEnv("SESSION_SECRET"));
export type Session = { userId: string; role: Role; username: string };
export async function createSession(session: Session) { const token = await new SignJWT(session).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret()); const jar = await cookies(); jar.set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 }); }
export async function getSession(): Promise<Session | null> { try { const token = (await cookies()).get(COOKIE)?.value; if (!token) return null; const { payload } = await jwtVerify(token, secret()); if (typeof payload.userId !== "string" || typeof payload.username !== "string" || !["student", "worker", "admin"].includes(String(payload.role))) return null; return { userId: payload.userId, username: payload.username, role: payload.role as Role }; } catch { return null; } }
export async function clearSession() { (await cookies()).set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 }); }
