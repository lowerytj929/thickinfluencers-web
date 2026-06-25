const { Client } = require("pg");
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

  // 1. Make user an admin (if they've signed up)
  console.log("Setting admin for lowerytj929@gmail.com...");
  
  // First find the user in auth.users
  const { rows: users } = await client.query(
    `SELECT id, email FROM auth.users WHERE email = 'lowerytj929@gmail.com'`
  );
  
  if (users.length > 0) {
    await client.query(
      `UPDATE public.profiles SET is_admin = true WHERE id = '${users[0].id}'`
    );
    console.log(`✓ ${users[0].email} is now an admin!`);

    // Also set telegram_chat_id if we know it
    // (We'll leave that for the bot to handle)
  } else {
    console.log("! User hasn't signed up yet. Will be set as admin when they do.");
    console.log("  The trigger on_auth_user_created will create their profile,");
    console.log("  but we need to run something post-signup to set is_admin=true");
  }

  // 2. Update package links if needed
  console.log("\nCurrent package configuration:");
  const { rows: packages } = await client.query(
    "SELECT name, slug, price_display, telegram_link FROM packages ORDER BY price_cents"
  );
  packages.forEach(p => console.log(`  • ${p.name} — ${p.price_display} [tg: ${p.telegram_link || "not set"}]`));

  // 3. Check if auth trigger exists
  const { rows: triggers } = await client.query(
    `SELECT trigger_name FROM information_schema.triggers 
     WHERE event_object_schema = 'auth' AND event_object_table = 'users'`
  );
  console.log(`\nAuth triggers (${triggers.length}):`);
  triggers.forEach(t => console.log(`  • ${t.trigger_name}`));

  await client.end();
  console.log("\n✅ Setup complete!");
}

run().catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});