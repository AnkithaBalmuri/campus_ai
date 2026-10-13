"use client";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";

export function WorkerStatusUpdate({ id }: { id: string }) {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");
  async function submit(form: FormData) {
    const response = await fetch(`/api/complaints/${id}/status`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: form.get("status"), note: form.get("note") }) });
    const data = await response.json();
    setMessage(response.ok ? t("workSaved") : data.error);
    if (response.ok) location.reload();
  }
  return <form action={submit} className="card mt-6 max-w-xl space-y-3"><h2 className="font-black">{t("workUpdate")}</h2><select className="input" name="status"><option value="In Progress">{t("inProgress")}</option><option value="Resolved">{t("resolved")}</option><option value="Reopened">{t("reopened")}</option></select><textarea className="input" name="note" placeholder={t("workNote")} /><button className="btn-primary">{t("saveWork")}</button>{message && <p className="text-sm font-bold">{message}</p>}</form>;
}
