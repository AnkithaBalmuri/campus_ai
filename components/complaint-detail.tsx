import Image from "next/image";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { LocalizedValue, T } from "@/components/language-provider";
import { SubmissionSuccess } from "@/components/submission-success";
import { canSeeComplaint, requireUser } from "@/lib/auth";
import { getComplaint } from "@/lib/complaints";
import type { Role } from "@/types";
import { WorkerStatusUpdate } from "@/components/worker-status-update";

export async function ComplaintDetail({ id, role }: { id: string; role: Role }) {
  const user = await requireUser(role);
  const complaint = await getComplaint(id);
  if (!complaint || !canSeeComplaint(user.role, user.id, complaint)) notFound();
  const history = await (await import("@/lib/db")).db().then((database) => database.collection("complaintHistory").find({ complaintId: id }).sort({ createdAt: 1 }).toArray());
  return <AppShell role={role} name={user.displayName}>
    <SubmissionSuccess />
    <p className="text-sm font-bold text-muted">{complaint.reference}</p><h1 className="mt-1 text-3xl font-black">{complaint.title}</h1>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_.8fr]"><article className="card"><p className="whitespace-pre-wrap leading-7">{complaint.description}</p>{complaint.aiSummary && <p className="mt-5 rounded-xl bg-lavender p-4 text-sm"><b><T k="aiSummary" /></b> {complaint.aiSummary}</p>}<div className="mt-6 flex flex-wrap gap-3">{complaint.attachments.map((attachment) => <a key={attachment.url} href={attachment.url} target="_blank" rel="noreferrer"><Image width={150} height={100} className="h-24 w-36 rounded-xl object-cover" src={attachment.url} alt={attachment.name} /></a>)}</div></article><aside className="card"><h2 className="font-black"><T k="details" /></h2><dl className="mt-4 space-y-3 text-sm"><div><dt className="text-muted"><T k="status" /></dt><dd className="font-bold"><LocalizedValue value={complaint.status} /></dd></div><div><dt className="text-muted"><T k="severity" /></dt><dd className="font-bold"><LocalizedValue value={complaint.severity} /></dd></div><div><dt className="text-muted"><T k="category" /></dt><dd><LocalizedValue value={complaint.category} /></dd></div><div><dt className="text-muted"><T k="location" /></dt><dd>{complaint.location}</dd></div></dl><h2 className="mt-7 font-black"><T k="statusHistory" /></h2><ol className="mt-3 space-y-3 border-l-2 pl-4">{history.map((entry) => <li key={entry._id.toString()} className="text-sm"><b><LocalizedValue value={String(entry.status)} /></b><br /><span className="text-muted">{new Date(String(entry.createdAt)).toLocaleString()} {entry.note ? `· ${String(entry.note)}` : ""}</span></li>)}</ol></aside></div>
    {role === "worker" && <WorkerStatusUpdate id={id} />}
  </AppShell>;
}
