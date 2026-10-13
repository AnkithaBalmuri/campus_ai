"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, languages, type TranslationKey } from "@/lib/i18n";
import type { Language } from "@/types";

type Values = Record<string, string | number>;
type Translator = (key: TranslationKey, values?: Values) => string;
const Context = createContext<{ language: Language; setLanguage: (value: Language) => void; t: Translator }>({ language: "en", setLanguage: () => {}, t: (key) => key });
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  useEffect(() => { const saved = localStorage.getItem("campuscare-language") as Language | null; if (saved && languages[saved]) setLanguageState(saved); }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const value = useMemo(() => ({ language, setLanguage: (next: Language) => { setLanguageState(next); localStorage.setItem("campuscare-language", next); }, t: (key: TranslationKey, values?: Values) => Object.entries(values || {}).reduce((copy, [name, item]) => copy.replaceAll(`{${name}}`, String(item)), dictionaries[language][key]) }), [language]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useLanguage() { return useContext(Context); }
export function T({ k, values }: { k: TranslationKey; values?: Values }) { const { t } = useLanguage(); return <>{t(k, values)}</>; }
export function LocalizedValue({ value }: { value: string }) { const { t } = useLanguage(); const map: Record<string, TranslationKey> = { "Academic": "academics", "Behavioral": "behavioral", "Infrastructure": "infrastructure", "Maintenance": "maintenance", "Safety": "safety", "Other": "other", "Low": "low", "Medium": "medium", "High": "high", "Critical": "critical", "Submitted": "submitted", "Under Review": "underReview", "Assigned": "assigned", "In Progress": "inProgress", "Resolved": "resolved", "Reopened": "reopened" }; return <>{map[value] ? t(map[value]) : value}</>; }
export function LanguageSelect() { const { language, setLanguage, t } = useLanguage(); return <select aria-label={t("language")} value={language} onChange={(event) => setLanguage(event.target.value as Language)} className="input h-10 py-1 text-sm">{Object.entries(languages).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>; }
