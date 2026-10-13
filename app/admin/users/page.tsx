import { AppShell } from "@/components/app-shell";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import type { AppUser } from "@/types";
import { T } from "@/components/language-provider";
export default async function Page() { const admin = await requireUser("admin"); const users = await (await db()).collection<AppUser>("users").find({}, { projection: { passwordHash: 0 } }).sort({ createdAt: -1 }).limit(100).toArray(); return <AppShell role="admin" name={admin.displayName}><h1 className="text-3xl font-black"><T k="usersWorkers" /></h1><div className="card mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-muted"><tr><th className="pb-3"><T k="name" /></th><th className="pb-3"><T k="username" /></th><th className="pb-3"><T k="role" /></th></tr></thead><tbody>{users.map((user) => <tr className="border-t" key={user._id!.toString()}><td className="py-3">{user.displayName}</td><td>{user.username}</td><td className="capitalize"><T k={user.role === "admin" ? "admin" : user.role} /></td></tr>)}</tbody></table></div></AppShell>; }
