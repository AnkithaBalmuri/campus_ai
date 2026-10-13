import { ObjectId } from "mongodb";
import { db } from "@/lib/db";
import type { Role } from "@/types";
export async function notifyRole(role: Role, notification: { title: string; body: string; href: string; complaintReference?: string }) { const database = await db(); const recipients = await database.collection("users").find({ role }, { projection: { _id: 1 } }).toArray(); if (recipients.length) await database.collection("notifications").insertMany(recipients.map((user) => ({ ...notification, userId: user._id.toString(), read: false, createdAt: new Date() }))); }
export async function notifyUser(userId: string, notification: { title: string; body: string; href: string }) { await (await db()).collection("notifications").insertOne({ ...notification, userId, read: false, createdAt: new Date() }); }
export const objectId = (value: string) => new ObjectId(value);
