const { Client } = require("pg");
const fs = require("fs");
require("dotenv").config();

const ref = "baihkbjyghusbcmqbiyj";
const svcKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!svcKey) {
  console.error("SUPABASE_SERVICE_ROLE_KEY not found");
  process.exit(1);
}

const sql = fs.readFileSync("supabase/migration.sql", "utf8");
console.log("SQL length:", sql.length, "chars");

async function main() {
  // Try session pooler with service_role key as password
  const client = new Client({
    host: `aws-0-us-east-1.pooler.supabase.com`,
    port: 6543,
    database: "postgres",
    user: `postgres.${ref}`,
    password: svcKey,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("Connected to Supabase via pooler!");

    await client.query(sql);
    console.log("MIGRATION EXECUTED SUCCESSFULLY ✓");

    await client.end();
    console.log("Connection closed.");
  } catch (err) {
    console.error("Failed:", err.message);

    // Try direct connection as fallback
    try {
      const client2 = new Client({
        host: `db.${ref}.supabase.co`,
        port: 5432,
        database: "postgres",
        user: "postgres",
        password: svcKey,
        ssl: { rejectUnauthorized: false },
      });
      await client2.connect();
      console.log("Connected via direct DB!");
      await client2.query(sql);
      console.log("MIGRATION EXECUTED SUCCESSFULLY ✓");
      await client2.end();
    } catch (err2) {
      console.error("Direct connection also failed:", err2.message);
      process.exit(1);
    }
  }
}

main();