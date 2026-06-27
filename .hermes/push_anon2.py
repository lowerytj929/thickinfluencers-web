#!/usr/bin/env python3
import subprocess, os

# Read correct anon key from .env.local
with open("/Users/drac-/thickinfluencers-web/.env.local") as f:
    for line in f:
        if 'ANON_KEY' in line and '=' in line:
            anon_key = line.split('=', 1)[1].strip()
            break

env = os.environ.copy()
env["PATH"] = f"{os.path.expanduser('~/.local/bin')}:{env.get('PATH', '')}"

# Remove VERCEL_OIDC_TOKEN from piped input
clean = anon_key.replace('\n', '')  # strip any newline

proc = subprocess.run(
    ["vercel", "env", "add", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "production"],
    input=clean.encode(),
    capture_output=True, text=True, timeout=15, env=env
)
print("STDOUT:", proc.stdout[-200:] if proc.stdout else '')
print("STDERR:", proc.stderr[-200:] if proc.stderr else '')
print("EXIT:", proc.returncode)