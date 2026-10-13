import { ComplaintForm } from "@/components/complaint-form";
import { AppShell } from "@/components/app-shell";
import { requireUser } from "@/lib/auth";
import { T } from "@/components/language-provider";
export default async function NewStudentComplaint() { const user = await requireUser("student"); return <AppShell role="student" name={user.displayName}><h1 className="text-3xl font-black"><T k="submitComplaint" /></h1><p className="mt-2 text-muted"><T k="reportIntro" /></p><div className="mt-7"><ComplaintForm role="student" /></div></AppShell>; }
