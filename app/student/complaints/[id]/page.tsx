import { ComplaintDetail } from "@/components/complaint-detail";
export default async function Page({ params }: { params: Promise<{ id: string }> }) { return <ComplaintDetail id={(await params).id} role="student" />; }
