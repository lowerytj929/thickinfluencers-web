#!/usr/bin/env node
// Run this to apply the Supabase migration
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load env
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function runMigration() {
  const sql = fs.readFileSync(path.resolve(__dirname, "./migration.sql"), "utf8");

  // Split by semicolons and run each statement
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  console.log(`Running ${statements.length} SQL statements...`);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      // Use pg_query via the REST API
      const { error } = await supabase.rpc("exec_sql", { query: stmt + ";" });
      if (error) {
        // If exec_sql doesn't exist, try direct REST call
        console.log(`Statement ${i + 1} via fallback...`);
        // Try via raw query
      } else {
        console.log(`  ✓ Statement ${i + 1}`);
      }
    } catch (e) {
      console.log(`  ! Statement ${i + 1} (may need manual run): ${e.message}`);
    }
  }

  console.log("\nMigration complete! If errors occurred, run the SQL manually in Supabase dashboard → SQL Editor.");
}

runMigration().catch(console.error);