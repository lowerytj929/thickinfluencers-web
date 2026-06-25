const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// Log env var status (don't crash)
console.log("=== Bot Starting ===");
console.log("PORT:", PORT);
console.log("SUPABASE_URL:", SUPABASE_URL ? "✓ set" : "✗ MISSING");
console.log("SERVICE_KEY:", SUPABASE_SERVICE_KEY ? "✓ set" : "✗ MISSING");
console.log("TELEGRAM_TOKEN:", TELEGRAM_TOKEN ? "✓ set" : "✗ MISSING");

let supabase = null;
let TG_API = null;

if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
  try {
    const { createClient } = require("@supabase/supabase-js");
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    console.log("Supabase client: ✓ initialized");
  } catch (e) {
    console.error("Supabase init error:", e.message);
  }
}

if (TELEGRAM_TOKEN) {
  TG_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
  console.log("Telegram API: ✓ configured");
}

async function sendMessage(chatId, text) {
  if (!TG_API) return;
  try {
    await fetch(`${TG_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    });
  } catch (e) {
    console.error("sendMessage error:", e.message);
  }
}

async function handleStart(chatId, name) {
  const msg = `Welcome ${name} to ThickInfluencers Vault! 🏦\n\nCommands:\n/link <email> — Connect your Telegram\n/myaccess — Check memberships\n/support — Contact admin\n\nFirst time? Sign up at https://thickinfluencers.com`;
  await sendMessage(chatId, msg);
}

async function handleLink(chatId, text, username) {
  if (!supabase) {
    await sendMessage(chatId, "Database not connected. Try again later.");
    return;
  }
  const email = text.replace("/link", "").trim();
  if (!email || !email.includes("@")) {
    await sendMessage(chatId, "Usage: /link your@email.com");
    return;
  }
  const { data: profile } = await supabase
    .from("profiles").select("id").eq("username", email).single();
  if (!profile) {
    await sendMessage(chatId, `No account found for "${email}". Sign up first.`);
    return;
  }
  await supabase.from("profiles").update({ telegram_chat_id: chatId, telegram_username: username }).eq("id", profile.id);
  await sendMessage(chatId, "✅ Telegram linked! Use /myaccess to check memberships.");
}

async function handleMyAccess(chatId) {
  if (!supabase) {
    await sendMessage(chatId, "Database not connected.");
    return;
  }
  const { data: profile } = await supabase.from("profiles").select("id").eq("telegram_chat_id", chatId).single();
  if (!profile) {
    await sendMessage(chatId, "Not linked. Use /link <email>");
    return;
  }
  const { data: memberships } = await supabase.from("memberships").select("*, packages(name)").eq("user_id", profile.id).eq("is_active", true);
  if (!memberships?.length) {
    await sendMessage(chatId, "No active memberships. Visit https://thickinfluencers.com");
    return;
  }
  let msg = "*Your Memberships* 🏦\n\n";
  for (const m of memberships) {
    msg += `• ${m.packages?.name || "Package"}\n  since ${new Date(m.started_at).toLocaleDateString()}\n\n`;
  }
  await sendMessage(chatId, msg);
}

// Webhook
app.post("/", async (req, res) => {
  try {
    const update = req.body;
    if (update.message?.text) {
      const { chat, from, text } = update.message;
      const chatId = chat.id;
      const name = from.first_name || "User";
      const username = from.username || name;

      if (text.startsWith("/start")) await handleStart(chatId, name);
      else if (text.startsWith("/link")) await handleLink(chatId, text, username);
      else if (text.startsWith("/myaccess")) await handleMyAccess(chatId);
      else if (text.startsWith("/support")) await sendMessage(chatId, "Contact admin: @richballer1");
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(200);
  }
});

// Health check
app.get("/", (req, res) => {
  const status = {
    status: "running",
    supabase: !!supabase,
    telegram: !!TG_API,
    port: PORT,
  };
  res.json(status);
});

app.listen(PORT, () => {
  console.log(`\n✅ Bot listening on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/`);
});