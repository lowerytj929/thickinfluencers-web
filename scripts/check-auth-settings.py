#!/usr/bin/env python3
"""Read Supabase auth settings to check email confirmation config."""
import json, urllib.request

with open('/Users/drac-/thickinfluencers-web/.env.local') as f:
    for line in f:
        if line.startswith('NEXT_PUBLIC_SUPABASE_ANON_KEY='):
            key = line.strip().split('=', 1)[1].strip("'\"")
            break

req = urllib.request.Request(
    'https://baihkbjyghusbcmqbiyj.supabase.co/auth/v1/settings',
    headers={'apikey': key}
)
with urllib.request.urlopen(req, timeout=10) as resp:
    data = json.loads(resp.read())
    print(json.dumps(data, indent=2))