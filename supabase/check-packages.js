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
  await client.connect();
  const { rows } = await client.query(
    "SELECT id, name, slug, price_display, features, popular FROM packages ORDER BY price_cents"
  );
  for (const p of rows) {
    console.log(`\n${p.name} — ${p.price_display} ${p.popular ? '(Popular)' : ''}`);
    // features is already jsonb - pg auto-parses it when using toJSON
    const feats = typeof p.features === 'string' ? JSON.parse(p.features) : p.features;
    (feats || []).forEach((f, i) => console.log(`  ${i+1}. ${f}`));
  }
  await client.end();
}
run().catch(e => console.error(e.message));