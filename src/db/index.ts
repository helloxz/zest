import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { dirname } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import * as schema from "./schema";

const dbFile = Bun.env.ZEST_DB_PATH || "./data/db/zest.db";
const dbDir = dirname(dbFile);

if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
}

const sqlite = new Database(dbFile, { create: true });
sqlite.run("PRAGMA journal_mode = WAL;");

export const db = drizzle(sqlite, { schema });
