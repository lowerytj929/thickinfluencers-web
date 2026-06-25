const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !TELEGRAM_TOKEN) {
  console.error("Missing required env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, TELEGRAM_BOT_TOKEN");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const TG_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

async function sendMessage(chatId, text, parseMode = "Markdown") {
  try {
    await fetch(`${TG_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: parseMode }),
    });
  } catch (e) {
    console.error("sendMessage error:", e.message);
  }
}

async function handleStart(chatId, name) {
  const msg = `Welcome ${name} to ThickInfluencers Vault! 🏦

Your gateway to exclusive influencer content.

Commands:
/link <email> — Connect your Telegram to your vault account
/myaccess — Check your current memberships
/support — Get admin contact info

First time? Sign up at https://thickinfluencers.com and use /link to connect!`;
  await sendMessage(chatId, msg);
}

async function handleLink(chatId, text, username) {
  const email = text.replace("/link", "").trim();
  if (!email || !email.includes("@")) {
    await sendMessage(chatId, "Usage: /link your@email.com\n\nExample: /link user@gmail.com");
    return;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, telegram_chat_id")
    .eq("username", email)
    .single();

  if (error || !profile) {
    await sendMessage(chatId, `No account found with email "${email}". Sign up at https://thickinfluencers.com first.`);
    return;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ telegram_chat_id: chatId, telegram_username: username })
    .eq("id", profile.id);

  if (updateError) {
    await sendMessage(chatId, "Something went wrong. Try again later.");
    return;
  }

  await sendMessage(chatId, "✅ Telegram linked! Use /myaccess to see your memberships.");
}

async function handleMyAccess(chatId) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("telegram_chat_id", chatId)
    .single();

  if (!profile) {
    await sendMessage(chatId, "Account not linked. Use /link <email> to connect.");
    return;
  }

  const { data: memberships } = await supabase
    .from("memberships")
    .select("*, packages(name, telegram_link)")
    .eq("user_id", profile.id)
    .eq("is_active", true);

  if (!memberships || memberships.length === 0) {
    await sendMessage(chatId, "No active memberships. Browse at https://thickinfluencers.com");
    return;
  }

  let msg = `*Your Active Memberships* 🏦\n\n`;
  for (const m of memberships) {
    msg += `*${m.packages?.name || "Package"}*\n`;
    msg += `  Since: ${new Date(m.started_at).toLocaleDateString()}\n`;
    if (m.packages?.telegram_link) {
      msg += `  🔗 [Join Channel](${m.packages.telegram_link})\n`;
    }
    msg += "\n";
  }
  await sendMessage(chatId, msg);
}

// Webhook handler
app.post("/", async (req, res) => {
  try {
    const update = req.body;
    if (update.message?.text) {
      const { chat, from, text } = update.message;
      const chatId = chat.id;
      const name = from.first_name || "User";
      const username = from.username || name;

      if (text.startsWith("/start")) {
        await handleStart(chatId, name);
      } else if (text.startsWith("/link")) {
        await handleLink(chatId, text, username);
      } else if (text.startsWith("/myaccess")) {
        await handleMyAccess(chatId);
      } else if (text.startsWith("/support")) {
        await sendMessage(chatId, "Contact admin: @richballer1");
      }
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(200);
  }
});

// Health check
app.get("/", (req, res) => res.send("Bot is running"));

app.listen(PORT, () => {
  console.log(`Telegram bot running on port ${PORT}`);
  console.log(`Set webhook: https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook?url=https://YOUR-RAILWAY-URL/`);
});
