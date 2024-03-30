import { migrate } from "drizzle-orm/mysql2/migrator";
import { env } from "~/env";

import { db } from "~/server/db";
async function runMigrate() {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: "drizzle" });

  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
}

runMigrate().catch((error) => {
  console.error("❌ Migration failed");
  console.error(error);
  process.exit(1);
});
