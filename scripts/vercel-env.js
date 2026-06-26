#!/usr/bin/env node
// Update Vercel env vars via API
const https = require("https");
require("dotenv").config({ path: ".env.local" });

const TOKEN = process.env.VERCEL_TOKEN || process.env.VERCEL_OIDC_TOKEN;
const TEAM_ID = "thickinfluencers";
const PROJECT = "thickinfluencers-web";

if (!TOKEN) {
  console.error("No VERCEL_TOKEN found");
  process.exit(1);
}

const envVars = [
  { key: "NEXT_PUBLIC_SUPABASE_URL", value: process.env.NEXT_PUBLIC_SUPABASE_URL },
  { key: "NEXT_PUBLIC_SUPABASE_ANON_KEY", value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY },
];

async function api(method, path, body) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: "api.vercel.com",
      path: `/v1${path}?teamId=${TEAM_ID}`,
      method,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    const req = https.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ status: res.statusCode, data: JSON.parse(data || "{}") }));
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  // Get existing env vars
  const existing = await api("GET", `/projects/${PROJECT}/env`);
  console.log(`Existing env vars: ${existing.data.envs?.length || 0}`);

  // Delete existing ones
  for (const env of existing.data.envs || []) {
    if (envVars.some((e) => e.key === env.key)) {
      const del = await api("DELETE", `/projects/${PROJECT}/env/${env.id}?skipValidation=true`);
      console.log(`Deleted ${env.key}: ${del.status}`);
    }
  }

  // Add new ones
  for (const ev of envVars) {
    if (!ev.value) {
      console.log(`Skipping ${ev.key}: no value`);
      continue;
    }
    const add = await api("POST", `/projects/${PROJECT}/env`, {
      key: ev.key,
      value: ev.value,
      type: "encrypted",
      target: ["production"],
    });
    console.log(`Added ${ev.key}: ${add.status}`);
  }

  // Trigger redeploy
  console.log("\nTriggering redeploy...");
  const deploy = await api("POST", `/deployments`, {
    name: PROJECT,
    project: PROJECT,
    target: "production",
  });
  console.log(`Deploy triggered: ${deploy.status}`);
  if (deploy.data.url) console.log(`URL: https://${deploy.data.url}`);
}

main().catch(console.error);