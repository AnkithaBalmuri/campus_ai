import { ObjectId } from "mongodb";
import { db } from "@/lib/db";
import type { Complaint, ComplaintStatus } from "@/types";
export async function complaintCounts(filter: Record<string, unknown> = {}) { const rows = await (await db()).collection<Complaint>("complaints").aggregate([{ $match: filter }, { $group: { _id: "$status", count: { $sum: 1 } } }]).toArray(); const counts: Record<string, number> = { total: rows.reduce((sum, row) => sum + row.count, 0) }; rows.forEach((row) => { counts[String(row._id)] = row.count; }); return counts; }
export async function getComplaint(id: string) { if (!ObjectId.isValid(id)) return null; return (await db()).collection<Complaint>("complaints").findOne({ _id: new ObjectId(id) }); }
export async function addHistory(complaintId: string, status: ComplaintStatus, actorId: string, note?: string) { await (await db()).collection("complaintHistory").insertOne({ complaintId, status, actorId, note: note || "", createdAt: new Date() }); }
