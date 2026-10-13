import { AppShell } from "@/components/app-shell";
import { AdminComplaints } from "@/components/admin-complaints";
import { requireUser } from "@/lib/auth";
import { T } from "@/components/language-provider";
export default async function Page() { const user = await requireUser("admin"); return <AppShell role="admin" name={user.displayName}><h1 className="text-3xl font-black"><T k="allComplaints" /></h1><p className="mt-2 text-muted"><T k="reviewResolve" /></p><AdminComplaints /></AppShell>; }
