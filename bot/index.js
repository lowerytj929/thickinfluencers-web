const express = require("express");
const app = express();
app.use(express.json());

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const TELEGRAM_TOKEN_RAW = process.env.TELEGRAM_BOT_TOKEN || "";

const PORT = process.env.PORT || 8080;

console.log("=== Bot Starting ===");
console.log("PORT:", PORT);
console.log("SUPABASE_URL:", SUPABASE_URL ? "✓ set" : "✗ MISSING");
console.log("SUPABASE_KEY:", SUPABASE_KEY ? "✓ set" : "✗ MISSING");
console.log("SUPABASE_ANON:", SUPABASE_ANON ? "✓ set" : "✗ MISSING");
console.log("TELEGRAM_TOKEN:", TELEGRAM_TOKEN_RAW ? "✓ set" : "✗ MISSING");

const API_KEY = SUPABASE_KEY || SUPABASE_ANON;
const SUPABASE_API = SUPABASE_URL ? `${SUPABASE_URL}/rest/v1` : null;
console.log("Supabase API:", SUPABASE_API ? "✓ ready" : "✗ MISSING");

async function supabaseQuery(table, { select = "*", eq, single = false, order } = {}) {
  if (!SUPABASE_API) throw new Error("Supabase not configured");
  let url = `${SUPABASE_API}/${table}?select=${encodeURIComponent(select)}`;
  if (eq) {
    const [col, val] = typeof eq === "string" ? eq.split("=") : [Object.keys(eq)[0], Object.values(eq)[0]];
    url += `&${encodeURIComponent(col)}=eq.${encodeURIComponent(val)}`;
  }
  if (single) url += "&limit=1";
  if (order) url += `&order=${encodeURIComponent(order)}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`,
      "Accept": "application/json",
    },
  });
  const data = await res.json();
  if (single) return { data: data?.[0] || null, error: res.ok ? null : data };
  return { data, error: res.ok ? null : data };
}

async function supabaseUpdate(table, set, match) {
  if (!SUPABASE_API) throw new Error("Supabase not configured");
  const matchCol = Object.keys(match)[0];
  const matchVal = Object.values(match)[0];
  const url = `${SUPABASE_API}/${table}?${encodeURIComponent(matchCol)}=eq.${encodeURIComponent(matchVal)}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`,
      "Prefer": "return=minimal",
    },
    body: JSON.stringify(set),
  });
  return { error: res.ok ? null : await res.json().catch(() => ({})) };
}

let TG_API = null;
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
  if (!SUPABASE_API) { await sendMessage(chatId, "Database not connected."); return; }
  const email = text.replace("/link", "").trim();
  if (!email || !email.includes("@")) { await sendMessage(chatId, "Usage: /link your@email.com"); return; }
  const { data: profile } = await supabaseQuery("profiles", { select: "id", eq: `username=${email}`, single: true });
  if (!profile) { await sendMessage(chatId, `No account for "${email}". Sign up first.`); return; }
  await supabaseUpdate("profiles", { telegram_chat_id: chatId, telegram_username: username }, { id: profile.id });
  await sendMessage(chatId, "✅ Linked! Use /myaccess");
}

async function handleMyAccess(chatId) {
  if (!SUPABASE_API) { await sendMessage(chatId, "DB not connected."); return; }
  const { data: p } = await supabaseQuery("profiles", { select: "id", eq: `telegram_chat_id=${chatId}`, single: true });
  if (!p) { await sendMessage(chatId, "Not linked. Use /link <email>"); return; }
  const { data: m } = await supabaseQuery("memberships", { select: "*,packages(name)", eq: `user_id=${p.id}` });
  const active = (m || []).filter(x => x.is_active);
  if (!active.length) { await sendMessage(chatId, "No active memberships."); return; }
  let msg = "*Your Memberships* 🏦\n\n";
  for (const x of active) {
    const name = x.packages?.name || "Package";
    msg += `• ${name}\n  since ${new Date(x.started_at).toLocaleDateString()}\n\n`;
  }
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
    supabase: !!SUPABASE_API && !!API_KEY,
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