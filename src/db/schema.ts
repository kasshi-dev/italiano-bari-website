import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, integer, boolean, timestamp, text, index, check } from "drizzle-orm/pg-core";

export const customers = pgTable("loyalty_customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 80 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  stamps: integer("stamps").notNull().default(0),
  lifetimeStamps: integer("lifetime_stamps").notNull().default(0),
  rewardsRedeemed: integer("rewards_redeemed").notNull().default(0),
  sideRedeemed: boolean("side_redeemed").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  check("loyalty_stamp_balance_check", sql`${table.stamps} >= 0 and ${table.stamps} <= 10`),
  check("loyalty_lifetime_check", sql`${table.lifetimeStamps} >= ${table.stamps}`),
  check("loyalty_reward_count_check", sql`${table.rewardsRedeemed} >= 0`),
  check("loyalty_side_balance_check", sql`not ${table.sideRedeemed} or ${table.stamps} >= 5`),
]).enableRLS();

export const activities = pgTable("loyalty_activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 20 }).notNull(),
  description: text("description").notNull(),
  stampDelta: integer("stamp_delta").notNull().default(0),
  balanceAfter: integer("balance_after").notNull().default(0),
  requestKey: uuid("request_key").unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [index("loyalty_activity_customer_idx").on(table.customerId, table.createdAt)]).enableRLS();

export const staffSettings = pgTable("loyalty_staff_settings", {
  id: varchar("id", { length: 20 }).primaryKey(),
  pinHash: text("pin_hash").notNull(),
  pinSalt: text("pin_salt").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();

export const sessions = pgTable("loyalty_sessions", {
  tokenHash: varchar("token_hash", { length: 64 }).primaryKey(),
  role: varchar("role", { length: 20 }).notNull(),
  customerId: uuid("customer_id").references(() => customers.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
}).enableRLS();

export const rateLimits = pgTable("loyalty_rate_limits", {
  key: varchar("key", { length: 100 }).primaryKey(),
  attempts: integer("attempts").notNull().default(1),
  windowStart: timestamp("window_start", { withTimezone: true }).notNull().defaultNow(),
}).enableRLS();
