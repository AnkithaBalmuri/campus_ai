import test from "node:test";
import assert from "node:assert/strict";
import { complaintReference } from "../lib/reference";
import { canSeeComplaint } from "../lib/auth";
test("complaint references include the CampusCare prefix", () => { assert.match(complaintReference(new Date("2026-10-13T00:00:00Z"), () => 0.1), /^CC-2026-\d{6}-190$/); });
test("role authorization prevents cross-user access", () => { const complaint = { submittedBy: "student-1", assignedWorkerId: "worker-1" }; assert.equal(canSeeComplaint("student", "student-1", complaint), true); assert.equal(canSeeComplaint("student", "student-2", complaint), false); assert.equal(canSeeComplaint("worker", "worker-1", complaint), true); assert.equal(canSeeComplaint("worker", "worker-2", complaint), false); assert.equal(canSeeComplaint("admin", "admin-1", complaint), true); });
