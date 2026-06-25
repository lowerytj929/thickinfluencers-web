const fs = require("fs");
const path = require("path");

// Read bot token from .env.local
const envPath = path.join(__dirname, "..", ".env.local");
const env = fs.readFileSync(envPath, "utf8");

const token = env.match(/TELEGRAM_BOT_TOKEN=(.+)/)?.[1]?.trim();
if (!token) {
  console.error("TELEGRAM_BOT_TOKEN not found in .env.local");
  process.exit(1);
}

async function main() {
  // Test bot token
  const me = await fetch(`https://api.telegram.org/bot${token}/getMe`).then(r => r.json());
  console.log("Bot info:", JSON.stringify(me, null, 2));

  if (me.ok) {
    console.log(`\n✅ Bot @${me.result.username} is valid!`);
    
    // Set webhook (update URL when deployed)
    // const webhookUrl = "https://your-railway-url/api/telegram-webhook";
    // const wh = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`).then(r => r.json());
    // console.log("Webhook set:", wh);
  } else {
    console.log("❌ Bot token is invalid");
  }
}

main().catch(console.error);