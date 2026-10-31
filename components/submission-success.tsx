"use client";

import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/language-provider";

const messages = { en: "Complaint submitted successfully. Administrators have been notified.", te: "ఫిర్యాదు విజయవంతంగా పంపబడింది. నిర్వాహకులకు సమాచారం అందింది.", hi: "शिकायत सफलतापूर्वक भेज दी गई है। प्रशासकों को सूचित कर दिया गया है।" };
export function SubmissionSuccess() { const { language } = useLanguage(); const searchParams = useSearchParams(); if (searchParams.get("submitted") !== "1") return null; return <p role="status" className="mb-5 flex items-center gap-2 rounded-xl bg-mint p-4 text-sm font-bold"><CheckCircle2 size={18} />{messages[language]}</p>; }
