const { Client } = require("pg");

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

  // Remove old packages
  console.log("Removing old packages...");
  await client.query("DELETE FROM packages");
  console.log("✓ Old packages removed\n");

  // Insert new tiers
  console.log("Inserting tier 1 ($15) and tier 2 ($25)...");
  await client.query(`
    INSERT INTO packages (name, slug, price_cents, price_display, features, popular)
    VALUES 
      (
        'Vault Access', 'vault-access', 1500, '$15',
        '[
          "Full vault access",
          "Daily content updates",
          "Private Telegram community",
          "New drops notifications"
        ]'::jsonb,
        false
      ),
      (
        'Vault Pro', 'vault-pro', 2500, '$25',
        '[
          "Everything in Vault Access",
          "Content request priority",
          "Premium archives access",
          "Exclusive weekly drops",
          "Direct admin access",
          "Early access to new content"
        ]'::jsonb,
        true
      );
  `);
  console.log("✓ New packages inserted!\n");

  // Verify
  const { rows: packages } = await client.query(
    "SELECT id, name, slug, price_display, features FROM packages ORDER BY price_cents"
  );
  
  console.log("Current packages:");
  for (const p of packages) {
    const features = JSON.parse(p.features);
    console.log(`\n  ${p.name} — ${p.price_display}`);
    features.forEach((f, i) => console.log(`    ${i + 1}. ${f}`));
  }

  await client.end();
  console.log("\n✅ Done!");
}

run().catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});