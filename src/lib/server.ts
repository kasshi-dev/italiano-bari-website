import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { and, eq, gt, sql } from "drizzle-orm";
import { db } from "@/db";
import { sessions, rateLimits } from "@/db/schema";
import { ensureSchema } from "@/db/bootstrap";

export class ApiError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
export function errorResponse(error: unknown) {
  if (error instanceof ApiError) return Response.json({ error: error.message }, { status: error.status });
  console.error("Loyalty request failed", error);
  return Response.json({ error: "We couldn’t complete that request. Please try again in a moment." }, { status: 500 });
}
export function normalizePhone(value: unknown) {
  if (typeof value !== "string") throw new ApiError("Please enter a valid mobile number.");
  const ascii = value.replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 1632)).replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 1776));
  let digits = ascii.replace(/[^0-9]/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (/^05\d{8}$/.test(digits)) digits = `966${digits.slice(1)}`;
  else if (/^5\d{8}$/.test(digits)) digits = `966${digits}`;
  if (!/^[1-9]\d{7,14}$/.test(digits)) throw new ApiError("Enter a valid mobile number, for example 050 123 4567.");
  if (digits.startsWith("966") && !/^9665\d{8}$/.test(digits)) throw new ApiError("Saudi mobile numbers should have 9 digits after +966 and start with 5.");
  return `+${digits}`;
}
export function validName(value: unknown) {
  if (typeof value !== "string" || value.trim().length < 2 || value.trim().length > 80) throw new ApiError("Please enter a name between 2 and 80 characters.");
  return value.trim();
}
const digest = (token: string) => createHash("sha256").update(token).digest("hex");
const cookieName = (role: "customer" | "staff") => `bari_${role}`;
export async function createSession(role: "customer" | "staff", customerId?: string) {
  await ensureSchema();
  const token = randomBytes(32).toString("hex");
  const maxAge = role === "staff" ? 8 * 60 * 60 : 30 * 24 * 60 * 60;
  await db.insert(sessions).values({ tokenHash: digest(token), role, customerId, expiresAt: new Date(Date.now() + maxAge * 1000) });
  (await cookies()).set(cookieName(role), token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge });
}
export async function getSession(role: "customer" | "staff") {
  await ensureSchema();
  const token = (await cookies()).get(cookieName(role))?.value;
  if (!token || token.length !== 64) return null;
  const [session] = await db.select().from(sessions).where(and(eq(sessions.tokenHash, digest(token)), eq(sessions.role, role), gt(sessions.expiresAt, new Date()))).limit(1);
  return session ?? null;
}
export async function deleteSession(role: "customer" | "staff") {
  await ensureSchema();
  const store = await cookies();
  const token = store.get(cookieName(role))?.value;
  if (token) await db.delete(sessions).where(eq(sessions.tokenHash, digest(token)));
  store.delete(cookieName(role));
}
export async function limitAttempts(request: Request, kind: string, maximum = 12) {
  await ensureSchema();
  const ip = (request.headers.get("x-forwarded-for")?.split(",")[0] || "local").trim();
  const key = `${kind}:${digest(ip).slice(0, 40)}`;
  const cutoff = new Date(Date.now() - 15 * 60 * 1000);
  const [rate] = await db.insert(rateLimits).values({ key }).onConflictDoUpdate({ target: rateLimits.key, set: {
    attempts: sql`case when ${rateLimits.windowStart} < ${cutoff.toISOString()}::timestamptz then 1 else ${rateLimits.attempts} + 1 end`,
    windowStart: sql`case when ${rateLimits.windowStart} < ${cutoff.toISOString()}::timestamptz then now() else ${rateLimits.windowStart} end`,
  } }).returning();
  if (rate.attempts > maximum) throw new ApiError("Too many attempts. Please try again in 15 minutes.", 429);
}
export function checkOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const expectedHost = request.headers.get("x-forwarded-host") || request.headers.get("host") || new URL(request.url).host;
  if (origin && new URL(origin).host !== expectedHost) throw new ApiError("This request is not allowed.", 403);
}
