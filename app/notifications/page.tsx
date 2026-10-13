import { AppShell } from "@/components/app-shell";
import { NotificationsList } from "@/components/notifications-list";
import { requireUser } from "@/lib/auth";
import { T } from "@/components/language-provider";
export default async function Page() { const user = await requireUser(); return <AppShell role={user.role} name={user.displayName}><h1 className="text-3xl font-black"><T k="notifications" /></h1><p className="mt-2 text-muted"><T k="notificationHelp" /></p><NotificationsList /></AppShell>; }
