import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import type { AppUser, Role } from "@/types";
export async function currentUser() { const session = await getSession(); if (!session) return null; const user = await (await db()).collection<AppUser>("users").findOne({ _id: new ObjectId(session.userId) }); return user ? { ...user, id: user._id!.toString() } : null; }
export async function requireUser(role?: Role) { const user = await currentUser(); if (!user) redirect("/"); if (role && user.role !== role) redirect(`/${user.role}/dashboard`); return user; }
export function canSeeComplaint(role: Role, userId: string, complaint: { submittedBy: string; assignedWorkerId?: string }) { return role === "admin" || complaint.submittedBy === userId || (role === "worker" && complaint.assignedWorkerId === userId); }
