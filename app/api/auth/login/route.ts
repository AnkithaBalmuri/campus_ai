import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession } from "@/lib/session";
import type { AppUser } from "@/types";
const schema = z.object({ username: z.string().trim().min(1), password: z.string().min(1), role: z.enum(["student", "worker", "admin"]) });
export async function POST(request: Request) { try { const input = schema.parse(await request.json()); const user = await (await db()).collection<AppUser>("users").findOne({ username: input.username }); if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 }); if (user.role !== input.role) return NextResponse.json({ error: `This account belongs to the ${user.role} portal.` }, { status: 403 }); await createSession({ userId: user._id!.toString(), username: user.username, role: user.role }); return NextResponse.json({ role: user.role }); } catch (error) { console.error("Login failed", error); return NextResponse.json({ error: "Sign in is unavailable. Check the database configuration." }, { status: 500 }); } }
