import { notFound } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import type { Role } from "@/types";
export default async function AuthPage({ params }: { params: Promise<{ role: string; mode: string }> }) { const { role, mode } = await params; if (!["student", "worker", "admin"].includes(role) || !["login", "register"].includes(mode)) notFound(); return <AuthForm role={role as Role} mode={mode as "login" | "register"} />; }
