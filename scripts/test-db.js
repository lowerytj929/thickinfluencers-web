const { Client } = require("pg");
require("dotenv").config();

const ref = "baihkbjyghusbcmqbiyj";
const svcKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!svcKey) {
  console.error("No SUPABASE_SERVICE_ROLE_KEY found");
  process.exit(1);
}

async function tryConnect(host, port, user, password) {
  const c = new Client({
    host,
    port,
    database: "postgres",
    user,
    password,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await c.connect();
    console.log(`✓ Connected to ${host}:${port} as ${user}`);
    const res = await c.query("SELECT current_database(), version()");
    console.log("  DB:", res.rows[0].current_database);
    await c.end();
    return true;
  } catch (e) {
    console.log(`✗ ${host}:${port} as ${user} — ${e.message.slice(0, 100)}`);
    return false;
  }
}

async function main() {
  // Try different connection methods
  const methods = [
    { host: "aws-0-us-east-1.pooler.supabase.com", port: 6543, user: `postgres.${ref}`, password: svcKey },
    { host: `db.${ref}.supabase.co`, port: 5432, user: "postgres", password: svcKey },
    { host: `db.${ref}.supabase.co`, port: 5432, user: `postgres.${ref}`, password: svcKey },
    { host: `aws-0-us-east-1.pooler.supabase.com`, port: 6543, user: "postgres", password: svcKey },
  ];

  for (const m of methods) {
    const ok = await tryConnect(m.host, m.port, m.user, m.password);
    if (ok) return;
  }

  // Also try to get the connection string from pg_isready
  console.log("\nNone of the methods worked.");
  console.log("The service_role key may not be the DB password.");
  console.log("Try setting SUPABASE_DB_PASSWORD in .env.local");
}

main();