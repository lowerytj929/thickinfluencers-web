import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import "dotenv/config";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const sql = fs.readFileSync("supabase/migration.sql", "utf8");

async function main() {
  // Try running via a function that can execute raw SQL
  const { error } = await supabase.rpc("exec_sql", { sql_text: sql });
  if (error) {
    console.log("RPC method failed:", error.message);
    console.log("Falling back to individual statement execution...");

    // Split into individual statements
    const statements = sql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));

    let success = 0;
    let failed = 0;

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      try {
        const { error: stmtError } = await supabase.rpc("exec_sql", {
          sql_text: stmt + ";",
        });
        if (stmtError) {
          console.log(`  [${i}] FAIL: ${stmtError.message.slice(0, 100)}`);
          failed++;
        } else {
          success++;
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        console.log(`  [${i}] ERROR: ${msg.slice(0, 100)}`);
        failed++;
      }
    }

    console.log(`\nExecuted ${success + failed} statements`);
    console.log(`  Success: ${success}`);
    console.log(`  Failed: ${failed}`);
  } else {
    console.log("Migration executed successfully via exec_sql!");
  }
}

main().catch(console.error);
