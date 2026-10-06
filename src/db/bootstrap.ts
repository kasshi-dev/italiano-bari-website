import { pool } from "./index";

// Idempotent schema creation. The app creates its own tables on first use, so a fresh or reset
// database never leaves customers or staff facing errors. It mirrors src/db/schema.ts.
const SQL = `
select pg_advisory_xact_lock(727274);
create table if not exists loyalty_customers (
  id uuid primary key default gen_random_uuid(),
  name varchar(80) not null,
  phone varchar(20) not null unique,
  stamps integer not null default 0,
  lifetime_stamps integer not null default 0,
  rewards_redeemed integer not null default 0,
  side_redeemed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint loyalty_stamp_balance_check check (stamps >= 0 and stamps <= 10),
  constraint loyalty_lifetime_check check (lifetime_stamps >= stamps),
  constraint loyalty_reward_count_check check (rewards_redeemed >= 0),
  constraint loyalty_side_balance_check check (not side_redeemed or stamps >= 5)
);
create table if not exists loyalty_activities (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references loyalty_customers(id) on delete cascade,
  type varchar(20) not null,
  description text not null,
  stamp_delta integer not null default 0,
  balance_after integer not null default 0,
  request_key uuid unique,
  created_at timestamptz not null default now()
);
create index if not exists loyalty_activity_customer_idx on loyalty_activities (customer_id, created_at);
create table if not exists loyalty_staff_settings (
  id varchar(20) primary key,
  pin_hash text not null,
  pin_salt text not null,
  created_at timestamptz not null default now()
);
create table if not exists loyalty_sessions (
  token_hash varchar(64) primary key,
  role varchar(20) not null,
  customer_id uuid references loyalty_customers(id) on delete cascade,
  expires_at timestamptz not null
);
create table if not exists loyalty_rate_limits (
  key varchar(100) primary key,
  attempts integer not null default 1,
  window_start timestamptz not null default now()
);
alter table loyalty_customers enable row level security;
alter table loyalty_activities enable row level security;
alter table loyalty_staff_settings enable row level security;
alter table loyalty_sessions enable row level security;
alter table loyalty_rate_limits enable row level security;
`;

const globalForSchema = globalThis as typeof globalThis & { __bariSchemaReady?: Promise<void> };
export function ensureSchema() {
  if (!globalForSchema.__bariSchemaReady) {
    globalForSchema.__bariSchemaReady = (async () => {
      const client = await pool.connect();
      try {
        await client.query("begin");
        await client.query(SQL);
        await client.query("commit");
      } catch (error) {
        await client.query("rollback").catch(() => {});
        throw error;
      } finally {
        client.release();
      }
    })().catch((error) => { globalForSchema.__bariSchemaReady = undefined; throw error; });
  }
  return globalForSchema.__bariSchemaReady;
}
