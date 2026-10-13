import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
export async function PATCH(_: Request, { params }: { params: Promise<{ id: string }> }) { const user = await currentUser(); const id = (await params).id; if (!user || !ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid request" }, { status: 400 }); await (await db()).collection("notifications").updateOne({ _id: new ObjectId(id), userId: user.id }, { $set: { read: true } }); return NextResponse.json({ ok: true }); }
