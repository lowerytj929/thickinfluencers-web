const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Try multiple possible env var names
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const TELEGRAM_TOKEN_RAW = process.env.TELEGRAM_BOT_TOKEN || "";

console.log("=== Bot Starting ===");
console.log("PORT:", PORT);
console.log("SUPABASE_URL:", SUPABASE_URL ? "✓ set" : "✗ MISSING");
console.log("SUPABASE_KEY:", SUPABASE_KEY ? "✓ set" : "✗ MISSING");
console.log("SUPABASE_ANON:", SUPABASE_ANON ? "✓ set" : "✗ MISSING");
console.log("TELEGRAM_TOKEN:", TELEGRAM_TOKEN_RAW ? "✓ set" : "✗ MISSING");

let supabase = null;
let TG_API = null;

if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    const { createClient } = require("@supabase/supabase-js");
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    console.log("Supabase: ✓ initialized (service role)");
  } catch (e) {
    console.error("Supabase init error:", e.message);
    console.error("Supabase URL starts with:", SUPABASE_URL.substring(0, 25));
    console.error("Supabase KEY starts with:", SUPABASE_KEY.substring(0, 10));
  }
} else if (SUPABASE_URL && SUPABASE_ANON) {
  try {
    const { createClient } = require("@supabase/supabase-js");
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    console.log("Supabase: ✓ initialized (anon key)");
  } catch (e) {
    console.error("Supabase init error:", e.message);
  }
} else {
  console.log("Supabase: skipped (missing URL or key)");
}

if (TELEGRAM_TOKEN_RAW) {
  TG_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN_RAW}`;
  console.log("Telegram: ✓ configured");
}

async function sendMessage(chatId, text) {
  if (!TG_API) return;
  try {
    await fetch(`${TG_API}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    });
  } catch (e) { console.error("sendMessage:", e.message); }
}

async function handleStart(chatId, name) {
  const msg = `Welcome ${name} to ThickInfluencers Vault! 🏦\n\nCommands:\n/link <email> — Connect Telegram\n/myaccess — Check memberships\n/support — Contact admin\n\nFirst time? Sign up at https://thickinfluencers.com`;
  await sendMessage(chatId, msg);
}

async function handleLink(chatId, text, username) {
  if (!supabase) { await sendMessage(chatId, "Database not connected."); return; }
  const email = text.replace("/link", "").trim();
  if (!email || !email.includes("@")) { await sendMessage(chatId, "Usage: /link your@email.com"); return; }
  const { data: profile } = await supabase.from("profiles").select("id").eq("username", email).single();
  if (!profile) { await sendMessage(chatId, `No account for "${email}". Sign up first.`); return; }
  await supabase.from("profiles").update({ telegram_chat_id: chatId, telegram_username: username }).eq("id", profile.id);
  await sendMessage(chatId, "✅ Linked! Use /myaccess");
}

async function handleMyAccess(chatId) {
  if (!supabase) { await sendMessage(chatId, "DB not connected."); return; }
  const { data: p } = await supabase.from("profiles").select("id").eq("telegram_chat_id", chatId).single();
  if (!p) { await sendMessage(chatId, "Not linked. Use /link <email>"); return; }
  const { data: m } = await supabase.from("memberships").select("*, packages(name)").eq("user_id", p.id).eq("is_active", true);
  if (!m?.length) { await sendMessage(chatId, "No active memberships."); return; }
  let msg = "*Your Memberships* 🏦\n\n";
  for (const x of m) msg += `• ${x.packages?.name || "Package"}\n  since ${new Date(x.started_at).toLocaleDateString()}\n\n`;
  await sendMessage(chatId, msg);
}

app.post("/", async (req, res) => {
  try {
    const u = req.body;
    if (u.message?.text) {
      const { chat, from, text } = u.message;
      const cid = chat.id, name = from.first_name || "User", uname = from.username || name;
      if (text.startsWith("/start")) await handleStart(cid, name);
      else if (text.startsWith("/link")) await handleLink(cid, text, uname);
      else if (text.startsWith("/myaccess")) await handleMyAccess(cid);
      else if (text.startsWith("/support")) await sendMessage(cid, "Contact @richballer1");
    }
    res.sendStatus(200);
  } catch (e) { console.error("Webhook:", e); res.sendStatus(200); }
});

app.get("/", (req, res) => {
  res.json({
    status: "running",
    supabase: !!supabase,
    telegram: !!TG_API,
    env: {
      hasUrl: !!SUPABASE_URL,
      hasKey: !!SUPABASE_KEY,
      hasAnon: !!SUPABASE_ANON,
      hasToken: !!TELEGRAM_TOKEN_RAW,
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n✅ Listening on port ${PORT}`);
  console.log(`Webhook URL: https://thickinfluencers-web-production.up.railway.app/`);
});