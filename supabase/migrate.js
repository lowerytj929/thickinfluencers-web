const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const client = new Client({
  host: "db.baihkbjyghusbcmqbiyj.supabase.co",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "12428929Tl1",
  ssl: { rejectUnauthorized: false },
});

async function run() {
  console.log("Connecting...");
  await client.connect();
  console.log("Connected!\n");

  const sql = fs.readFileSync(path.join(__dirname, "migration.sql"), "utf8");
  
  console.log(`Running migration (${sql.length} chars)...`);
  try {
    await client.query(sql);
    console.log("✓ Migration executed!");
  } catch (err) {
    console.log(`✗ ${err.message.substring(0, 200)}`);
  }

  // Verify
  console.log("\nVerifying...");
  try {
    const { rows: packages } = await client.query(
      "SELECT name, price_display FROM packages ORDER BY price_cents"
    );
    console.log(`\n✅ Packages (${packages.length}):`);
    packages.forEach(p => console.log(`  • ${p.name} — ${p.price_display}`));
  } catch (e) {
    console.log("Could not query packages:", e.message);
  }

  try {
    const { rows: tables } = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    console.log(`\nTables:`);
    tables.forEach(t => console.log(`  • ${t.table_name}`));
    
    const { rows: policies } = await client.query(`
      SELECT schemaname, tablename, policyname 
      FROM pg_policies 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);
    if (policies.length > 0) {
      console.log(`\nRLS Policies (${policies.length}):`);
      policies.forEach(p => console.log(`  • ${p.tablename}: ${p.policyname}`));
    }
  } catch (e) {
    console.log("Could not list tables:", e.message);
  }

  await client.end();
  console.log("\n✅ Migration complete!");
}

run().catch(err => {
  console.error("❌ Fatal:", err.message);
  process.exit(1);
});