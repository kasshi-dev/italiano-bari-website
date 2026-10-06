import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// The connection is created lazily, on the first real query. That lets the site build without a database
// and gives a clear message if DATABASE_URL was forgotten in the hosting settings.
// Hosted databases such as Supabase need SSL: set DATABASE_SSL=true and leave "sslmode" out of the URL.
const globalForDb = globalThis as typeof globalThis & { __bariPool?: Pool; __bariDb?: NodePgDatabase };

function getPool(): Pool {
  if (globalForDb.__bariPool) return globalForDb.__bariPool;
  const rawUrl = process.env.DATABASE_URL;
  if (!rawUrl) throw new Error("DATABASE_URL is not set. Add it in your hosting environment variables, then redeploy.");
  const useSsl = process.env.DATABASE_SSL === "true";
  let connectionString = rawUrl;
  if (useSsl) {
    try { const url = new URL(rawUrl); url.searchParams.delete("sslmode"); url.searchParams.delete("uselibpqcompat"); connectionString = url.toString(); } catch { /* use the URL as given */ }
  }
  globalForDb.__bariPool = new Pool({ connectionString, max: Number(process.env.DATABASE_POOL_MAX || 5), ssl: useSsl ? { rejectUnauthorized: false } : undefined });
  return globalForDb.__bariPool;
}
function getDb(): NodePgDatabase { return (globalForDb.__bariDb ??= drizzle(getPool())); }
function lazy<T extends object>(resolve: () => T): T {
  return new Proxy({} as T, { get(_target, prop) { const instance = resolve(); const value = Reflect.get(instance, prop, instance); return typeof value === "function" ? value.bind(instance) : value; } });
}
export const pool = lazy<Pool>(getPool);
export const db = lazy<NodePgDatabase>(getDb);
