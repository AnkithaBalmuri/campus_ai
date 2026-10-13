import { Db, MongoClient } from "mongodb";
import { requireEnv } from "@/lib/env";
declare global { var __campuscareClient: Promise<MongoClient> | undefined; }
export async function db(): Promise<Db> { const uri = requireEnv("MONGODB_URI"); const client = global.__campuscareClient ?? new MongoClient(uri).connect(); global.__campuscareClient = client; return (await client).db(process.env.MONGODB_DB_NAME || "campuscare"); }
export async function ensureIndexes() { const database = await db(); await Promise.all([database.collection("users").createIndex({ username: 1 }, { unique: true }), database.collection("complaints").createIndex({ reference: 1 }, { unique: true }), database.collection("complaints").createIndex({ submittedBy: 1, createdAt: -1 }), database.collection("notifications").createIndex({ userId: 1, read: 1, createdAt: -1 })]); }
