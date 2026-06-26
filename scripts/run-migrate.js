
const { Client } = require("pg");
const fs = require("fs");
require("dotenv").config();

const ref = "baihkbjyghusbcmqbiyj";
const pwd = "12428929Tl1";
const sql = fs.readFileSync("supabase/migration.sql", "utf8");

async function go(host, port, user, label) {
  const c = new Client({
    host, port,
    database: "postgres",
    user,
    password: pwd,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
  await c.connect();
  console.log("✓ " + label);
  await c.query(sql);
  console.log("  Migration OK!");
  const r = await c.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");
  console.log("  Tables:", r.rows.map(x => x.table_name).join(", "));
  await c.end();
}

async function main() {
  const tests = [
    { host: "db." + ref + ".supabase.co", port: 5432, user: "postgres", label: "Direct postgres" },
    { host: "aws-0-us-east-1.pooler.supabase.com", port: 6543, user: "postgres." + ref, label: "Pooler postgres."+ref },
  ];
  for (const t of tests) {
    try {
      await go(t.host, t.port, t.user, t.label);
      return;
    } catch(e) {
      console.log("✗ " + t.label + " — " + e.message.slice(0, 120));
    }
  }
  console.log("\nAll connection methods failed.");
}

main();
