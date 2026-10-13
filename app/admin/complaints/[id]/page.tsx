import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { AdminDetailControls } from "@/components/admin-detail-controls";
import { requireUser } from "@/lib/auth";
import { getComplaint } from "@/lib/complaints";
import { db } from "@/lib/db";
import type { AppUser } from "@/types";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const user = await requireUser("admin"); const id = (await params).id; const complaint = await getComplaint(id); if (!complaint) notFound(); const workers = await (await db()).collection<AppUser>("users").find({ role: "worker" }, { projection: { displayName: 1 } }).toArray(); return <AppShell role="admin" name={user.displayName}><p className="font-bold text-muted">{complaint.reference}</p><h1 className="mt-1 text-3xl font-black">{complaint.title}</h1><div className="card mt-6"><p className="whitespace-pre-wrap leading-7">{complaint.description}</p><dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3"><div><dt className="text-muted">Status</dt><dd className="font-bold">{complaint.status}</dd></div><div><dt className="text-muted">Severity</dt><dd className="font-bold">{complaint.severity}</dd></div><div><dt className="text-muted">Location</dt><dd>{complaint.location}</dd></div></dl></div><AdminDetailControls id={id} workers={workers.map((worker) => ({ id: worker._id!.toString(), displayName: worker.displayName }))} /></AppShell>; }
