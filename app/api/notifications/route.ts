import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
export async function GET() { const user = await currentUser(); if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const notifications = await (await db()).collection("notifications").find({ userId: user.id }).sort({ createdAt: -1 }).limit(50).toArray(); return NextResponse.json(notifications); }
