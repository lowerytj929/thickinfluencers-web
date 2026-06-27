"use client";

import { useState } from "react";
import { Crown, ExternalLink, Loader2, CheckCircle, XCircle } from "lucide-react";
export default function OnlyFansConnect() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"form" | "polling" | "connected" | "error">("form");
  const [message, setMessage] = useState("");
  const [_attemptId, setAttemptId] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const startAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("polling");
    setMessage("Connecting to OnlyFans...");

    try {
      const res = await fetch("/api/onlyfans/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error) {
        setMessage(`Error: ${data.error}`);
        setStep("error");
        return;
      }

      const aid = data.attempt_id;
      setAttemptId(aid);
      setMessage("Waiting for authentication...");

      // Poll for status
      const poll = async () => {
        const pollRes = await fetch("/api/onlyfans/auth", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ attempt_id: aid }),
        });
        const pollData = await pollRes.json();

        if (pollData.data?.auth_id) {
          setProfile(pollData.data.profile);
          setStep("connected");
          setMessage("OnlyFans account connected successfully!");
        } else if (pollData.data?.status === "awaiting_2fa") {
          setMessage("Check your email/phone for 2FA code...");
          setTimeout(poll, 5000);
        } else if (pollData.data?.status === "pending") {
          setMessage("Authenticating...");
          setTimeout(poll, 3000);
        } else {
          setMessage(`Status: ${pollData.data?.status || "processing"}`);
          setTimeout(poll, 5000);
        }
      };
      setTimeout(poll, 3000);
    } catch (err: any) {
      setMessage(`Connection failed: ${err.message}`);
      setStep("error");
    }
  };

  if (step === "connected") {
    return (
      <div className="bg-bg-card border border-green-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-bold text-text-primary">OnlyFans Connected</h3>
        </div>
        {profile && (
          <div className="flex items-center gap-4 p-4 bg-bg-surface rounded-lg">
            <div className="w-12 h-12 rounded-full bg-accent-pink/20 flex items-center justify-center">
              <Crown className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <p className="font-semibold text-text-primary">{profile.name}</p>
              <p className="text-sm text-text-muted">@{profile.username}</p>
              {profile.subscribersCount && (
                <p className="text-xs text-text-secondary">{profile.subscribersCount.toLocaleString()} subscribers</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-bg-card border border-border-dark rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Crown className="w-5 h-5 text-accent-gold" />
        <h3 className="text-lg font-bold text-text-primary">Connect OnlyFans</h3>
      </div>
      <p className="text-sm text-text-secondary mb-5">
        Link your OnlyFans account to bring your content into ThickInfluencers.
        Your credentials are encrypted and sent directly to OnlyFansAPI (not stored here).
      </p>

      {step === "polling" ? (
        <div className="flex flex-col items-center py-8">
          <Loader2 className="w-8 h-8 text-accent-pink animate-spin mb-4" />
          <p className="text-sm text-text-secondary text-center">{message}</p>
        </div>
      ) : (
        <form onSubmit={startAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">OnlyFans Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-bg-surface border border-border-dark rounded-xl text-text-primary focus:outline-none focus:border-accent-pink transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">OnlyFans Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-bg-surface border border-border-dark rounded-xl text-text-primary focus:outline-none focus:border-accent-pink transition-colors"
              placeholder="••••••••"
            />
          </div>
          {step === "error" && (
            <p className="text-sm text-red-400 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> {message}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-accent-pink to-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            <ExternalLink className="w-4 h-4 inline mr-2" />
            Connect OnlyFans
          </button>
        </form>
      )}
    </div>
  );
}