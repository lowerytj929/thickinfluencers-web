const { Client } = require("pg");
const fs = require("fs");
require("dotenv").config();

const ref = "baihkbjyghusbcmqbiyj";
const dbPassword = process.env.SUPABASE_DB_PASSWORD || process.argv[2];

if (!dbPassword) {
  console.error("Usage: node scripts/run-migration.js <db_password>");
  console.error("Or set SUPABASE_DB_PASSWORD in .env.local");
  process.exit(1);
}

const sql = fs.readFileSync("supabase/migration.sql", "utf8");
console.log(`SQL length: ${sql.length} chars`);

async function connectAndMigrate(host, port, user, password) {
  const client = new Client({
    host,
    port,
    database: "postgres",
    user,
    password,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
  await client.connect();
  console.log(`Connected to ${host}:${port} as ${user}`);
  await client.query(sql);
  console.log("✓ MIGRATION EXECUTED SUCCESSFULLY");
  const res = await client.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
  );
  console.log(`\nTables (${res.rows.length}):`);
  res.rows.forEach((r) => console.log(`  - ${r.table_name}`));
  await client.end();
}

async function main() {
  const attempts = [
    { host: `db.${ref}.supabase.co`, port: 5432, user: "postgres", password: dbPassword },
    { host: `db.${ref}.supabase.co`, port: 5432, user: `postgres.${ref}`, password: dbPassword },
    { host: `aws-0-us-east-1.pooler.supabase.com`, port: 6543, user: `postgres.${ref}`, password: dbPassword },
    { host: `aws-0-us-east-1.pooler.supabase.com`, port: 6543, user: "postgres", password: dbPassword },
    { host: `${ref}.supabase.co`, port: 5432, user: "postgres", password: dbPassword },
  ];

  for (const attempt of attempts) {
    try {
      await connectAndMigrate(attempt.host, attempt.port, attempt.user, attempt.password);
      return; // success
    } catch (err) {
      console.log(`✗ ${attempt.host}:${attempt.port} (${attempt.user}) — ${err.message.slice(0, 100)}`);
    }
  }

  console.log("\nAll connection attempts failed. The password might be wrong.");
}

main();