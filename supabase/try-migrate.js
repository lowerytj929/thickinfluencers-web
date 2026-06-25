const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://baihkbjyghusbcmqbiyj.supabase.co";

// Read keys from .env.local
const envPath = path.join(__dirname, "..", ".env.local");
const env = fs.readFileSync(envPath, "utf8");
const anonKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/)?.[1]?.trim();
const serviceKey = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.+)/)?.[1]?.trim();

if (!serviceKey) {
  console.error("Service role key not found in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function runViaApi() {
  // Read migration SQL
  const sqlPath = path.join(__dirname, "migration.sql");
  const sql = fs.readFileSync(sqlPath, "utf8");

  // Try to create exec_sql function first
  console.log("Trying to create exec_sql function...");
  const createFn = `
CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS void AS $$
BEGIN
  EXECUTE query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`;

  // Use the Supabase Management API to run SQL
  // This needs a different endpoint
  console.log("\nAttempting direct database query via service_role...");
  
  // Try the raw SQL execution via the database API
  const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": serviceKey,
      "Authorization": `Bearer ${serviceKey}`,
      "Prefer": "params=single-object",
    },
    body: JSON.stringify({ query: "SELECT 1 as test" }),
  });

  console.log(`Response status: ${response.status}`);
  const text = await response.text();
  console.log(`Response: ${text.substring(0, 200)}`);
}

async function tryRpcApproach() {
  console.log("Trying RPC approach...");
  
  // Try creating the exec_sql function
  const createFn = `
CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS void AS $$
BEGIN
  EXECUTE query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`;

  // Some Supabase instances have a raw SQL endpoint
  // Try it
  try {
    const { data, error } = await supabase.rpc("exec_sql", { query: "SELECT 1" }).single();
    if (error) {
      console.log(`RPC failed (expected): ${error.message}`);
      console.log("Trying alternative...");
    } else {
      console.log("RPC works! Data:", data);
    }
  } catch (e) {
    console.log(`RPC error: ${e.message}`);
  }

  // Try inserting via auth schema
  console.log("\nTrying to find existing schemas...");
  const { data: schemas } = await supabase.from("_realtime").select("*").limit(1).maybeSingle();
  console.log("Realtime query:", schemas ? "responded" : "no data");
}

async function main() {
  await runViaApi();
  console.log("\n---");
  await tryRpcApproach();
}

main().catch(console.error);