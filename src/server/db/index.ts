import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
  db: ReturnType<typeof drizzle> | undefined;
};

function getConnection() {
  // Skip database connection during build phase
  if (
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.VERCEL_ENV === "production" && !process.env.DATABASE_URL
  ) {
    // Return a minimal mock during build
    return null;
  }

  if (!globalForDb.conn && env.DATABASE_URL) {
    try {
      globalForDb.conn = postgres(env.DATABASE_URL, {
        max: 1,
        idle_timeout: 20,
        connect_timeout: 10,
      });
    } catch (error) {
      console.warn("Failed to create database connection:", error);
      return null;
    }
  }

  return globalForDb.conn;
}

function getDb() {
  if (!globalForDb.db) {
    const conn = getConnection();
    if (conn) {
      globalForDb.db = drizzle(conn, { schema });
    } else {
      // Return a minimal mock db during build
      globalForDb.db = {} as any;
    }
  }
  return globalForDb.db;
}

export const db = getDb();
