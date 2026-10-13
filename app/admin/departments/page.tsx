import { AppShell } from "@/components/app-shell";
import { requireUser } from "@/lib/auth";
import { T } from "@/components/language-provider";
const departments = ["Maintenance", "Academic Affairs", "Student Welfare", "IT Services", "Security"];
export default async function Page() { const user = await requireUser("admin"); return <AppShell role="admin" name={user.displayName}><h1 className="text-3xl font-black"><T k="departments" /></h1><div className="card mt-6"><p className="text-muted"><T k="departmentHelp" /></p><ul className="mt-4 divide-y">{departments.map((department) => <li key={department} className="py-3 font-bold">{department}</li>)}</ul></div></AppShell>; }
