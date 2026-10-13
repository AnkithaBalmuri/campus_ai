"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LocalizedValue, useLanguage } from "@/components/language-provider";

type Complaint = { _id: string; reference: string; title: string; status: string; severity: string; category: string };
export function AdminComplaints() {
  const { t } = useLanguage();
  const [items, setItems] = useState<Complaint[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/complaints")
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(t("loadError"))))
      .then(setItems)
      .catch((caught) => setError(caught.message));
  }, [t]);
  return <div className="card mt-6">{error ? <p className="text-red-700">{error}</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-muted"><tr><th className="pb-3">{t("reference")}</th><th className="pb-3">{t("complaint")}</th><th className="pb-3">{t("severity")}</th><th className="pb-3">{t("status")}</th></tr></thead><tbody>{items.map((item) => <tr key={item._id} className="border-t"><td className="py-4 font-bold"><Link className="underline" href={`/admin/complaints/${item._id}`}>{item.reference}</Link></td><td>{item.title}<br /><span className="text-muted"><LocalizedValue value={item.category} /></span></td><td><LocalizedValue value={item.severity} /></td><td><LocalizedValue value={item.status} /></td></tr>)}{!items.length && <tr><td className="py-8 text-muted" colSpan={4}>{t("noComplaintsYet")}</td></tr>}</tbody></table></div>}</div>;
}
