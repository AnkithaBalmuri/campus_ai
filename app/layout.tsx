import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
export const metadata: Metadata = { title: "CampusCare | Campus Complaint Portal", description: "Your campus. Your voice. A better tomorrow." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><LanguageProvider>{children}</LanguageProvider></body></html>; }
