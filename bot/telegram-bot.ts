// Railway Telegram Bot — Deploy this as a Railway service
// Handles /start, /link, /myaccess and auto-grant access on payment

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

interface TelegramUpdate {
  message?: {
    message_id: number;
    from: { id: number; first_name?: string; username?: string };
    chat: { id: number };
    text?: string;
  };
  callback_query?: any;
}

async function sendMessage(chatId: number, text: string, parseMode = "Markdown") {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: parseMode }),
  });
}

async function handleStart(chatId: number, name: string) {
  const msg = `Welcome ${name} to ThickInfluencers Vault! 🏦

Your gateway to exclusive influencer content.

Commands:
/link <email> — Link your Telegram to your vault account
/myaccess — Check your current memberships and access links
/support — Get admin contact info

First time? Sign up at https://thickinfluencers.com and use /link to connect your account!`;
  await sendMessage(chatId, msg);
}

async function handleLink(chatId: number, text: string, username: string) {
  const email = text.replace("/link", "").trim();
  if (!email || !email.includes("@")) {
    await sendMessage(chatId, "Usage: /link your@email.com\n\nExample: /link user@gmail.com");
    return;
  }

  // Find profile by email (stored in username field)
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, telegram_chat_id")
    .eq("username", email)
    .single();

  if (error || !profile) {
    await sendMessage(chatId, `No account found with email "${email}". Make sure you've signed up at https://thickinfluencers.com first.`);
    return;
  }

  // Update telegram info
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      telegram_chat_id: chatId,
      telegram_username: username,
    })
    .eq("id", profile.id);

  if (updateError) {
    await sendMessage(chatId, "Something went wrong. Please try again later.");
    return;
  }

  await sendMessage(chatId, "✅ Telegram linked successfully!\n\nUse /myaccess to see your memberships.");
}

async function handleMyAccess(chatId: number) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("telegram_chat_id", chatId)
    .single();

  if (!profile) {
    await sendMessage(chatId, "Account not linked. Use /link <email> to connect your Telegram to your vault account.");
    return;
  }

  const { data: memberships } = await supabase
    .from("memberships")
    .select("*, packages(name, telegram_link)")
    .eq("user_id", profile.id)
    .eq("is_active", true);

  if (!memberships || memberships.length === 0) {
    const msg = `No active memberships found. 😕

Browse packages at https://thickinfluencers.com/#pricing to unlock access.`;
    await sendMessage(chatId, msg);
    return;
  }

  let msg = `*Your Active Memberships* 🏦\n\n`;
  for (const m of memberships) {
    msg += `*${m.packages?.name || "Package"}*\n`;
    msg += `  Since: ${new Date(m.started_at).toLocaleDateString()}\n`;
    if (m.telegram_invite_link) {
      msg += `  🔗 [Access Link](${m.telegram_invite_link})\n`;
    } else if (m.packages?.telegram_link) {
      msg += `  🔗 [Join Channel](${m.packages.telegram_link})\n`;
    }
    msg += "\n";
  }
  await sendMessage(chatId, msg);
}

Bun.serve({
  port: 8080,
  async fetch(req: Request) {
    if (req.method !== "POST") {
      return new Response("OK", { status: 200 });
    }

    try {
      const update: TelegramUpdate = await req.json();
      
      if (update.message?.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text;
        const name = update.message.from.first_name || "User";
        const username = update.message.from.username || name;

        if (text.startsWith("/start")) {
          await handleStart(chatId, name);
        } else if (text.startsWith("/link")) {
          await handleLink(chatId, text, username);
        } else if (text.startsWith("/myaccess")) {
          await handleMyAccess(chatId);
        } else if (text.startsWith("/support")) {
          await sendMessage(chatId, "Contact admin: @richballer1");
        } else {
          await sendMessage(chatId, "Commands: /start, /link <email>, /myaccess, /support");
        }
      }

      return new Response("OK", { status: 200 });
    } catch (err) {
      console.error("Webhook error:", err);
      return new Response("OK", { status: 200 });
    }
  },
});

console.log("Telegram bot running on port 8080");