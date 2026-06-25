// API Route: Telegram Webhook Handler
// Deploy this behind Railway or as a Next.js API route

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message?.text || !message?.from) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.from.id;
    const text = message.text.trim().toLowerCase();
    const username = message.from.username || message.from.first_name || "User";

    const supabase = await createClient();

    // Commands
    if (text === "/start") {
      // Send welcome message
      const welcomeMsg = `Welcome ${username} to ThickInfluencers Vault! 🏦\n\nCommands:\n/myaccess - Check your current access\n/link <email> - Link your Telegram to your vault account`;
      await sendTelegram(chatId, welcomeMsg);
    } else if (text === "/myaccess") {
      // Look up user's memberships by telegram_chat_id
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, username")
        .eq("telegram_chat_id", chatId)
        .single();

      if (!profile) {
        await sendTelegram(chatId, "Account not linked. Use /link <email> to connect your Telegram to your vault account.");
        return NextResponse.json({ ok: true });
      }

      const { data: memberships } = await supabase
        .from("memberships")
        .select("*, packages(name, telegram_link)")
        .eq("user_id", profile.id)
        .eq("is_active", true);

      if (!memberships?.length) {
        await sendTelegram(chatId, "No active memberships found. Visit https://thickinfluencers.com to get access.");
      } else {
        let msg = "Your Active Memberships:\n\n";
        memberships.forEach((m) => {
          msg += `• ${m.packages?.name}\n`;
          if (m.packages?.telegram_link) {
            msg += `  Link: ${m.packages.telegram_link}\n`;
          }
        });
        await sendTelegram(chatId, msg);
      }
    } else if (text.startsWith("/link")) {
      const email = message.text.split(" ").slice(1).join(" ").trim();
      if (!email) {
        await sendTelegram(chatId, "Usage: /link your@email.com");
        return NextResponse.json({ ok: true });
      }

      // Link Telegram chat ID to profile
      const { error } = await supabase
        .from("profiles")
        .update({ telegram_chat_id: chatId, telegram_username: username })
        .eq("username", email);

      if (error) {
        await sendTelegram(chatId, "Could not link. Make sure you've signed up with that email at thickinfluencers.com");
      } else {
        await sendTelegram(chatId, "✅ Telegram linked! Use /myaccess to check your memberships.");
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: true });
  }
}

async function sendTelegram(chatId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
}