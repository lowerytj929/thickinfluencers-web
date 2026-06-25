const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://baihkbjyghusbcmqbiyj.supabase.co";
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhaWhrYmp5Z2h1c2JjbXFiaXlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjM1MzIwNCwiZXhwIjoyMDk3OTI5MjA0fQ.KpiGqf01AivJK3z3yAzjEaX7Rd4GhmJjxePXuK0qBYg";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function run() {
  // Step 1: Create the exec_sql function (needed to run migrations via API)
  const { error: fnError } = await supabase.rpc("exec_sql", {
    query: "SELECT 1",
  });
  
  // If it doesn't exist, we need to create it
  if (fnError?.message?.includes("function") || fnError?.code === "PGRST202") {
    console.log("Creating exec_sql function...");
    
    // Cannot create functions via REST API without exec_sql existing first
    // Fallback: use direct SQL approach
    console.log("Need to create via SQL Editor first.");
    console.log("\n📋 Go to Supabase Dashboard → SQL Editor and paste this:");
    console.log(`
-- First, create the exec_sql function
CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS void AS $$
BEGIN
  EXECUTE query;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`);
    return;
  }
  
  // Step 2: Read and run the migration
  const fs = require("fs");
  const path = require("path");
  const sql = fs.readFileSync(path.join(__dirname, "migration.sql"), "utf8");
  
  const statements = sql
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith("--"));

  console.log(`Running ${statements.length} SQL statements...`);
  
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      const { error } = await supabase.rpc("exec_sql", { query: stmt + ";" });
      if (error) {
        console.log(`  ✗ Statement ${i + 1}: ${error.message}`);
      } else {
        console.log(`  ✓ Statement ${i + 1}`);
      }
    } catch (e) {
      console.log(`  ✗ Statement ${i + 1}: ${e.message}`);
    }
  }
  
  // Step 3: Verify
  console.log("\nVerifying migration...");
  const { data: packages } = await supabase.from("packages").select("*");
  console.log(`Packages created: ${packages?.length || 0}`);
  packages?.forEach(p => console.log(`  - ${p.name} (${p.price_display})`));
}

run().catch(console.error);