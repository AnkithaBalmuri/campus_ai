import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { addHistory } from "@/lib/complaints";
import { notifyUser } from "@/lib/notifications";
const schema = z.object({ status: z.enum(["Under Review", "Assigned", "In Progress", "Resolved", "Reopened"]), note: z.string().max(1000).optional() });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) { const user = await currentUser(); if (!user || user.role === "student") return NextResponse.json({ error: "Forbidden" }, { status: 403 }); try { const { status, note } = schema.parse(await request.json()); const id = (await params).id; const database = await db(); const filter = user.role === "admin" ? { _id: new ObjectId(id) } : { _id: new ObjectId(id), assignedWorkerId: user._id!.toString() }; const complaint = await database.collection("complaints").findOneAndUpdate(filter, { $set: { status, updatedAt: new Date(), resolutionNote: note || "" } }, { returnDocument: "after" }); if (!complaint) return NextResponse.json({ error: "Complaint not found or not assigned to you." }, { status: 404 }); await addHistory(id, status, user._id!.toString(), note); await notifyUser(complaint.submittedBy, { title: `Complaint ${complaint.reference}: ${status}`, body: note || complaint.title, href: `/student/complaints/${id}` }); await database.collection("auditEvents").insertOne({ action: "complaint_status_updated", complaintId: id, actorId: user._id!.toString(), status, note: note || "", createdAt: new Date() }); return NextResponse.json({ ok: true }); } catch { return NextResponse.json({ error: "A valid status is required." }, { status: 400 }); } }
