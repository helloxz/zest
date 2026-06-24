import { drizzle } from "drizzle-orm/libsql";
import { dirname } from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import * as schema from "./schema";

const dbFile = Bun.env.ZEST_DB_PATH || "./data/db/zest.db";
const dbDir = dirname(dbFile);

if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
}

export const db = drizzle({
    connection: {
        url: `file:${dbFile}`,
    },
    schema,
});
