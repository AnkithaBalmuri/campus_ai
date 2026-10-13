export const ROLES = ["student", "worker", "admin"] as const;
export type Role = (typeof ROLES)[number];
export const STATUSES = ["Submitted", "Under Review", "Assigned", "In Progress", "Resolved", "Reopened"] as const;
export type ComplaintStatus = (typeof STATUSES)[number];
export type Severity = "Low" | "Medium" | "High" | "Critical";
export type Language = "en" | "te" | "hi";
import type { ObjectId } from "mongodb";
export interface AppUser { _id?: ObjectId; username: string; passwordHash: string; role: Role; displayName: string; department?: string; language: Language; createdAt: Date; updatedAt: Date; }
export interface Complaint { _id?: ObjectId; reference: string; title: string; description: string; category: string; location: string; department?: string; severity: Severity; preferredLanguage: Language; submittedBy: string; submitterRole: "student" | "worker"; assignedWorkerId?: string; status: ComplaintStatus; attachments: { url: string; publicId?: string; name: string }[]; aiSummary?: string; createdAt: Date; updatedAt: Date; }
