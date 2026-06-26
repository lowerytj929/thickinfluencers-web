const { Client } = require("pg");
const fs = require("fs");
require("dotenv").config({ path: ".env.local" });

const ref = "baihkbjyghusbcmqbiyj";
const dbPassword = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!dbPassword) {
  console.error("No SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const sql = fs.readFileSync("supabase/migration.sql", "utf8");
console.log(`SQL length: ${sql.length} chars`);

async function tryConnect(host, port, user) {
  const client = new Client({
    host, port,
    database: "postgres",
    user,
    password: dbPassword,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000,
  });
  await client.connect();
  console.log(`Connected to ${host}:${port} as ${user}`);
  await client.query(sql);
  console.log("✓ MIGRATION SUCCESSFUL");
  const res = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`);
  console.log(`Tables (${res.rows.length}):`, res.rows.map(r => r.table_name).join(", "));
  await client.end();
}

async function main() {
  const attempts = [
    ["db." + ref + ".supabase.co", 5432, "postgres"],
    ["db." + ref + ".supabase.co", 5432, ref],
    ["db." + ref + ".supabase.co", 5432, "postgres." + ref],
  ];
  for (const [host, port, user] of attempts) {
    try {
      await tryConnect(host, port, user);
      return;
    } catch (e) {
      console.log("✗ " + host + ":" + port + " (" + user + ") — " + e.message.slice(0, 120));
    }
  }
  console.log("\nAll failed.");
}

main();