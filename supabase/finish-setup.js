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

  // 1. Update the trigger to auto-set admin for the owner email
  console.log("Updating auto-admin trigger...");
  await client.query(`
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger AS $$
    BEGIN
      INSERT INTO public.profiles (id, username, is_admin)
      VALUES (
        new.id,
        new.email,
        CASE WHEN new.email = 'lowerytj929@gmail.com' THEN true ELSE false END
      );
      RETURN new;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `);
  console.log("✓ handle_new_user updated — lowerytj929@gmail.com will be auto-admin\n");

  // 2. Test Telegram bot and set webhook
  const env = require("fs").readFileSync(
    require("path").join(__dirname, "..", ".env.local"), "utf8"
  );
  const token = env.match(/TELEGRAM_BOT_TOKEN=(.+)/)?.[1]?.trim();

  if (token) {
    // Since we're local, just test the bot and note the webhook setup
    const me = await fetch(`https://api.telegram.org/bot${token}/getMe`).then(r => r.json());
    if (me.ok) {
      console.log(`✅ Bot @${me.result.username} is live`);
      console.log(`\n📋 To set webhook after Railway deploy, run:`);
      console.log(`  curl -X POST "https://api.telegram.org/bot${token}/setWebhook"`);
      console.log(`    -H "Content-Type: application/json"`);
      console.log(`    -d '{"url": "https://YOUR-RAILWAY-URL/api/telegram-webhook"}'`);
    } else {
      console.log("❌ Bot token invalid");
    }
  } else {
    console.log("! Bot token not found in .env.local");
  }

  // 3. Show the final state
  console.log("\nFinal verification:");
  const { rows: packages } = await client.query(
    "SELECT name, price_display FROM packages ORDER BY price_cents"
  );
  console.log(`Packages: ${packages.map(p => `${p.name} (${p.price_display})`).join(", ")}`);
  
  const { rows: triggers } = await client.query(
    `SELECT trigger_name, action_timing, event_manipulation 
     FROM information_schema.triggers 
     WHERE event_object_schema = 'public'`
  );
  console.log(`Triggers: ${triggers.map(t => t.trigger_name).join(", ")}`);

  await client.end();
  console.log("\n✅ All done!");
}

run().catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});